import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

type GameGardProps = {
  game: any
  onClick?: () => void
}

const StyleGameCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(200,200,200);
  padding: 10px;
  border-radius: 3px;
  margin-top: 10px;
`

const User = styled.div`
  background-color: orange;
  border-radius: 60px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Joiner = styled(User)`
  margin-left: 10px;
  background-color: green;
`

const Date = styled.div`
  margin-left: 10px;
`

const Button = styled(NavLink)`
  background-color: rgb(200,200,200);
  padding: 7px 20px;
  margin-left: 10px;
  border-radius: 60px;
  text-decoration: none;
`

const Left = styled.div`
  display: flex;
  align-items: center;
`

export const GameCard: FunctionComponent<GameGardProps> = ({
  game,
  onClick
}) => {
  // @ts-ignore
  const d = new window.Date(game.createdAt)
  const formattedDate = game.createdAt ? new Intl.DateTimeFormat('en').format(d) : ''
  return (
    <StyleGameCard>
      <Left>
        <User>
          {game.creator?.twoLetters}
        </User>
        <Joiner>
          {game.joiner?.twoLetters}
        </Joiner>
        <Date>
          {formattedDate}
        </Date>
      </Left>
      <Button to={`/games/${game.id}`} onClick={onClick}>
        join
      </Button>
    </StyleGameCard>
  )
}
