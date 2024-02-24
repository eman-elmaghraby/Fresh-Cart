import React, { useContext } from 'react'
import { authContext } from '../../contexts/AuthContext'

import { Navigate } from 'react-router-dom';

export default function AuthProtectedRoute({children}) {
    const {userIsLoggedIn, setUserIsLoggedIn} =useContext(authContext)
  return (
    <>
      {userIsLoggedIn ? <Navigate to={"/home"}/> : children}
    </>
  )
}
