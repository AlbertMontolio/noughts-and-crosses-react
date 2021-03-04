import React, {
  useState, 
  createContext,
  useContext,
  useEffect,
  FunctionComponent
} from 'react'

// @ts-ignore
const UserContext = createContext()
// @ts-ignore
const SetUserContext = createContext()

const initialState = {
  email: '',
  firstName: '',
  lastName: ''
}

// @ts-ignore
const localState = JSON.parse(localStorage.getItem('user'))

export const UserProvider: FunctionComponent = ({children}) => {
  const [user, setUser] = useState(localState || initialState)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <SetUserContext.Provider value={setUser}>
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    </SetUserContext.Provider>
  )
}

export const useUser = () => {
  const user = useContext(UserContext)
  const setUser = useContext(SetUserContext)

  return {
    user,
    setUser
  }
}
