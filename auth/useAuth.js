import { useContext } from 'react'
import AuthContext from './authContext'
import storage from './storage'

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext)

  const logOut = () => {
    setUser(null)
    storage.removeToken()
  }

  const login = (authToken) => {
    storage.storeToken(authToken)
  }

  return { user, logOut, login }
}
