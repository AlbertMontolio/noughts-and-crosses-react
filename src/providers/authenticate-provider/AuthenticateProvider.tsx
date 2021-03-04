import React, {
  useState, 
  useEffect, 
  createContext,
  useContext,
  FunctionComponent
} from 'react'

// @ts-ignore
const AuthenticateContext = createContext()
// @ts-ignore
const SetAuthenticateContext = createContext()

export const initialState = {
  authenticateToken: null
}

// @ts-ignore
const localState = JSON.parse(localStorage.getItem('authenticate'))

export const AuthenticateProvider: FunctionComponent = ({children}) => {
  const [authenticate, setAuthenticate] = useState(localState || initialState)
  console.log('### authenticate', authenticate)

  useEffect(() => {
    localStorage.setItem('authenticate', JSON.stringify(authenticate))
  }, [authenticate])

  return (
    <AuthenticateContext.Provider value={authenticate}>
      <SetAuthenticateContext.Provider value={setAuthenticate}>
        {children}
      </SetAuthenticateContext.Provider>
    </AuthenticateContext.Provider>
  )
}

export const useAuthenticate = () => {
  const authenticate = useContext(AuthenticateContext)
  const setAuthenticate = useContext(SetAuthenticateContext)

  return {
    authenticate,
    setAuthenticate
  }
}
