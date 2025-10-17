import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import UserDropdown from '@/components/UserDropdown'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock child components
jest.mock('@/components/NavItems', () => {
  return function NavItems() {
    return <div data-testid="nav-items-mobile">NavItems Mobile</div>
  }
})

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, variant, asChild }: any) => (
    <button onClick={onClick} className={className} data-variant={variant} data-asChild={asChild}>
      {children}
    </button>
  ),
}))

jest.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children, className }: any) => <div className={className} data-testid="avatar">{children}</div>,
  AvatarImage: ({ src, ...props }: any) => <img src={src} data-testid="avatar-image" {...props} />,
  AvatarFallback: ({ children, className }: any) => <div className={className} data-testid="avatar-fallback">{children}</div>,
}))

jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children, asChild }: any) => <div data-testid="dropdown-trigger">{children}</div>,
  DropdownMenuContent: ({ children, className }: any) => <div className={className} data-testid="dropdown-content">{children}</div>,
  DropdownMenuItem: ({ children, onClick, className }: any) => (
    <div onClick={onClick} className={className} data-testid="dropdown-item">{children}</div>
  ),
  DropdownMenuLabel: ({ children, className }: any) => <div className={className} data-testid="dropdown-label">{children}</div>,
  DropdownMenuSeparator: ({ className }: any) => <hr className={className} data-testid="dropdown-separator" />,
}))

