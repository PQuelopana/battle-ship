import React, { useEffect, useState } from 'react'
import { Grid } from '../../components/Grid/Grid';

import { useBuildShips } from '../../hooks/useBuildShips/useBuildShips';
import { useGenerateGrid } from '../../hooks/useGenerateGrid/useGenerateGrid';

import './GameBoard.scss'

export const GameBoard = () => {
    const [maxShots, setMaxShots] = useState(0)
    const [shots, setShots] = useState([])
    const [newShot, setNewShot] = useState(null)
    const [gameOver, setGameOver] = useState(false)
    const [message, setMessage] = useState('')

    const { ships } = useBuildShips()

    const { grid, messageShot, secondsToInitTime, gameWin } = useGenerateGrid({
        ships,
        newShot,
    })

    const verifyIfExistShotInPosition = (row, column) => {
        return shots.some((shot) => shot.row === row && shot.column === column)
    }

    const handleAddNewShot = (row, column) => {
        if (gameOver || secondsToInitTime > 0) return null

        if (verifyIfExistShotInPosition(row, column)) return null

        const _newShot = {
            row,
            column,
            current: true,
        }

        setShots([].concat(shots.map((shot) => ({ ...shot, current: false })), _newShot))

        setNewShot(_newShot)
    }

    useEffect(() => {
        let numberShifts = 0

        while (numberShifts <= 0 || isNaN(numberShifts)) {
            numberShifts = parseInt(prompt('Enter the number of shifts'), 10) //TODO: replace for custom component
        }

        setMaxShots(numberShifts)
    }, [])

    useEffect(() => {
        if (maxShots > 0 && shots.length === maxShots) {
            setGameOver(true)

            setMessage('Game Over')
        }
    }, [shots])

    useEffect(() => {
        if (!gameOver && messageShot !== '') setMessage(messageShot)
    }, [messageShot])

    useEffect(() => {
        if (gameWin) setGameOver(true)
    }, [gameWin])

    if (!maxShots) {
        return null
    }

    return (
        <div className="board">
            <span className="board__title">
                Board
            </span>

            <Grid
                onClickSquare={handleAddNewShot}
                grid={grid}
                hideShips={secondsToInitTime === 0}
                gameOver={gameOver}
            />

            <span className={[].concat(['board__message-informative'], secondsToInitTime <= 0 ? ['is-inactive'] : []).join(' ')}>
                The Game will start in { secondsToInitTime }
            </span>

            <span className="board__message-shot">
                { message }
            </span>
        </div>
    )
}
