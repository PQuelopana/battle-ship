import { getRandomIntFromInterval } from "./getRandomIntFromInterval"

describe('test in getRandomIntFromInterval', () => {
    test('should return random number between 1 and 10', () => {
        const randomNumber = getRandomIntFromInterval(1, 10)

        expect(randomNumber).toBeGreaterThanOrEqual(1)
        expect(randomNumber).toBeLessThanOrEqual(10)
    })

    test('should return random number between 1 and 2', () => {
        const randomNumber = getRandomIntFromInterval(1, 2)

        expect(randomNumber).toBeGreaterThanOrEqual(1)
        expect(randomNumber).toBeLessThanOrEqual(2)
    })

    test('should return 0 when do not pass min or max parameters', () => {
        let randomNumber = getRandomIntFromInterval()

        expect(randomNumber).toBe(0)

        randomNumber = getRandomIntFromInterval(1)

        expect(randomNumber).toBe(0)
    })
})
