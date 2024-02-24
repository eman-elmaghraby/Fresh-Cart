import React, { useContext } from 'react'
import { authContext } from '../../contexts/AuthContext';
import Login from '../Authentication/Login/Login';



export default function ProtectedRoute({children}) {
    const {userIsLoggedIn, setUserIsLoggedIn} = useContext(authContext)

  return (
    <>
      {userIsLoggedIn ? children : <Login/>}
    </>
  )
}
