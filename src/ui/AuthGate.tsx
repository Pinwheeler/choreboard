import { User } from "@firebase/auth"
import { CircularProgress } from "@mui/material"
import React, { useContext } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { FirebaseContext } from "../core/contexts/FirebaseContext"

interface IAuthContext {
  user: User
}

export const AuthContext = React.createContext({} as IAuthContext)

export const AuthGate: React.FC = (props) => {
  const { auth } = useContext(FirebaseContext)
  const [user, loading, error] = useAuthState(auth)

  if (!user) {
    if (loading) {
      return <CircularProgress />
    } else {
      window.location.replace("/")
      return <></>
    }
  }

  const value = { user }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}
