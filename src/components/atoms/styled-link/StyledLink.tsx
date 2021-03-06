import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const StyledWrapper = styled(NavLink)`
  background-color: rgb(200,200,200);
  padding: 10px 20px;
  border-radius: 60px;
  text-decoration: none;
`

type StyledLinkProps = {
  to: string
}

export const StyledLink: FunctionComponent<StyledLinkProps> = ({children, to}) => {
  return (
    <StyledWrapper to={to}>
      {children}
    </StyledWrapper>
  )
}
