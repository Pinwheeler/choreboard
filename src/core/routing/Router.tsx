import { BrowserRouter, Route, Switch } from "react-router-dom"
import { GuildPage } from "../../ui/pages/guild/GuildPage"
import { HomePage } from "../../ui/pages/HomePage"
import { SplashPage } from "../../ui/pages/SplashPage"
import { GuildProvider } from "../contexts/GuildContext"
import { SignedInRouter } from "./SignedInRouter"

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/display/:guildId">
        <GuildProvider>
          <GuildPage viewOnly />
        </GuildProvider>
      </Route>
      <Route path="/guilds/:guildId">
        <GuildProvider>
          <SignedInRouter />
        </GuildProvider>
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
