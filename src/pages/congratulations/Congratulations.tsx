import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { StyledPage } from '../../components/atoms/styled-page/StyledPage'
import { useAuthorize } from '../../providers/authorize-provider/AuthorizeProvider'
import { StyledLink } from '../../components/atoms/styled-link/StyledLink'
import Confetti from 'react-dom-confetti'

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
`

const Text = styled.div`
  font-weight: bold;
  font-size: 26px;
  padding: 0px 20px;
  text-align: center;
`

const LinkWrapper = styled.div`
  margin-top: 40px; 
  display: flex;
  justify-content: center;
  width: 100%;
`

export const Congratulations = () => {
  const { authorize: { email } } = useAuthorize()
  const [start, setStart] = useState(false)

  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  }

  useEffect(() => {
    setStart(true)
  }, [])

  return (
    <StyledPage>
      <Confetti active={ start } config={config} />
      <StyledContent>
        <Text>
          {`Congrats ${email}, you won!`}
        </Text>
      </StyledContent>
      <LinkWrapper>
        <StyledLink to='/my-games'>
          Play again
        </StyledLink>
      </LinkWrapper>
    </StyledPage>
  )
}