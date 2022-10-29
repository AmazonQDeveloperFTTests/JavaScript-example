import zFunction from '../ZFunction'

describe('Testing the zFunction', () => {
  it('Check the zFunction of a string', () => {
    expect(zFunction('aabxaayaab')).toEqual([10, 1, 0, 0, 2, 1, 0, 3, 1, 0])
    expect(zFunction('aabxaabxcaabxaabxay')).toEqual([
      19, 1, 0, 0, 4, 1, 0, 0, 0, 8, 1, 0, 0, 5, 1, 0, 0, 1, 0
    ])
  })
})
