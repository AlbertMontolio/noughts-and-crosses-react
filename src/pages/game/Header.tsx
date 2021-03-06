import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

type HeaderProps = {
  game: any
}

const StyledHeader = styled.div`
`

const Player = styled.div`
  padding: 6px 10px;
  border-radius: 60px;
`

const Creator = styled(Player)`
  background-color: orange;
`

const Joiner = styled(Player)`
  background-color: green;
  margin-left: 20px;
`

const Players = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledEmptyState = styled.div`
  background-color: #ff8787;
  color: white; 
  padding: 5px;
  border-radius: 4px;
  border: 1px solid red;
`

const EmptyState = () => {
  return (
    <StyledEmptyState>
      no joiner, please wait and refresh until I add action cable
    </StyledEmptyState>
  )
}

export const Header: FunctionComponent<HeaderProps> = ({game}) => {
  const { creator: { email: creatorEmail }, joiner } = game
  if (!joiner) { return <EmptyState /> }
  const { email: joinerEmail } = joiner
  return (
    <StyledHeader>
      <Players>
        <Creator>
          {creatorEmail}
        </Creator>
        <Joiner>
          {joinerEmail}
        </Joiner>
      </Players>
    </StyledHeader>
  )
}
