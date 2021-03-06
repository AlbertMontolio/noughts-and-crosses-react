import React from 'react'
import styled from 'styled-components'
import { StyledPage } from '../../components/atoms/styled-page/StyledPage'

import { useMyGames, MyGamesProvider } from '../../providers/my-games-provider/MyGamesProvider'
import { useAuthorize } from '../../providers/authorize-provider/AuthorizeProvider'
import { urls } from '../../config'
import { GameCard } from '../../components/molecules/game-card/GameCard'
import Button from '@material-ui/core/Button'
import { useHistory } from "react-router-dom"

const StyledCreateGameBtn = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`

const MyGamesWithData = () => {
  const history = useHistory()
  const { myGames: { createdGames, restGames, joinedGames } } = useMyGames()
  const { authorize: { backendUserId, authorizeToken } } = useAuthorize()

  // ### move to provider or actions
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
        const { gameId } = responseData

        history.push(`/games/${gameId}`)
      } catch (error) {
        // ### handle error if time
      }
    }

    backendUserId && authorizeToken && saveGameBackend()
  }

  // ### move to provider or actions
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
      } catch (error) {
        // ### handle error if time
      }
    }

    backendUserId && authorizeToken && joinGameBackend()
  }

  return (
    <StyledPage>
      <StyledCreateGameBtn>
        <Button variant='contained'  onClick={() => createGame()}>
          create game
        </Button>
      </StyledCreateGameBtn>
      <h3>my created games</h3>
      <div>
        {createdGames.map((createdGame: any) => (
          <GameCard 
            game={createdGame} 
          />
        ))}
      </div>
      <h3>joined games</h3>
      <div>
        {joinedGames.map((restGame: any) => (
          <GameCard
            onClick={() => joinGame()}
            game={restGame} 
          />
        ))}
      </div>
      <h3>games to join</h3>
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
