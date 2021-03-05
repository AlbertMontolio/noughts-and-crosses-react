import React, { 
  useState, 
  useEffect, 
  createContext, 
  useContext,
  FunctionComponent
} from 'react'

import { urls } from '../../config'
import { useAuthorize } from '../../providers/authorize-provider/AuthorizeProvider'

const MyGamesContext = createContext<any>([])

const MyGamesInitState = {
  createdGames: [],
  joinedGames: [],
  restGames: []
}

export const MyGamesProvider: FunctionComponent = ({
  children
}) => {
  const { authorize: { backendUserId, authorizeToken } } = useAuthorize()
  console.log('### backendUserId', backendUserId)
  const [myGames, setMyGames] = useState(MyGamesInitState)
  console.log('myGames', myGames)
  const fetchData = async () => {
    const url = `${urls.productionApi}/users/${backendUserId}/games`

    try {
      const response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-type': 'application/json',
          'Authorization': authorizeToken
        }
      })
      const responseData = await response.json()
      console.log('### MyGamesProvider responseData', responseData)
      setMyGames(responseData)
    } catch (error) {
      console.log('error', error)
    }
  }

  


  useEffect(() => {
    fetchData()
  }, [])

  return (
    <MyGamesContext.Provider value={myGames}>
      {children}
    </MyGamesContext.Provider>
  )
}

export const useMyGames = () => {
  const myGames = useContext(MyGamesContext)

  return { myGames }
}
