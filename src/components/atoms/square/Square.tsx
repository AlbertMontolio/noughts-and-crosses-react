import React, { 
  FunctionComponent, 
  useState,
  useEffect
} from 'react'
import styled from 'styled-components'

type SquareProps = {
  saveMove: () => void
  type: string | null
  isCreator: boolean
}


type StyledSquareProps = {
  isClicked?: boolean
  isUserCreator?: boolean
  colorFullSquare?: string
  fullColor?: string
  clickedColor?: string
}

const StyledSquare = styled.div`
  border-radius: 3px;
`

const FullSquare = styled.div<StyledSquareProps>`
  width: 70px;
  height: 70px;
  background-color: ${({colorFullSquare}) => colorFullSquare};
  border: 1px solid rgb(100,100,100);
`

const EmptySquare = styled.div<StyledSquareProps>`
  width: 70px;
  height: 70px;
  background-color: ${({clickedColor}) => clickedColor };
  border: 1px solid rgb(100,100,100);
`

export const Square: FunctionComponent<SquareProps> = ({
  saveMove,
  type,
  isCreator
}) => {
  const [clickedColor, setClickedColor] = useState('white')
  let colorFullSquare = 'white'

  if (type === 'cross') {
    colorFullSquare = 'orange'
  }

  if (type === 'nought') {
    colorFullSquare = 'green'
  }

  console.log('colorFullSquare', colorFullSquare)
  const handleOnClick = () => {
    console.log('clickinggggg')
    saveMove()
    // ### independent if call fails...
    setClickedColor(isCreator ? 'orange' : 'green')
  }


  return (
    <StyledSquare>
      {type && (
        <FullSquare 
          colorFullSquare={colorFullSquare} 
        />
      )}
      {!type && clickedColor && (
        <EmptySquare
          clickedColor={clickedColor}
          onClick={() => handleOnClick()} 
        />
      )}
    </StyledSquare>
  )
}
