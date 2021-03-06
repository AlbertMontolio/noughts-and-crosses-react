import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
// not possible to use absolute paths with create-react-app, they are working on it
import { Home } from './pages/home/Home'
import { LogIn } from './pages/log-in/LogIn'
import { MyGames } from './pages/my-games/MyGames'
import { Game } from './pages/game/Game'
import { Congratulations } from './pages/congratulations/Congratulations'
import { TopNavbar } from './components/molecules/top-navbar/TopNavbar'
import { AuthorizeProvider } from './providers/authorize-provider/AuthorizeProvider'
import { AuthenticateProvider } from './providers/authenticate-provider/AuthenticateProvider'

export const App = () => {
  return (
    <Router>
      <AuthorizeProvider>
        <AuthenticateProvider>
          <TopNavbar />
          <Route exact path='/' component={Home} />
          <Route exact path='/log-in' component={LogIn} /> 
          <Route exact path='/my-games' component={MyGames} /> 
          <Route exact path='/congratulations' component={Congratulations} /> 
          <Route exact path='/games/:gameId' component={Game} /> 
        </AuthenticateProvider>
      </AuthorizeProvider>
    </Router>
  )
}
