/*
EXAMPLE OF SHIP
{
    positions: [
        {
            id: 1,
            positions: [],
            color: 'black',
            size: 4
        }
    ]
}
*/

import { useEffect, useState } from 'react'
import { getRandomIntFromInterval } from '../../helpers/getRandomIntFromInterval/getRandomIntFromInterval'
import { horizontalOrientation, verticalOrientation } from '../../utils/constants/orientation'

const maxShips = 10
const typeShips = [
    {
        size: 4,
        count: 1,
        color: 'black',
    },
    {
        size: 3,
        count: 2,
        color: 'red',
    },
    {
        size: 2,
        count: 3,
        color: 'blue',
    },
    {
        size: 1,
        count: 4,
        color: 'yellow',
    },
]

export const useBuildShips = () => {
    const [ships, setShips] = useState([])

    //TODO: create helper for each function
    const calculatePositions = (typeShip, rowPosition, columnPosition, orientation) => {
        return Array.from({ length: typeShip.size }).map((position, index) => {
            if (orientation === verticalOrientation) {
                return {
                    column: columnPosition,
                    row: rowPosition + index,
                }
            }

            return {
                column: columnPosition + index,
                row: rowPosition,
            }
        })
    }

    const canBuild = (shipsBuilt, positions) => {
        return !positions.some((position) => {
            return shipsBuilt.some((ship) => {
                return ship.positions.some((occupiedPosition) => {
                    return occupiedPosition.row === position.row && occupiedPosition.column === position.column
                })
            })
        })
    }

    const buildShip = (shipsBuilt, typeShip, rowPosition, columnPosition, orientation) => {
        const positions = calculatePositions(typeShip, rowPosition, columnPosition, orientation)

        if (!canBuild(shipsBuilt, positions)) return

        shipsBuilt.push({
            id: shipsBuilt.length + 1,
            positions,
            color: typeShip.color,
            size: typeShip.size,
        })

        return true
    }

    const getMaxRowPosition = (typeShip, orientation) => {
        if (orientation === verticalOrientation) {
            return 10 - typeShip.size - 1
        }

        return 10
    }

    const getMaxColumnPosition = (typeShip, orientation) => {
        if (orientation === horizontalOrientation) {
            return 10 - typeShip.size - 1
        }

        return 10
    }

    const buildShips = () => {
        let indexTypeShip = 0
        let countShipsBuiltByType = 0
        const shipsBuilt = []

        while (shipsBuilt.length < maxShips) {
            const typeShip = typeShips[indexTypeShip]

            const randomOrientation = getRandomIntFromInterval(1, 2) === 1 ? verticalOrientation : horizontalOrientation

            const maxRowPosition = getMaxRowPosition(typeShip, randomOrientation)
            const randomRowPosition = getRandomIntFromInterval(1, maxRowPosition)

            const maxColumnPosition = getMaxColumnPosition(typeShip, randomOrientation)
            const randomColumnPosition = getRandomIntFromInterval(1, maxColumnPosition)

            if (buildShip(shipsBuilt, typeShip, randomRowPosition, randomColumnPosition, randomOrientation)) {
                countShipsBuiltByType++

                if (typeShip.count === countShipsBuiltByType) {
                    indexTypeShip++

                    countShipsBuiltByType = 0
                }
            }
        }

        setShips(shipsBuilt)
    }

    useEffect(() => {
        buildShips()
    }, [])

    return {
        ships,
    }
}
