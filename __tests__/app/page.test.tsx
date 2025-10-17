import { render, screen } from '@testing-library/react'
import Home from '@/app/(root)/page'

// Mock Button component
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}))

describe('Home Page', () => {
  it('should render without crashing', () => {
    render(<Home />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('should display "Home" text', () => {
    render(<Home />)
    const homeText = screen.getByText('Home')
    expect(homeText).toBeInTheDocument()
  })

  it('should have main wrapper div with proper classes', () => {
    const { container } = render(<Home />)
    const wrapper = container.querySelector('.flex.min-h-screen.home-wrapper')
    expect(wrapper).toBeInTheDocument()
  })

  it('should apply flex layout', () => {
    const { container } = render(<Home />)
    const wrapper = container.querySelector('.flex')
    expect(wrapper).toBeInTheDocument()
  })

  it('should apply min-h-screen class', () => {
    const { container } = render(<Home />)
    const wrapper = container.querySelector('.min-h-screen')
    expect(wrapper).toBeInTheDocument()
  })

  it('should apply home-wrapper class', () => {
    const { container } = render(<Home />)
    const wrapper = container.querySelector('.home-wrapper')
    expect(wrapper).toBeInTheDocument()
  })

  it('should have all three classes combined', () => {
    const { container } = render(<Home />)
    const wrapper = screen.getByText('Home').parentElement
    expect(wrapper).toHaveClass('flex', 'min-h-screen', 'home-wrapper')
  })

  it('should render as a div element', () => {
    const { container } = render(<Home />)
    const wrapper = screen.getByText('Home').parentElement
    expect(wrapper?.tagName).toBe('DIV')
  })

  it('should be a React component', () => {
    expect(typeof Home).toBe('function')
  })

  it('should export default', () => {
    expect(Home).toBeDefined()
  })

  it('should render consistent structure on multiple renders', () => {
    const { container, rerender } = render(<Home />)
    const firstRender = container.innerHTML
    
    rerender(<Home />)
    const secondRender = container.innerHTML
    
    expect(firstRender).toBe(secondRender)
  })

  it('should have accessible content', () => {
    render(<Home />)
    expect(screen.getByText('Home')).toBeVisible()
  })
})