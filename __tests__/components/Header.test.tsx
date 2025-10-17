import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

// Mock the child components
jest.mock('@/components/NavItems', () => {
  return function NavItems() {
    return <div data-testid="nav-items">NavItems</div>
  }
})

jest.mock('@/components/UserDropdown', () => {
  return function UserDropdown() {
    return <div data-testid="user-dropdown">UserDropdown</div>
  }
})

// Mock Next.js components
jest.mock('next/link', () => {
  return function Link({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

jest.mock('next/image', () => {
  return function Image({ src, alt, width, height, className }: any) {
    return <img src={src} alt={alt} width={width} height={height} className={className} />
  }
})

describe('Header Component', () => {
  it('should render without crashing', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('should render with sticky top-0 header class', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky', 'top-0', 'header')
  })

  it('should render logo with correct attributes', () => {
    render(<Header />)
    const logo = screen.getByAltText('Signali logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/assets/icons/logo.svg')
    expect(logo).toHaveAttribute('width', '140')
    expect(logo).toHaveAttribute('height', '32')
  })

  it('should render logo wrapped in a link to home', () => {
    render(<Header />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
  })

  it('should have cursor-pointer class on logo', () => {
    render(<Header />)
    const logo = screen.getByAltText('Signali logo')
    expect(logo).toHaveClass('cursor-pointer')
  })

  it('should render NavItems component', () => {
    render(<Header />)
    expect(screen.getByTestId('nav-items')).toBeInTheDocument()
  })

  it('should render NavItems within a nav element', () => {
    render(<Header />)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('should hide navigation on small screens', () => {
    render(<Header />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('hidden', 'sm:block')
  })

  it('should render UserDropdown component', () => {
    render(<Header />)
    expect(screen.getByTestId('user-dropdown')).toBeInTheDocument()
  })

  it('should have container wrapper with header-wrapper class', () => {
    render(<Header />)
    const container = screen.getByRole('banner').querySelector('.container.header-wrapper')
    expect(container).toBeInTheDocument()
  })

  it('should render all three main sections: logo, nav, user dropdown', () => {
    render(<Header />)
    expect(screen.getByAltText('Signali logo')).toBeInTheDocument()
    expect(screen.getByTestId('nav-items')).toBeInTheDocument()
    expect(screen.getByTestId('user-dropdown')).toBeInTheDocument()
  })

  it('should have proper semantic HTML structure', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('header')).toBeInTheDocument()
    expect(container.querySelector('nav')).toBeInTheDocument()
  })

  it('should render logo with proper size classes', () => {
    render(<Header />)
    const logo = screen.getByAltText('Signali logo')
    expect(logo).toHaveClass('h-8', 'w-auto')
  })
})