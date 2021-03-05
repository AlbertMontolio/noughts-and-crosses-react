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

  const [boardValues, setBoardValues] = useState([
    { posX: 0, posY: 0, value: false },
    { posX: 0, posY: 1, value: false },
    { posX: 0, posY: 2, value: false },
    { posX: 1, posY: 0, value: false },
    { posX: 1, posY: 1, value: false },
    { posX: 1, posY: 2, value: false },
    { posX: 2, posY: 0, value: false },
    { posX: 2, posY: 1, value: false },
    { posX: 2, posY: 2, value: false }
  ])
  console.log('### boardValues', boardValues)

  useEffect(() => {
    if (!moves) { return }

    moves.forEach((move: any) => {
      // ### refactor
      const newBoardValues = [...boardValues]
      let newBoardValue = boardValues.find((boardValue: any) => boardValue.posX === move.pos_x && boardValue.posY === move.pos_y)

      if (newBoardValue) {
        newBoardValue.value = true
      }

      setBoardValues(newBoardValues)
    })
  }, [moves])

  // ### refactor if time
  return (
    <StyledBoard>
      {boardValues && (
        <>
          <Row>
            <>
              {boardValues[0].value === true && (
                <Square 
                  wasClicked={boardValues[0].value} 
                  saveMove={() => handleOnClick({posX: 0, posY: 0})} 
                />
              )}
              {boardValues[0].value === false && (
                <Square 
                  wasClicked={false} 
                  saveMove={() => handleOnClick({posX: 0, posY: 0})} 
                />
              )}
            </>
            <Square 
              wasClicked={boardValues[1].value} 
              saveMove={() => handleOnClick({posX: 0, posY: 1})} 
            />
            <Square 
              wasClicked={boardValues[2].value} 
              saveMove={() => handleOnClick({posX: 0, posY: 2})} 
            />
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
        </>
      )}
    </StyledBoard>
  )
}
