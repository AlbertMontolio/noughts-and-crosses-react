import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

type SquareProps = {
  onClick: () => void
}

const StyledSquare = styled.div`
  width: 70px;
  height: 70px;
  background-color: rgb(220,220,200);
  border: 1px solid rgb(100,100,100);
`

export const Square: FunctionComponent<SquareProps> = ({onClick}) => {
  return (
    <StyledSquare onClick={() => onClick()}>
      square
    </StyledSquare>
  )
}
