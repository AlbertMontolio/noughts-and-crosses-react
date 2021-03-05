import React, { 
  FunctionComponent, 
  useState,
  useEffect
} from 'react'
import styled from 'styled-components'

type SquareProps = {
  saveMove: () => void
  playerType?: string | undefined
  wasClicked: boolean
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
  playerType,
  wasClicked
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  useEffect(() => {
    setIsClicked(wasClicked)
  }, [])

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
