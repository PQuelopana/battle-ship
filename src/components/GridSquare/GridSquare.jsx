import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import './GridSquare.scss'

export const GridSquare = ({
    column,
    row,
    onClick,
    isOccupied,
    color,
    existShot,
    hideShip,
    gameOver,
}) => {
    const [stateClassIsOccupied, setStateClassIsOccupied] = useState([])
    const [stateClassColor, setStateClassColor] = useState([])
    const [stateClassExistShot, setStateClassExistShot] = useState([])
    const [stateClassGameOver, setStateClassGameOver] = useState([])
    const [stateClassTimerIsActive, setStateClassTimerIsActive] = useState([])

    const handleClick = () => {
        if (typeof onClick === 'function') onClick(row, column)
    }

    useEffect(() => {
        setStateClassIsOccupied(isOccupied ? ['is-occupied'] : [])
    }, [isOccupied])

    useEffect(() => {
        setStateClassColor(!hideShip && !existShot && color ? [`is-${ color }`] : [])
    }, [hideShip, color, existShot])

    useEffect(() => {
        setStateClassTimerIsActive(!hideShip ? ['is-timer-active'] : [])
    }, [hideShip])

    useEffect(() => {
        setStateClassExistShot(existShot ? ['exist-shot'] : [])
    }, [existShot])

    useEffect(() => {
        setStateClassGameOver(gameOver ? ['game-over'] : [])
    }, [gameOver])

    return (
        <div
            className={[].concat(['square'], stateClassColor, stateClassIsOccupied, stateClassExistShot, stateClassGameOver, stateClassTimerIsActive).join(' ')}
            onClick={handleClick}
        />
    )
}

GridSquare.propTypes = {
    column: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    // onClick: PropTypes.func.isRequired,
}

GridSquare.defaultProps = {
    color: '',
    isOccupied: false,
    existShot: false,
    hideShip: false,
    gameOver: false,
}
