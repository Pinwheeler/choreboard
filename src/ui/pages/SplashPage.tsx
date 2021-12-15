import { Container, Typography } from "@mui/material"
import * as firebaseAuth from "firebase/auth"
import React, { useContext, useEffect, useMemo } from "react"
import { isEmbedded } from "react-device-detect"
import { useAuthState } from "react-firebase-hooks/auth"
import { Helmet } from "react-helmet"
import { Redirect } from "react-router"
import { FirebaseContext } from "../../core/contexts/FirebaseContext"

const firebaseUIContainerID = "firebaseui-auth-container"

export const SplashPage: React.FC = () => {
  const { loginUI } = useContext(FirebaseContext)
  const { auth } = useContext(FirebaseContext)
  const [user, loading, error] = useAuthState(auth)

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
    []
  )

  useEffect(() => {
    loginUI.start(`#${firebaseUIContainerID}`, uiConfig)
  }, [loginUI, uiConfig])

  if (isEmbedded) {
    return (
      <Container>
        <Typography variant="h1">QuestLog</Typography>
        <Typography>
          It appears that you're using an embedded browser. Google OAuth does
          not work with embedded browsers. Please switch to your system browser
          instead.
        </Typography>
      </Container>
    )
  }

  if (user) {
    return <Redirect to="/home" />
  }

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
