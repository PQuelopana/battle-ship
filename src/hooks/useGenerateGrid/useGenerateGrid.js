import { useEffect, useState } from 'react'
import { useTakeShot } from '../useTakeShot/useTakeShot'

const columns = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const rows = Array.from({ length: columns.length })

export const useGenerateGrid = ({
    ships,
    newShot,
}) => {
    const [grid, setGrid] = useState([])
    const [secondsToInitTime, setSecondsToInitTime] = useState(3)

    const initTimer = () => {
        console.log('init timer')
        const timer = setInterval(() => {
            console.log('interval')
            setSecondsToInitTime((seconds) => {
                console.log(seconds)
                seconds--

                if (seconds === 0) clearInterval(timer)

                return seconds
            })
        }, 1000)
    }

    const setShipsInGrid = () => {
        if (!ships.length) return

        setGrid(rows.map((row, indexRow) => {
            return columns.map((column, indexColumn) => {
                if (indexRow === 0 && indexColumn === 0) {
                    return {
                        isEmpty: true,
                    }
                }

                if (indexRow === 0) {
                    return {
                        isTitleColumn: true,
                        label: column,
                    }
                }

                if (indexColumn === 0) {
                    return {
                        isTitleRow: true,
                        label: indexRow,
                    }
                }

                const ship = ships.find((ship) => ship.positions.some((position) => position.row === indexRow && position.column === indexColumn))

                const isOccupied = Boolean(ship)

                const {
                    color = '', //TODO: chagne variable name to colorShip
                    id: idShip = -1,
                    size: sizeShip = ''
                } = ship ?? {}

                return {
                    row: indexRow,
                    column: indexColumn,
                    isOccupied,
                    color,
                    idShip,
                    sizeShip,
                }
            })
        }))

        initTimer()
    }

    useEffect(() => {
        setShipsInGrid()
    }, [ships])

    const { messageShot, gameWin } = useTakeShot({
        grid,
        setGrid,
        newShot,
    })

    return {
        grid,
        messageShot,
        secondsToInitTime,
        gameWin,
    }
}
