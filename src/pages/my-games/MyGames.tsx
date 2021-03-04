import React from 'react'
import { StyledPage } from '../../components/atoms/styled-page/StyledPage'

import { useMyGames, MyGamesProvider } from '../../providers/my-games-provider/MyGamesProvider'

const MyGamesWithData = () => {
  const { myGames } = useMyGames()
  console.log('my games')
  return (
    <StyledPage>
      <h1>my games</h1>
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
