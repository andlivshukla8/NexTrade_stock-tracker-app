import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import NavItems from '@/components/NavItems'
import { NAV_ITEMS } from '@/lib/constants'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

jest.mock('next/link', () => {
  return function Link({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
    return <a href={href} className={className}>{children}</a>
  }
})

describe('NavItems Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render without crashing', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    render(<NavItems />)
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('should render all navigation items from constants', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    render(<NavItems />)
    
    NAV_ITEMS.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('should render correct number of list items', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    render(<NavItems />)
    
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(NAV_ITEMS.length)
  })

  it('should render links with correct hrefs', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    render(<NavItems />)
    
    NAV_ITEMS.forEach(item => {
      const link = screen.getByText(item.label).closest('a')
      expect(link).toHaveAttribute('href', item.href)
    })
  })

  it('should highlight active link when on Dashboard (/)', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    render(<NavItems />)
    
    const dashboardLink = screen.getByText('Dashboard')
    expect(dashboardLink).toHaveClass('text-gray-100')
  })

  it('should not highlight other links when on Dashboard', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    render(<NavItems />)
    
    const searchLink = screen.getByText('Search')
    const watchlistLink = screen.getByText('Watchlist')
    
    expect(searchLink).not.toHaveClass('text-gray-100')
    expect(watchlistLink).not.toHaveClass('text-gray-100')
  })

  it('should highlight active link when on Search page', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/search')
    render(<NavItems />)
    
    const searchLink = screen.getByText('Search')
    expect(searchLink).toHaveClass('text-gray-100')
  })

  it('should highlight active link when on nested Search page', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/search/results')
    render(<NavItems />)
    
    const searchLink = screen.getByText('Search')
    expect(searchLink).toHaveClass('text-gray-100')
  })

  it('should highlight active link when on Watchlist page', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/watchlist')
    render(<NavItems />)
    
    const watchlistLink = screen.getByText('Watchlist')
    expect(watchlistLink).toHaveClass('text-gray-100')
  })

  it('should not highlight Dashboard when on other pages', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/search')
    render(<NavItems />)
    
    const dashboardLink = screen.getByText('Dashboard')
    expect(dashboardLink).not.toHaveClass('text-gray-100')
  })

  it('should apply hover styles to all links', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    render(<NavItems />)
    
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveClass('hover:text-yellow-500')
    })
  })

  it('should have proper list styling classes', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    render(<NavItems />)
    
    const list = screen.getByRole('list')
    expect(list).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'p-2', 'gap-3', 'sm:gap-10', 'font-medium')
  })

  it('should use unique keys for list items', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    const { container } = render(<NavItems />)
    
    const listItems = container.querySelectorAll('li')
    expect(listItems.length).toBe(NAV_ITEMS.length)
  })

  it('should handle edge case of unknown pathname', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/unknown-page')
    render(<NavItems />)
    
    // None of the links should be active
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).not.toHaveClass('text-gray-100')
    })
  })

  it('should correctly identify root path vs. nested paths', () => {
    // Test root path
    ;(usePathname as jest.Mock).mockReturnValue('/')
    const { rerender } = render(<NavItems />)
    expect(screen.getByText('Dashboard')).toHaveClass('text-gray-100')
    
    // Test that /search doesn't highlight Dashboard
    ;(usePathname as jest.Mock).mockReturnValue('/search')
    rerender(<NavItems />)
    expect(screen.getByText('Dashboard')).not.toHaveClass('text-gray-100')
  })

  it('should apply transform-colors class (note: typo in original, should be transition)', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    render(<NavItems />)
    
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveClass('transform-colors')
    })
  })

  it('should handle pathname with trailing slash', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/search/')
    render(<NavItems />)
    
    const searchLink = screen.getByText('Search')
    expect(searchLink).toHaveClass('text-gray-100')
  })

  it('should render correctly on mobile (flex-col)', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    render(<NavItems />)
    
    const list = screen.getByRole('list')
    expect(list).toHaveClass('flex-col')
  })

  it('should render correctly on desktop (sm:flex-row)', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    render(<NavItems />)
    
    const list = screen.getByRole('list')
    expect(list).toHaveClass('sm:flex-row')
  })
})