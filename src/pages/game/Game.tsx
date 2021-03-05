import React from 'react'
import { StyledPage } from '../../components/atoms/styled-page/StyledPage'
import { Board } from '../../components/molecules/board/Board'
import { GameProvider, useGame } from '../../providers/game-provider/GameProvider'
import { GameCard } from '../../components/molecules/game-card/GameCard'
const GameWithData = () => {
  const { game } = useGame()
  return (
    <StyledPage>
      <GameCard game={game} />
      <Board />
    </StyledPage>
  )
}

export const Game = () => {
  return (
    <GameProvider>
      <GameWithData />
    </GameProvider>
  )
}
