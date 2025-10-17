import { cn } from '@/lib/utils'

describe('lib/utils', () => {
  describe('cn function', () => {
    it('should be defined', () => {
      expect(cn).toBeDefined()
      expect(typeof cn).toBe('function')
    })

    it('should merge class names', () => {
      const result = cn('class1', 'class2')
      expect(result).toBe('class1 class2')
    })

    it('should handle conditional classes', () => {
      const result = cn('base', false && 'not-included', true && 'included')
      expect(result).toBe('base included')
    })

    it('should handle undefined and null', () => {
      const result = cn('base', undefined, null, 'end')
      expect(result).toBe('base end')
    })

    it('should merge conflicting Tailwind classes correctly', () => {
      // tailwind-merge should keep the last conflicting class
      const result = cn('p-4', 'p-6')
      expect(result).toBe('p-6')
    })

    it('should handle empty strings', () => {
      const result = cn('', 'valid', '')
      expect(result).toBe('valid')
    })

    it('should handle array inputs', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle object inputs with clsx', () => {
      const result = cn({
        'active': true,
        'inactive': false,
        'enabled': true
      })
      expect(result).toContain('active')
      expect(result).toContain('enabled')
      expect(result).not.toContain('inactive')
    })

    it('should handle complex mixed inputs', () => {
      const result = cn(
        'base-class',
        { 'conditional': true, 'not-this': false },
        ['array-class'],
        undefined,
        'final-class'
      )
      expect(result).toContain('base-class')
      expect(result).toContain('conditional')
      expect(result).toContain('array-class')
      expect(result).toContain('final-class')
      expect(result).not.toContain('not-this')
    })

    it('should deduplicate identical classes', () => {
      const result = cn('duplicate', 'other', 'duplicate')
      expect(result).toBe('duplicate other')
    })

    it('should handle Tailwind responsive classes', () => {
      const result = cn('text-sm', 'md:text-base', 'lg:text-lg')
      expect(result).toContain('text-sm')
      expect(result).toContain('md:text-base')
      expect(result).toContain('lg:text-lg')
    })

    it('should prioritize last Tailwind utility in conflict', () => {
      const result = cn('bg-red-500', 'bg-blue-500')
      expect(result).toBe('bg-blue-500')
    })

    it('should handle no arguments', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle only falsy values', () => {
      const result = cn(false, null, undefined, '')
      expect(result).toBe('')
    })
  })
})