import React, {useContext} from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate } from 'react-router-dom'



export const privateRoute = ({children}) => {
    const {isLoggedIn} = useContext(AuthContext)
  return isLoggedIn ?(
    children
  ) : (
    <Navigate  to='/login' />
  )
}

export default privateRoute;