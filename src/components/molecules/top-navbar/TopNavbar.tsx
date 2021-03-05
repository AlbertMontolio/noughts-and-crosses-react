import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import  RightNavbar from '../right-navbar/RightNavbar'
import { useAuthorize } from '../../../providers/authorize-provider/AuthorizeProvider'

const PositionWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
`

const StyledLogo = styled(NavLink)`
  display: flex;
  align-items: center;
`

const Text = styled.div`
  font-weight: bold;
  margin-left: 5px;
`

const StyledTopNavbar = styled.div`
	height: 50px;
	width: 100%;
  display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: rgb(245,245,245);
  border-top: 1px solid rgb(240,240,240);
  padding: 0px 10px;
  box-sizing: border-box;
`

export const TopNavbar = () => {
  const { authorize: { email } } = useAuthorize()

  return (
    <PositionWrapper>
      <StyledTopNavbar>
        <StyledLogo to='/'>
          <Text>
            Home {email && email.slice(0,2)}
          </Text>
        </StyledLogo>
        <RightNavbar />
      </StyledTopNavbar>
    </PositionWrapper>
  )
}
