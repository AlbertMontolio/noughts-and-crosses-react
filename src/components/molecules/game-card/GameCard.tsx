import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

type GameGardProps = {
  game: any
}

const StyleGameCard = styled(NavLink)`
  display: flex;
  align-items: center;
  border: 1px solid rgb(200,200,200);
  padding: 10px;
  border-radius: 3px;
`

const User = styled.div`
  background-color: orange;
  border-radius: 60px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-itemes: center;
`

const Joiner = styled(User)`
  margin-left: 10px;
`

const Date = styled.div`
  margin-left: 10px;
`

export const GameCard: FunctionComponent<GameGardProps> = ({game}) => {
  console.log('game', game)
  // @ts-ignore
  const d = new window.Date(game.createdAt)
  const formattedDate = game.createdAt ? new Intl.DateTimeFormat('en').format(d) : ''
  return (
    <StyleGameCard to={`/games/${game.id}`}>
      <User>
        {game.creator?.twoLetters}
      </User>
      <Joiner>
        {game.joiner?.twoLetters}
      </Joiner>
      <Date>
        {formattedDate}
      </Date>
    </StyleGameCard>
  )
}
