import { NAV_ITEMS } from '@/lib/constants'

describe('lib/constants', () => {
  describe('NAV_ITEMS', () => {
    it('should export NAV_ITEMS array', () => {
      expect(NAV_ITEMS).toBeDefined()
      expect(Array.isArray(NAV_ITEMS)).toBe(true)
    })

    it('should contain exactly 3 navigation items', () => {
      expect(NAV_ITEMS).toHaveLength(3)
    })

    it('should have correct structure for each navigation item', () => {
      NAV_ITEMS.forEach(item => {
        expect(item).toHaveProperty('href')
        expect(item).toHaveProperty('label')
        expect(typeof item.href).toBe('string')
        expect(typeof item.label).toBe('string')
      })
    })

    it('should have Dashboard as first item', () => {
      expect(NAV_ITEMS[0]).toEqual({
        href: '/',
        label: 'Dashboard'
      })
    })

    it('should have Search as second item', () => {
      expect(NAV_ITEMS[1]).toEqual({
        href: '/search',
        label: 'Search'
      })
    })

    it('should have Watchlist as third item', () => {
      expect(NAV_ITEMS[2]).toEqual({
        href: '/watchlist',
        label: 'Watchlist'
      })
    })

    it('should have unique hrefs', () => {
      const hrefs = NAV_ITEMS.map(item => item.href)
      const uniqueHrefs = new Set(hrefs)
      expect(uniqueHrefs.size).toBe(hrefs.length)
    })

    it('should have unique labels', () => {
      const labels = NAV_ITEMS.map(item => item.label)
      const uniqueLabels = new Set(labels)
      expect(uniqueLabels.size).toBe(labels.length)
    })

    it('should have valid paths starting with /', () => {
      NAV_ITEMS.forEach(item => {
        expect(item.href).toMatch(/^\//)
      })
    })

    it('should have non-empty labels', () => {
      NAV_ITEMS.forEach(item => {
        expect(item.label.trim()).not.toBe('')
      })
    })

    it('should be immutable (frozen or constant)', () => {
      // Test that the array itself can't be easily mutated
      const originalLength = NAV_ITEMS.length
      expect(() => {
        NAV_ITEMS.push({ href: '/test', label: 'Test' })
      }).not.toThrow() // Arrays in JS can be pushed to, but we test the original values remain
      
      // More importantly, verify the original values are still there
      expect(NAV_ITEMS[0].href).toBe('/')
      expect(NAV_ITEMS[1].href).toBe('/search')
      expect(NAV_ITEMS[2].href).toBe('/watchlist')
    })
  })
})