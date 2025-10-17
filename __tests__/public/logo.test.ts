import fs from 'fs'
import path from 'path'

describe('Logo SVG Validation', () => {
  const logoPath = path.join(process.cwd(), 'public/assets/icons/logo.svg')
  let logoContent: string

  beforeAll(() => {
    logoContent = fs.readFileSync(logoPath, 'utf-8')
  })

  it('should exist at the correct path', () => {
    expect(fs.existsSync(logoPath)).toBe(true)
  })

  it('should be a valid SVG file', () => {
    expect(logoContent).toContain('<svg')
    expect(logoContent).toContain('</svg>')
  })

  it('should have proper SVG attributes', () => {
    expect(logoContent).toContain('xmlns="http://www.w3.org/2000/svg"')
  })

  it('should have width and height attributes', () => {
    expect(logoContent).toContain('width=')
    expect(logoContent).toContain('height=')
  })

  it('should have viewBox attribute', () => {
    expect(logoContent).toContain('viewBox=')
  })

  it('should contain paths for logo graphics', () => {
    expect(logoContent).toContain('<path')
  })

  it('should have fill colors defined', () => {
    expect(logoContent).toMatch(/fill="[^"]+"/g)
  })

  it('should contain NexTrade text', () => {
    expect(logoContent).toContain('NexTrade')
  })

  it('should have text element for branding', () => {
    expect(logoContent).toContain('<text')
  })

  it('should have proper color scheme (green, yellow, blue, white)', () => {
    expect(logoContent).toContain('#2DFF34') // Green
    expect(logoContent).toContain('#FFCE5F') // Yellow
    expect(logoContent).toContain('#00B7FF') // Blue
    expect(logoContent).toContain('white')   // White
  })

  it('should have fill="none" attribute on svg element', () => {
    expect(logoContent).toContain('fill="none"')
  })

  it('should contain multiple path elements', () => {
    const pathCount = (logoContent.match(/<path/g) || []).length
    expect(pathCount).toBeGreaterThan(1)
  })

  it('should be properly formatted XML', () => {
    // Basic XML validation
    const openTags = (logoContent.match(/<[^/][^>]*>/g) || []).length
    const closeTags = (logoContent.match(/<\/[^>]+>/g) || []).length
    const selfClosingTags = (logoContent.match(/<[^>]+\/>/g) || []).length
    
    // Self-closing tags don't need separate closing tags
    expect(openTags - selfClosingTags).toBe(closeTags)
  })

  it('should have reasonable file size', () => {
    const stats = fs.statSync(logoPath)
    expect(stats.size).toBeLessThan(10000) // Less than 10KB for an SVG logo
    expect(stats.size).toBeGreaterThan(100) // More than 100 bytes
  })

  it('should not contain malicious scripts', () => {
    expect(logoContent.toLowerCase()).not.toContain('<script')
    expect(logoContent.toLowerCase()).not.toContain('javascript:')
    expect(logoContent.toLowerCase()).not.toContain('onerror=')
  })

  it('should have font styling for text', () => {
    expect(logoContent).toContain('font-family=')
    expect(logoContent).toContain('font-size=')
    expect(logoContent).toContain('font-weight=')
  })

  it('should position text correctly', () => {
    expect(logoContent).toMatch(/x="\d+"/)
    expect(logoContent).toMatch(/y="\d+"/)
  })
})