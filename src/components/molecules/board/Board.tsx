import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Square } from '../../atoms/square/Square'
import { urls } from '../../../config'
import { useAuthorize } from '../../../providers/authorize-provider/AuthorizeProvider'
import { useGame } from '../../../providers/game-provider/GameProvider'

const StyledBoard = styled.div`
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

export const Board = () => {
  const gameId = 1
  const { game: { moves } } = useGame()
  const { authorize: { backendUserId, authorizeToken } } = useAuthorize()
  const handleOnClick = async ({
    posX, 
    posY
  }: {
    posX: number,
    posY: number
  }) => {
    const saveMoveBackend = async () => {
      const url = `${urls.productionApi}/games/${gameId}/moves`

      try {
        const response = await fetch(url, {
          method: 'post',
          body: JSON.stringify({
            posX: posX,
            posY: posY
          }),
          headers: {
            'Content-type': 'application/json',
            'Authorization': authorizeToken
          }
        })

        const responseData = await response.json()
        console.log('### createGame responseData', responseData)
      } catch (error) {
        // ### handle error if time
      }
    }

    backendUserId && authorizeToken && saveMoveBackend()
  }

  const [firstSquareValue, setFirstSquarevalue] = useState(false)
  const [secondSquareValue, setSecondSquarevalue] = useState(false)

  useEffect(() => {
    if (!moves) { return }
    const firstMove = moves.filter((move: any) => move.pos_x === 0 && move.pos_y === 0)
    if (firstMove.length > 0) {
      setFirstSquarevalue(true)
    }
    const secondMove = moves.filter((move: any) => move.pos_x === 0 && move.pos_y === 1)
    if (secondMove.length > 0) {
      setSecondSquarevalue(true)
    }
    console.log('firstMove', firstMove)
    console.log('secondMove', secondMove)
  }, [moves])

  // ### refactor if time
  return (
    <StyledBoard>
      <Row>
        {firstSquareValue && (
          <Square 
            wasClicked={firstSquareValue} 
            saveMove={() => handleOnClick({posX: 0, posY: 0})} 
          />
        )}
        {secondSquareValue && (
          <Square 
            wasClicked={secondSquareValue} 
            saveMove={() => handleOnClick({posX: 0, posY: 1})} 
          />
        )}
        <Square wasClicked={false} saveMove={() => handleOnClick({posX: 0, posY: 2})} />
      </Row>
      <Row>
        <Square wasClicked={false} saveMove={() => handleOnClick({posX: 1, posY: 0})} />
        <Square wasClicked={false} saveMove={() => handleOnClick({posX: 1, posY: 1})} />
        <Square wasClicked={false} saveMove={() => handleOnClick({posX: 1, posY: 2})} />
      </Row>
      <Row>
        <Square wasClicked={false} saveMove={() => handleOnClick({posX: 2, posY: 0})} />
        <Square wasClicked={false} saveMove={() => handleOnClick({posX: 2, posY: 1})} />
        <Square wasClicked={false} saveMove={() => handleOnClick({posX: 2, posY: 2})} />
      </Row>
    </StyledBoard>
  )
}
