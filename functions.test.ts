const { shuffleArray } = require('./utils')

describe('shuffleArray should', () => {

    test('return array', () => {
        let shuffledArray = shuffleArray()
        expect(typeof shuffledArray).toBe('array')
    })
    test('returns array with same length as argument', () => {
        let array = [1,2,3,4,5]
        let shuffledArray = shuffleArray(array)
        expect(shuffledArray.length).toEqual(array.length)
    })
})