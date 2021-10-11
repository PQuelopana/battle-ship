import React from 'react'
import { useHistory } from 'react-router-dom';

import './Menu.scss'

const options = [
    {
        name: 'game-configuration',
        description: 'Game Configuration',
    },
    {
        name: 'game-board',
        description: 'Game Board',
    },
    {
        name: 'list-finished-games',
        description: 'List Of Finished Games',
    },
]

export const Menu = () => {
    const history = useHistory()

    const handleClickOption = (option) => {
        history.push(`/${option}`)
    }

    return (
        <div className="menu">
            <span className="menu__title">
                Menu
            </span>

            <ul className="menu__options">
                {
                    options.map((option) => (
                        <li
                            onClick={() => handleClickOption(option.name)}
                            className="menu__option"
                        >
                            { option.description}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
