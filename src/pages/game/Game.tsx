import React from 'react'
import styled from 'styled-components'
import { StyledPage } from '../../components/atoms/styled-page/StyledPage'
import { Board } from '../../components/molecules/board/Board'
import { GameProvider, useGame } from '../../providers/game-provider/GameProvider'
import { Header } from './Header'
import { useParams } from "react-router-dom"

const StyledBoard = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
`

const GameWithData = () => {
  const { game } = useGame()
  return (
    <StyledPage>
      <Header game={game} />
      <StyledBoard>
        <Board />
      </StyledBoard>
    </StyledPage>
  )
}

export const Game = () => {
  // @ts-ignore
  const { gameId } = useParams()
  console.log('gameId', gameId)

  return (
    <GameProvider gameId={gameId}>
      <GameWithData />
    </GameProvider>
  )
}
