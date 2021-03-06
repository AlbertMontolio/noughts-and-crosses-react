import React, { useState, FunctionComponent } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

import { urls } from '../../config'
import { useAuthenticate } from '../../providers/authenticate-provider/AuthenticateProvider'
import { useAuthorize } from '../../providers/authorize-provider/AuthorizeProvider'
import { useUser } from '../../providers/user-provider/UserProvider'
import { StyledPage } from '../../components/atoms/styled-page/StyledPage'
import { useHistory } from "react-router-dom"

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledInput = styled.input`
  width: 200px;
  height: 30px;
  margin-bottom: 20px;
`

const Label = styled.div`
  margin-top: 20px;
  margin-bottom: 5px;
`

export const LogIn: FunctionComponent = () => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { authorize, setAuthorize } = useAuthorize()

  const handleOnSubmit = () => {
    const signInBackend = async () => {
      const url = `${urls.productionApi}/sign-in-with-email`
  
      try {
        const response = await fetch(url, {
          method: 'post',
          body: JSON.stringify({
            email: email,
            password: password
          }),
          headers: {
            'Content-type': 'application/json'
          }
        })
        const json = await response.json()
  
        if (json.authorization_token) {
          // @ts-ignore
          setAuthorize({
            // @ts-ignore
            ...authorize, 
            authorizeToken: json.authorization_token, 
            backendUserId: json.backendUserId,
            email: json.email
          })

          history.push('/my-games')
        } else {
          console.log('something went wrong')
        }
        
      } catch (error) {
      }
    }
    signInBackend()
  }

  return (
    <StyledPage>
      <Inputs>
        <Label>
          email
        </Label>
        <StyledInput onChange={(e) => setEmail(e.target.value)} />
        <Label>
          password
        </Label>
        <StyledInput type='password' onChange={(e) => setPassword(e.target.value)} />
      </Inputs>
      <Button 
        variant='contained' 
        onClick={() => handleOnSubmit()}
      >
        LOG IN
      </Button>
    </StyledPage>
  )
}
