# Test Suite for NexTrade Application

This test suite provides comprehensive coverage for the components and utilities added in the header feature branch.

## Test Structure

- `__tests__/lib/` - Tests for utility functions and constants
- `__tests__/components/` - Tests for React components
- `__tests__/components/ui/` - Tests for UI components
- `__tests__/app/` - Tests for Next.js app components
- `__tests__/public/` - Tests for static assets validation

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Coverage

The test suite covers:
- Pure functions (cn utility, constants)
- React components (Header, NavItems, UserDropdown)
- UI components (Avatar, Button, Dropdown Menu)
- Layout components
- Page components
- Static asset validation

## Test Categories

### Unit Tests
- lib/constants.ts - Navigation items data validation
- lib/utils.ts - Class name utility function
- All component rendering and behavior

### Integration Tests
- Component interactions
- Navigation behavior
- User interactions (clicks, routing)

### Validation Tests
- SVG logo validation
- File structure validation
- Security checks

## Best Practices Followed

1. **Descriptive Names**: Each test clearly describes what it's testing
2. **Arrange-Act-Assert**: Tests follow AAA pattern
3. **Isolation**: Tests are independent and can run in any order
4. **Mocking**: External dependencies are properly mocked
5. **Edge Cases**: Tests cover happy paths, edge cases, and error conditions
6. **Coverage**: Comprehensive coverage of all public interfaces