import React from "react"
import "./App.css"
import { ContextStack } from "./core/contexts/ContextStack"
import { Router } from "./core/routing/Router"
import { AppContainer } from "./ui/AppContainer"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const App: React.FC = () => {
  return (
    <>
      <ContextStack>
        <AppContainer>
          <Router />
        </AppContainer>
      </ContextStack>
    </>
  )
}
