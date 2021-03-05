import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'

type SquareProps = {
  saveMove: () => void
  playerType?: string | undefined
}


type StyledSquareProps = {
  isClicked: boolean
}

const StyledSquare = styled.div<StyledSquareProps>`
  width: 70px;
  height: 70px;
  background-color: ${({isClicked}) => isClicked ? 'orange' : 'white'};
  border: 1px solid rgb(100,100,100);
`

export const Square: FunctionComponent<SquareProps> = ({
  saveMove,
  playerType
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const handleOnClick = () => {
    saveMove()
    // ### independent if call fails...
    setIsClicked(true) 
  }

  return (
    <StyledSquare
      isClicked={isClicked}
      onClick={() => handleOnClick()}
    />
  )
}
