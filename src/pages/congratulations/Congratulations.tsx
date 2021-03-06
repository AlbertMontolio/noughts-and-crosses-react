import React from 'react'
import styled from 'styled-components'
import { StyledPage } from '../../components/atoms/styled-page/StyledPage'
import { useAuthorize } from '../../providers/authorize-provider/AuthorizeProvider'
import { StyledLink } from '../../components/atoms/styled-link/StyledLink'

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

  return (
    <StyledPage>
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