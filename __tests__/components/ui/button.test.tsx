import { render, screen, fireEvent } from '@testing-library/react'
import { Button, buttonVariants } from '@/components/ui/button'

describe('Button Component', () => {
  it('should render without crashing', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should render children', () => {
    render(<Button>Test Button</Button>)
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  it('should handle click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    
    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should apply default variant classes', () => {
    render(<Button>Default</Button>)
    const button = screen.getByText('Default')
    expect(button).toHaveClass('bg-primary', 'text-primary-foreground')
  })

  it('should apply destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByText('Delete')
    expect(button).toHaveClass('bg-destructive')
  })

  it('should apply outline variant', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByText('Outline')
    expect(button).toHaveClass('border', 'bg-background')
  })

  it('should apply secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByText('Secondary')
    expect(button).toHaveClass('bg-secondary')
  })

  it('should apply ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const button = screen.getByText('Ghost')
    expect(button).toHaveClass('hover:bg-accent')
  })

  it('should apply link variant', () => {
    render(<Button variant="link">Link</Button>)
    const button = screen.getByText('Link')
    expect(button).toHaveClass('text-primary', 'underline-offset-4')
  })

  it('should apply default size', () => {
    render(<Button>Default Size</Button>)
    const button = screen.getByText('Default Size')
    expect(button).toHaveClass('h-9', 'px-4', 'py-2')
  })

  it('should apply small size', () => {
    render(<Button size="sm">Small</Button>)
    const button = screen.getByText('Small')
    expect(button).toHaveClass('h-8')
  })

  it('should apply large size', () => {
    render(<Button size="lg">Large</Button>)
    const button = screen.getByText('Large')
    expect(button).toHaveClass('h-10')
  })

  it('should apply icon size', () => {
    render(<Button size="icon">Icon</Button>)
    const button = screen.getByText('Icon')
    expect(button).toHaveClass('size-9')
  })

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByText('Custom')
    expect(button).toHaveClass('custom-class')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByText('Disabled')
    expect(button).toBeDisabled()
  })

  it('should have data-slot attribute', () => {
    render(<Button>Slot</Button>)
    const button = screen.getByText('Slot')
    expect(button).toHaveAttribute('data-slot', 'button')
  })

  it('should render as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    const link = screen.getByText('Link Button')
    expect(link.tagName).toBe('A')
  })

  it('should forward ref', () => {
    const ref = { current: null }
    render(<Button ref={ref as any}>Ref Button</Button>)
    expect(ref.current).toBeTruthy()
  })

  it('should apply multiple classes correctly', () => {
    render(
      <Button variant="destructive" size="lg" className="extra-class">
        Multi-class
      </Button>
    )
    const button = screen.getByText('Multi-class')
    expect(button).toHaveClass('bg-destructive', 'h-10', 'extra-class')
  })

  it('should not trigger click when disabled', () => {
    const handleClick = jest.fn()
    render(<Button disabled onClick={handleClick}>Disabled Click</Button>)
    
    fireEvent.click(screen.getByText('Disabled Click'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('buttonVariants should be a function', () => {
    expect(typeof buttonVariants).toBe('function')
  })

  it('should handle button type attribute', () => {
    render(<Button type="submit">Submit</Button>)
    const button = screen.getByText('Submit')
    expect(button).toHaveAttribute('type', 'submit')
  })
})