import React, { 
  useState, 
  useEffect, 
  createContext, 
  useContext,
  FunctionComponent
} from 'react'

import { urls } from '../../config'
import { useAuthorize } from '../../providers/authorize-provider/AuthorizeProvider'

const GameContext = createContext<any>([])

const GameInitState = {}

export const GameProvider: FunctionComponent = ({
  children
}) => {
  const gameId = 1
  const { authorize: { backendUserId, authorizeToken } } = useAuthorize()
  console.log('### backendUserId', backendUserId)
  const [game, setGame] = useState(GameInitState)
  console.log('game', game)
  const fetchData = async () => {
    const url = `${urls.productionApi}/games/${gameId}`

    try {
      const response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-type': 'application/json',
          'Authorization': authorizeToken
        }
      })
      const responseData = await response.json()
      console.log('### MyGamesProvider responseData', responseData)
      setGame(responseData)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <GameContext.Provider value={game}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const game = useContext(GameContext)

  return { game }
}
