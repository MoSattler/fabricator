import { Fabricator } from '../src/'

describe('fabricator', () => {
  it('should export Fabricator()', () => {
    expect(Fabricator).toBeDefined()
    expect(typeof Fabricator).toBe('function')
  })
})
