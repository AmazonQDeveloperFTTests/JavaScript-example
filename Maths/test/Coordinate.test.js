import * as coordinate from '../Coordinate'

describe('Testing distance2points calculations', () => {
  it('should give a numeric output (distance between 2 points) with 4 numeric arguments', () => {
    const distance2points = coordinate.distance2points(2,2,-10,-7)
    expect(distance2points).toBe(15)
  })
  it('should not give any output given non-numeric argument', () => {
    expect(() => coordinate.distance2pointseAreaCube('ABC')).toThrow()
  })
  it('should not give any output given any number of numeric arguments other than 4', () => {
    expect(() => coordinate.distance2points(2,2,-10,-7,9).toThrow()
    expect(() => coordinate.distance2points(2,2,-10).toThrow()
    expect(() => coordinate.distance2points(2,2).toThrow()
    expect(() => coordinate.distance2points(2).toThrow()
  })
})
