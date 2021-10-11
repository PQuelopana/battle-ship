export const getRandomIntFromInterval = (min, max) => {
    const falsies = [null, undefined]

    if (falsies.includes(min) || falsies.includes(max)) return 0

    return Math.floor(Math.random() * (max - min + 1) + min)
}
