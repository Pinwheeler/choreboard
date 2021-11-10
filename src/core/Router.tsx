import { BrowserRouter, Route, Switch } from "react-router-dom"
import { AuthGate } from "../ui/AuthGate"
import { HomePage } from "../ui/pages/HomePage"
import { NewProjectPage } from "../ui/pages/project/NewProjectPage"
import { SplashPage } from "../ui/pages/SplashPage"

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/guilds/:guildId/projects/new">
        <AuthGate>
          <NewProjectPage />
        </AuthGate>
      </Route>
      <Route path="/home">
        <HomePage />
      </Route>
      <Route path="/">
        <SplashPage />
      </Route>
    </Switch>
  </BrowserRouter>
)