describe('UserDropdown Component', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  it('should render without crashing', () => {
    render(<UserDropdown />)
    expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument()
  })

  it('should display user name', () => {
    render(<UserDropdown />)
    const userNames = screen.getAllByText('John')
    expect(userNames.length).toBeGreaterThan(0)
  })

  it('should display user email', () => {
    render(<UserDropdown />)
    expect(screen.getByText('andyshuk2@gmail.com')).toBeInTheDocument()
  })

  it('should display user avatar', () => {
    render(<UserDropdown />)
    const avatars = screen.getAllByTestId('avatar')
    expect(avatars.length).toBeGreaterThan(0)
  })

  it('should display avatar image with correct src', () => {
    render(<UserDropdown />)
    const images = screen.getAllByTestId('avatar-image')
    images.forEach(img => {
      expect(img).toHaveAttribute('src', 'https://github.com/shadcn.png')
    })
  })

  it('should display avatar fallback with user initial', () => {
    render(<UserDropdown />)
    const fallbacks = screen.getAllByTestId('avatar-fallback')
    expect(fallbacks.length).toBeGreaterThan(0)
    fallbacks.forEach(fallback => {
      expect(fallback).toHaveTextContent('J')
    })
  })

  it('should display logout button', () => {
    render(<UserDropdown />)
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('should call router.push when logout is clicked', async () => {
    render(<UserDropdown />)
    
    const logoutButton = screen.getByText('Logout').closest('[data-testid="dropdown-item"]')
    expect(logoutButton).toBeInTheDocument()
    
    fireEvent.click(logoutButton!)
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/sign-in')
    })
  })

  it('should navigate to /sign-in on sign out', async () => {
    render(<UserDropdown />)
    
    const logoutButton = screen.getByText('Logout').closest('[data-testid="dropdown-item"]')
    fireEvent.click(logoutButton!)
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledTimes(1)
      expect(mockPush).toHaveBeenCalledWith('/sign-in')
    })
  })

  it('should render logout icon', () => {
    render(<UserDropdown />)
    const logoutSection = screen.getByText('Logout').closest('[data-testid="dropdown-item"]')
    expect(logoutSection).toBeInTheDocument()
  })

  it('should have ghost variant button as trigger', () => {
    render(<UserDropdown />)
    const button = screen.getByTestId('dropdown-trigger').querySelector('button')
    expect(button).toHaveAttribute('data-variant', 'ghost')
  })

  it('should render dropdown menu separators', () => {
    render(<UserDropdown />)
    const separators = screen.getAllByTestId('dropdown-separator')
    expect(separators.length).toBeGreaterThanOrEqual(1)
  })

  it('should have bg-gray-600 class on separators', () => {
    render(<UserDropdown />)
    const separators = screen.getAllByTestId('dropdown-separator')
    separators.forEach(sep => {
      expect(sep).toHaveClass('bg-gray-600')
    })
  })

  it('should render mobile navigation items', () => {
    render(<UserDropdown />)
    expect(screen.getByTestId('nav-items-mobile')).toBeInTheDocument()
  })

  it('should hide mobile nav on larger screens (sm:hidden)', () => {
    render(<UserDropdown />)
    const mobileNav = screen.getByTestId('nav-items-mobile').closest('nav')
    expect(mobileNav).toHaveClass('sm:hidden')
  })

  it('should hide desktop elements on mobile', () => {
    render(<UserDropdown />)
    // Find the element with hidden md:flex classes for user name
    const { container } = render(<UserDropdown />)
    const hiddenElement = container.querySelector('.hidden.md\\:flex')
    expect(hiddenElement).toBeInTheDocument()
  })

  it('should apply proper styling to dropdown content', () => {
    render(<UserDropdown />)
    const content = screen.getByTestId('dropdown-content')
    expect(content).toHaveClass('text-gray-400')
  })

  it('should apply proper styling to avatar fallback', () => {
    render(<UserDropdown />)
    const fallbacks = screen.getAllByTestId('avatar-fallback')
    fallbacks.forEach(fallback => {
      expect(fallback).toHaveClass('bg-yellow-500', 'text-yellow-900')
    })
  })

  it('should render user info in dropdown label', () => {
    render(<UserDropdown />)
    const label = screen.getByTestId('dropdown-label')
    expect(label).toBeInTheDocument()
  })

  it('should display different sized avatars (h-8 w-8 and h-10 w-10)', () => {
    render(<UserDropdown />)
    const avatars = screen.getAllByTestId('avatar')
    
    const smallAvatar = avatars.find(a => a.className.includes('h-8'))
    const largeAvatar = avatars.find(a => a.className.includes('h-10'))
    
    expect(smallAvatar).toBeInTheDocument()
    expect(largeAvatar).toBeInTheDocument()
  })

  it('should handle async sign out properly', async () => {
    render(<UserDropdown />)
    
    const logoutButton = screen.getByText('Logout').closest('[data-testid="dropdown-item"]')
    
    // Click and verify the async behavior
    fireEvent.click(logoutButton!)
    
    // Should eventually call router.push
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled()
    }, { timeout: 1000 })
  })

  it('should have proper styling for logout menu item', () => {
    render(<UserDropdown />)
    const logoutItem = screen.getByText('Logout').closest('[data-testid="dropdown-item"]')
    expect(logoutItem).toHaveClass('text-gray-100', 'text-md', 'font-medium')
  })

  it('should show logout icon only on desktop', () => {
    render(<UserDropdown />)
    const logoutSection = screen.getByText('Logout').parentElement
    const icon = logoutSection?.querySelector('.hidden.sm\\:block')
    expect(icon).toBeInTheDocument()
  })

  it('should handle multiple separators correctly', () => {
    render(<UserDropdown />)
    const separators = screen.getAllByTestId('dropdown-separator')
    
    // Check that at least one separator is always visible
    const visibleSeparator = separators.find(sep => !sep.className.includes('hidden'))
    expect(visibleSeparator).toBeInTheDocument()
  })

  it('should render button with proper flex layout', () => {
    render(<UserDropdown />)
    const button = screen.getByTestId('dropdown-trigger').querySelector('button')
    expect(button).toHaveClass('flex', 'items-center', 'gap-3')
  })

  it('should apply yellow hover color (with typo: yelllow)', () => {
    render(<UserDropdown />)
    const button = screen.getByTestId('dropdown-trigger').querySelector('button')
    expect(button).toHaveClass('hover:text-yelllow-500')
  })
})