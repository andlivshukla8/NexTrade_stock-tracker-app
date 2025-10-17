import { render, screen } from '@testing-library/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

describe('Avatar Components', () => {
  describe('Avatar', () => {
    it('should render without crashing', () => {
      const { container } = render(<Avatar />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should have default classes', () => {
      const { container } = render(<Avatar data-testid="avatar" />)
      const avatar = screen.getByTestId('avatar')
      expect(avatar).toHaveClass('relative', 'flex', 'size-8', 'shrink-0', 'overflow-hidden', 'rounded-full')
    })

    it('should apply custom className', () => {
      const { container } = render(<Avatar className="custom-class" data-testid="avatar" />)
      const avatar = screen.getByTestId('avatar')
      expect(avatar).toHaveClass('custom-class')
    })

    it('should merge custom classes with default classes', () => {
      const { container } = render(<Avatar className="h-12 w-12" data-testid="avatar" />)
      const avatar = screen.getByTestId('avatar')
      expect(avatar).toHaveClass('h-12', 'w-12', 'rounded-full')
    })

    it('should have data-slot attribute', () => {
      const { container } = render(<Avatar data-testid="avatar" />)
      const avatar = screen.getByTestId('avatar')
      expect(avatar).toHaveAttribute('data-slot', 'avatar')
    })

    it('should forward additional props', () => {
      const { container } = render(<Avatar data-testid="avatar" aria-label="User avatar" />)
      const avatar = screen.getByTestId('avatar')
      expect(avatar).toHaveAttribute('aria-label', 'User avatar')
    })

    it('should render children', () => {
      render(
        <Avatar data-testid="avatar">
          <div data-testid="child">Child content</div>
        </Avatar>
      )
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })
  })

  describe('AvatarImage', () => {
    it('should render without crashing', () => {
      const { container } = render(<AvatarImage src="test.jpg" alt="Test" />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should have default classes', () => {
      const { container } = render(<AvatarImage src="test.jpg" alt="Test" data-testid="avatar-image" />)
      const image = screen.getByTestId('avatar-image')
      expect(image).toHaveClass('aspect-square', 'size-full')
    })

    it('should apply custom className', () => {
      const { container } = render(<AvatarImage src="test.jpg" alt="Test" className="custom-image" data-testid="avatar-image" />)
      const image = screen.getByTestId('avatar-image')
      expect(image).toHaveClass('custom-image')
    })

    it('should have data-slot attribute', () => {
      const { container } = render(<AvatarImage src="test.jpg" alt="Test" data-testid="avatar-image" />)
      const image = screen.getByTestId('avatar-image')
      expect(image).toHaveAttribute('data-slot', 'avatar-image')
    })

    it('should accept and pass through src prop', () => {
      const { container } = render(<AvatarImage src="https://example.com/avatar.jpg" alt="Test" data-testid="avatar-image" />)
      const image = screen.getByTestId('avatar-image')
      expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg')
    })

    it('should accept and pass through alt prop', () => {
      const { container } = render(<AvatarImage src="test.jpg" alt="User Avatar" data-testid="avatar-image" />)
      const image = screen.getByTestId('avatar-image')
      expect(image).toHaveAttribute('alt', 'User Avatar')
    })
  })

  describe('AvatarFallback', () => {
    it('should render without crashing', () => {
      const { container } = render(<AvatarFallback>JD</AvatarFallback>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should have default classes', () => {
      const { container } = render(<AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>)
      const fallback = screen.getByTestId('avatar-fallback')
      expect(fallback).toHaveClass('bg-muted', 'flex', 'size-full', 'items-center', 'justify-center', 'rounded-full')
    })

    it('should apply custom className', () => {
      const { container } = render(<AvatarFallback className="custom-fallback" data-testid="avatar-fallback">JD</AvatarFallback>)
      const fallback = screen.getByTestId('avatar-fallback')
      expect(fallback).toHaveClass('custom-fallback')
    })

    it('should have data-slot attribute', () => {
      const { container } = render(<AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>)
      const fallback = screen.getByTestId('avatar-fallback')
      expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback')
    })

    it('should render children text content', () => {
      render(<AvatarFallback>JD</AvatarFallback>)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('should render initials', () => {
      render(<AvatarFallback>AB</AvatarFallback>)
      expect(screen.getByText('AB')).toBeInTheDocument()
    })

    it('should support custom background colors', () => {
      const { container } = render(<AvatarFallback className="bg-blue-500" data-testid="avatar-fallback">JD</AvatarFallback>)
      const fallback = screen.getByTestId('avatar-fallback')
      expect(fallback).toHaveClass('bg-blue-500')
    })
  })

  describe('Avatar Integration', () => {
    it('should render complete avatar with image and fallback', () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarImage src="test.jpg" alt="Test User" data-testid="avatar-image" />
          <AvatarFallback data-testid="avatar-fallback">TU</AvatarFallback>
        </Avatar>
      )
      
      expect(screen.getByTestId('avatar')).toBeInTheDocument()
      expect(screen.getByTestId('avatar-image')).toBeInTheDocument()
      expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument()
    })

    it('should handle missing image gracefully with fallback', () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarImage src="" alt="Test User" data-testid="avatar-image" />
          <AvatarFallback data-testid="avatar-fallback">TU</AvatarFallback>
        </Avatar>
      )
      
      expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument()
    })

    it('should support different sizes through className', () => {
      const { container } = render(
        <Avatar className="h-16 w-16" data-testid="avatar-large">
          <AvatarImage src="test.jpg" alt="Large" />
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
      )
      
      const avatar = screen.getByTestId('avatar-large')
      expect(avatar).toHaveClass('h-16', 'w-16')
    })

    it('should maintain rounded-full shape regardless of size', () => {
      const { container } = render(
        <Avatar className="h-20 w-20" data-testid="avatar">
          <AvatarFallback>XL</AvatarFallback>
        </Avatar>
      )
      
      const avatar = screen.getByTestId('avatar')
      expect(avatar).toHaveClass('rounded-full')
    })
  })
})