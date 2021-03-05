import React from 'react'
import { StyledPage } from '../../components/atoms/styled-page/StyledPage'

import { useMyGames, MyGamesProvider } from '../../providers/my-games-provider/MyGamesProvider'
import { useAuthorize } from '../../providers/authorize-provider/AuthorizeProvider'
import { urls } from '../../config'
import { GameCard } from '../../components/molecules/game-card/GameCard'

const MyGamesWithData = () => {
  const { myGames: { createdGames, restGames, joinedGames } } = useMyGames()
  console.log('### createdGames', createdGames)
  const { authorize: { backendUserId, authorizeToken } } = useAuthorize()

  console.log('my games', createdGames)
  const createGame = () => {
    const saveGameBackend = async () => {
      const url = `${urls.productionApi}/users/${backendUserId}/games`

      try {
        const response = await fetch(url, {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
            'Authorization': authorizeToken
          }
        })

        const responseData = await response.json()
        console.log('### createGame responseData', responseData)
      } catch (error) {
        // ### handle error if time
      }
    }

    backendUserId && authorizeToken && saveGameBackend()
  }

  const joinGame = () => {
    const gameId = 1
    const joinGameBackend = async () => {
      const url = `${urls.productionApi}/games/${gameId}/join`

      try {
        const response = await fetch(url, {
          method: 'get',
          headers: {
            'Content-type': 'application/json',
            'Authorization': authorizeToken
          }
        })

        const responseData = await response.json()
        console.log('### joinGameBackend responseData', responseData)
      } catch (error) {
        // ### handle error if time
      }
    }

    backendUserId && authorizeToken && joinGameBackend()
  }

  return (
    <StyledPage>
      <button onClick={() => createGame()}>
        create game
      </button>
      <h1>my created games</h1>
      <div>
        {createdGames.map((createdGame: any) => (
          <GameCard 
            game={createdGame} 
          />
        ))}
      </div>
      <h1>joined games</h1>
      <div>
        {joinedGames.map((joinedGame: any) => (
          <GameCard
            game={joinedGame} 
          />
        ))}
      </div>
      <h1>games to join</h1>
      <div>
        {restGames.map((restGame: any) => (
          <GameCard
            onClick={() => joinGame()}
            game={restGame} 
          />
        ))}
      </div>
    </StyledPage>
  )
}

export const MyGames = () => {
  return (
    <MyGamesProvider>
      <MyGamesWithData />
    </MyGamesProvider>
  )
}
