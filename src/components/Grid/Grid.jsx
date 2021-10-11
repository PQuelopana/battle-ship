import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { GridSquare } from '../GridSquare/GridSquare'

import './Grid.scss'

export const Grid = ({
    onClickSquare,
    grid,
    hideShips,
    gameOver,
}) => {

    return (
        <div className="grid">
            {
                !grid.length
                    ? '...loading'
                    : (
                        <div className="grid__board">
                            {
                                grid.map((areas, indexAreas) => {
                                    return areas.map(({ isEmpty, isTitleRow, isTitleColumn, label, row, column, isOccupied, color, existShot }, indexArea) => {
                                        const key = `${ indexAreas }${ indexArea }`

                                        if (isEmpty) {
                                            return <span key={key}></span>
                                        }

                                        if (isTitleColumn || isTitleRow) {
                                            return (
                                                <span key={key} className={`grid__${ isTitleColumn ? 'column' : 'row' }`}>
                                                    { label }
                                                </span>
                                            )
                                        }

                                        return (
                                            <GridSquare
                                                key={key}
                                                onClick={onClickSquare}
                                                row={row}
                                                column={column}
                                                isOccupied={isOccupied}
                                                color={color}
                                                existShot={existShot}
                                                hideShip={hideShips}
                                                gameOver={gameOver}
                                            />
                                        )
                                    })
                                })
                            }
                        </div>
                    )
            }
        </div>
    )
}

Grid.propTypes = {
    // title: PropTypes.string,
}