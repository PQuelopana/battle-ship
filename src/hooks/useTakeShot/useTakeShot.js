import { useEffect, useState } from 'react'

export const useTakeShot = ({
    grid,
    setGrid,//TODO: change by a callback to decouple from setGrid
    newShot,
}) => {
    const [messageShot, setMessageShot] = useState('')
    const [idShipsDowned, setIdShipsDowned] = useState([])
    const [gameWin, setGameWin] = useState(false)

    useEffect(() => {
        if (!grid.length || !newShot) return

        const currentShot = newShot

        setGrid((grid) => {
            return grid.map((areas) => {
                return areas.map((area) => {
                    if (area.existShot) return area

                    const isTheSameAreaOfCurrentShot = currentShot.row === area.row && currentShot.column === area.column

                    if (!isTheSameAreaOfCurrentShot) return area

                    if (area.isOccupied) {
                        const { idShip } = area
                        const currentShot = 1

                        let previousShotsOnShipFired = 0
                        
                        grid.forEach((_areas) => {
                            return _areas.forEach((_area) => {
                                if (_area.idShip === idShip && _area.existShot) previousShotsOnShipFired++
                            })
                        })

                        const isShipDown = previousShotsOnShipFired + currentShot === area.sizeShip

                        if (isShipDown) {
                            setIdShipsDowned((idShipsDowned) => {
                                const idShipIsAllReadyDowned = idShipsDowned.includes(idShip)

                                if (idShipIsAllReadyDowned) return idShipsDowned

                                return [].concat(idShipsDowned, [idShip])
                            })

                            setMessageShot('Downed Ship :D')
                        } else {
                            setMessageShot('Landed Shot :)')
                        }
                    } else {
                        setMessageShot('Failed Shot :(')
                    }

                    return {
                        ...area,
                        existShot: true,
                    }
                })
            })
        })
    }, [newShot])

    useEffect(() => {
        if (idShipsDowned.length === 10) {
            setGameWin(true)
            setMessageShot('All Ships are downed, Congratulations!!!')
        }
    }, [idShipsDowned])

    return {
        messageShot,
        gameWin,
    }
}
