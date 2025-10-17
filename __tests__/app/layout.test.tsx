import { render, screen } from '@testing-library/react'
import Layout from '@/app/(root)/layout'

// Mock Header component
jest.mock('@/components/Header', () => {
  return function Header() {
    return <header data-testid="header">Header</header>
  }
})

describe('Root Layout', () => {
  it('should render without crashing', () => {
    render(<Layout><div>Test</div></Layout>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('should render children', () => {
    render(
      <Layout>
        <div data-testid="child-content">Child Content</div>
      </Layout>
    )
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
  })

  it('should render Header component', () => {
    render(<Layout><div>Test</div></Layout>)
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('should have main element with proper classes', () => {
    const { container } = render(<Layout><div>Test</div></Layout>)
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveClass('min-h-screen', 'text-gray-400')
  })

  it('should wrap children in container with py-10', () => {
    const { container } = render(<Layout><div data-testid="child">Test</div></Layout>)
    const childContainer = screen.getByTestId('child').parentElement
    expect(childContainer).toHaveClass('container', 'py-10')
  })

  it('should render Header before children', () => {
    const { container } = render(
      <Layout>
        <div data-testid="child">Child</div>
      </Layout>
    )
    
    const main = container.querySelector('main')
    const header = screen.getByTestId('header')
    const child = screen.getByTestId('child')
    
    expect(main?.firstChild).toBe(header)
  })

  it('should apply full screen height', () => {
    const { container } = render(<Layout><div>Test</div></Layout>)
    const main = container.querySelector('main')
    expect(main).toHaveClass('min-h-screen')
  })

  it('should apply text-gray-400 color', () => {
    const { container } = render(<Layout><div>Test</div></Layout>)
    const main = container.querySelector('main')
    expect(main).toHaveClass('text-gray-400')
  })

  it('should handle multiple children', () => {
    render(
      <Layout>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </Layout>
    )
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
  })

  it('should handle React fragments as children', () => {
    render(
      <Layout>
        <>
          <div data-testid="fragment-child-1">Fragment Child 1</div>
          <div data-testid="fragment-child-2">Fragment Child 2</div>
        </>
      </Layout>
    )
    
    expect(screen.getByTestId('fragment-child-1')).toBeInTheDocument()
    expect(screen.getByTestId('fragment-child-2')).toBeInTheDocument()
  })

  it('should accept ReactNode as children type', () => {
    // Test with string
    render(<Layout>String child</Layout>)
    expect(screen.getByText('String child')).toBeInTheDocument()
  })

  it('should have semantic HTML structure', () => {
    const { container } = render(<Layout><div>Test</div></Layout>)
    
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
    expect(main?.tagName).toBe('MAIN')
  })

  it('should maintain layout structure with empty children', () => {
    const { container } = render(<Layout>{null}</Layout>)
    
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(container.querySelector('.container.py-10')).toBeInTheDocument()
  })

  it('should properly nest elements: main > header + container > children', () => {
    const { container } = render(
      <Layout>
        <div data-testid="test-child">Test</div>
      </Layout>
    )
    
    const main = container.querySelector('main')
    const header = screen.getByTestId('header')
    const containerDiv = container.querySelector('.container.py-10')
    const child = screen.getByTestId('test-child')
    
    expect(main?.contains(header)).toBe(true)
    expect(main?.contains(containerDiv as Node)).toBe(true)
    expect(containerDiv?.contains(child)).toBe(true)
  })
})