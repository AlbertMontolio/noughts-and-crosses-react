import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  FunctionComponent
} from 'react'

export const authorizeInitialState = {
  authorizeToken: '',
  backendUserId: ''
}
const AuthorizeContext = createContext(authorizeInitialState)
// @ts-ignore
const SetAuthorizeContext = createContext()

// @ts-ignore
const localState = JSON.parse(localStorage.getItem('authorize'))

export const AuthorizeProvider: FunctionComponent = ({children}) => {
  const [authorize, setAuthorize] = useState(localState || authorizeInitialState)

  useEffect(() => {
    localStorage.setItem('authorize', JSON.stringify(authorize))
  }, [authorize])

  return (
    <AuthorizeContext.Provider value={authorize}>
      <SetAuthorizeContext.Provider value={setAuthorize}>
        { children }
      </SetAuthorizeContext.Provider>
    </AuthorizeContext.Provider>
  )
}

export const useAuthorize = () => {
  const authorize = useContext(AuthorizeContext)
  const setAuthorize = useContext(SetAuthorizeContext)

  return {
    authorize,
    setAuthorize
  }
}
