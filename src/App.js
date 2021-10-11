import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.scss'
import { Default } from './layouts/Default/Default'
import { GameBoard } from './pages/GameBoard/GameBoard'
import { GameConfiguration } from './pages/GameConfiguration'
import { Home } from './pages/Home/Home'
import { ListFinishedGames } from './pages/ListFinishedGames'

// const Home = lazy(() => import('./pages/Home'))
// const GameConfiguration = lazy(() => import('./pages/GameConfiguration'))
// const GameBoard = lazy(() => import('./pages/GameBoard'))
// const ListFinishedGames = lazy(() => import('./pages/ListFinishedGames'))

function App() {
  return (
    <Default>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/game-configuration" component={GameConfiguration}/>
            <Route path="/game-board" component={GameBoard}/>
            <Route path="/list-finished-games" component={ListFinishedGames}/>
          </Switch>
        </Suspense>
      </Router>
    </Default>
  )
}

export default App
