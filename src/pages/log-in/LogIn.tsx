import React, { useState, FunctionComponent } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

import { urls } from '../../config'
import { useAuthenticate } from '../../providers/authenticate-provider/AuthenticateProvider'
import { useAuthorize } from '../../providers/authorize-provider/AuthorizeProvider'
import { useUser } from '../../providers/user-provider/UserProvider'
import { StyledPage } from '../../components/atoms/styled-page/StyledPage'

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

type SignInFormProps = {
  history: any
}

export const LogIn: FunctionComponent<SignInFormProps> = ({history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { authenticate, setAuthenticate } = useAuthenticate()
  const { authorize, setAuthorize } = useAuthorize()
  const { setUser, user } = useUser()

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
  
        console.log('json>>>', json)
  
        if (json.authorization_token) {
          // @ts-ignore
          // ### TODO: remove provider
          setAuthenticate({
            // @ts-ignore
            ...authenticate, 
            authenticateToken: response.accessToken
          })
    
          // @ts-ignore
          setAuthorize({
            // @ts-ignore
            ...authorize, 
            authorizeToken: json.authorization_token, 
            backendUserId: json.backendUserId,
            email: json.email
          })
    
          // @ts-ignore
          setUser({
            // @ts-ignore
            ...user,
            firstName: json.first_name,
            lastName: json.last_name,
            email: json.email
          })
  
          console.log('about to push my games')
          history.push(`/my-games`)
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
        <StyledInput onChange={(e) => setPassword(e.target.value)} />
      </Inputs>
      <Button 
        variant="contained" 
        onClick={() => handleOnSubmit()}
      >
        LOG IN
      </Button>
    </StyledPage>
  )
}
