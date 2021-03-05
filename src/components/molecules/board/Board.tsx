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
  const { game: { moves, creator: { id: creatorId } } } = useGame()
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

  const [boardValues, setBoardValues] = useState([
    { posX: 0, posY: 0, type: null },
    { posX: 0, posY: 1, type: null },
    { posX: 0, posY: 2, type: null },
    { posX: 1, posY: 0, type: null },
    { posX: 1, posY: 1, type: null },
    { posX: 1, posY: 2, type: null },
    { posX: 2, posY: 0, type: null },
    { posX: 2, posY: 1, type: null },
    { posX: 2, posY: 2, type: null }
  ])

  useEffect(() => {
    if (!moves) { return }

    moves.forEach((move: any) => {
      // ### refactor
      const newBoardValues = [...boardValues]
      console.log('### move', move)
      let newBoardValue = boardValues.find((boardValue: any) => boardValue.posX === move.posX && boardValue.posY === move.posY)

      console.log('### newBoardValue', newBoardValue)
      if (newBoardValue) {
        newBoardValue.type = move.type
      }

      setBoardValues(newBoardValues)
    })
  }, [moves])

  const [isCreator, setIsCreator] = useState(false)

  useEffect(() => {
    if (creatorId === backendUserId) {
      setIsCreator(true)
    }
  }, [creatorId, backendUserId])

  // ### refactor if time
  return (
    <StyledBoard>
      <Row>
        <Square
          isCreator={isCreator}
          type={boardValues[0].type}
          saveMove={() => handleOnClick({posX: 0, posY: 0})} 
        />
        <Square
          isCreator={isCreator}
          type={boardValues[1].type}
          saveMove={() => handleOnClick({posX: 0, posY: 1})} 
        />
        <Square
          isCreator={isCreator}
          type={boardValues[2].type}
          saveMove={() => handleOnClick({posX: 0, posY: 2})} 
        />
      </Row>
      <Row>
        <Square
          isCreator={isCreator}
          type={boardValues[3].type}
          saveMove={() => handleOnClick({posX: 1, posY: 0})} 
        />
        <Square 
          isCreator={isCreator}
          type={boardValues[4].type}
          saveMove={() => handleOnClick({posX: 1, posY: 1})} 
        />
        <Square 
          isCreator={isCreator}
          type={boardValues[5].type}
          saveMove={() => handleOnClick({posX: 1, posY: 2})} 
        />
      </Row>
      <Row>
        <Square 
          isCreator={isCreator}
          type={boardValues[6].type}
          saveMove={() => handleOnClick({posX: 2, posY: 0})} 
        />
        <Square 
          isCreator={isCreator}
          type={boardValues[7].type}
          saveMove={() => handleOnClick({posX: 2, posY: 1})} 
        />
        <Square 
          isCreator={isCreator}
          type={boardValues[8].type}
          saveMove={() => handleOnClick({posX: 2, posY: 2})} 
        />
      </Row>
    </StyledBoard>
  )
}
