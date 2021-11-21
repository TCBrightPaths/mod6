const { shuffleArray } = require('./utils')

describe('shuffleArray should', () => {

    test('return Array', () => {
        let shuffledArray = shuffleArray()
        expect(typeof shuffledArray).toBe('array')
    })
    test('returns array with same length as argument', () => {
        let shuffledArray = shuffleArray()
        expect(shuffledArray.length).toEqual(array.length)
    })
})