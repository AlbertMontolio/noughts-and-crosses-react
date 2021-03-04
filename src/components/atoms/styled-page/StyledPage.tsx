import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  background-color: rgb(250,250,250);
  padding: 10px;
  min-height: calc(100vh - 50px);
  margin-top: 50px;
  box-sizing: border-box;
`

export const StyledPage: FunctionComponent = ({ children }) => {
  return (
    <StyledWrapper>
      {children}
    </StyledWrapper>
  )
}