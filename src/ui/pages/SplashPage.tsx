import { Container, Typography } from "@mui/material"
import * as firebaseAuth from "firebase/auth"
import React, { useCallback, useContext, useEffect, useMemo } from "react"
import { Helmet } from "react-helmet"
import { FirebaseContext } from "../../core/contexts/FirebaseContext"

const firebaseUIContainerID = "firebaseui-auth-container"

export const SplashPage: React.FC = () => {
  const { loginUI } = useContext(FirebaseContext)

  const signInSuccess = useCallback((result: any) => {
    return false
  }, [])

  // Configure FirebaseUI.
  const uiConfig: firebaseui.auth.Config = useMemo(
    () => ({
      // Popup signin flow rather than redirect flow.
      signInFlow: "popup",
      signInSuccessUrl: "/home",
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebaseAuth.GoogleAuthProvider.PROVIDER_ID,
        firebaseAuth.EmailAuthProvider.PROVIDER_ID,
      ],
    }),
    [signInSuccess]
  )

  useEffect(() => {
    loginUI.start(`#${firebaseUIContainerID}`, uiConfig)
  }, [loginUI, uiConfig])

  return (
    <>
      <Helmet>
        <link
          type="text/css"
          rel="stylesheet"
          href="https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.css"
        />
      </Helmet>
      <Container>
        <Typography variant="h1">QuestLog</Typography>
      </Container>
      <div id={firebaseUIContainerID} />
    </>
  )
}
