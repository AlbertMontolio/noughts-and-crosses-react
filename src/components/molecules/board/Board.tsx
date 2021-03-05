import React from 'react'
import styled from 'styled-components'

import { Square } from '../../atoms/square/Square'
import { urls } from '../../../config'
import { useAuthorize } from '../../../providers/authorize-provider/AuthorizeProvider'

const StyledBoard = styled.div`
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

export const Board = () => {
  const gameId = 1
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

  // ### refactor if time
  return (
    <StyledBoard>
      <Row>
        <Square saveMove={() => handleOnClick({posX: 0, posY: 0})} />
        <Square saveMove={() => handleOnClick({posX: 0, posY: 1})} />
        <Square saveMove={() => handleOnClick({posX: 0, posY: 2})} />
      </Row>
      <Row>
        <Square saveMove={() => handleOnClick({posX: 1, posY: 0})} />
        <Square saveMove={() => handleOnClick({posX: 1, posY: 1})} />
        <Square saveMove={() => handleOnClick({posX: 1, posY: 2})} />
      </Row>
      <Row>
        <Square saveMove={() => handleOnClick({posX: 2, posY: 0})} />
        <Square saveMove={() => handleOnClick({posX: 2, posY: 1})} />
        <Square saveMove={() => handleOnClick({posX: 2, posY: 2})} />
      </Row>
    </StyledBoard>
  )
}
