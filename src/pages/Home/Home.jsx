import React from 'react'
import { Menu } from '../../components/Menu/Menu'

import './Home.scss'

export const Home = () => {
    return (
        <div className="home">
            <h1 className="home__title">
                Home
            </h1>

            <Menu />
        </div>
    )
}
