import { BrowserRouter, Route, Switch } from "react-router-dom"
import { HomePage } from "../../ui/pages/HomePage"
import { SplashPage } from "../../ui/pages/SplashPage"
import { GuildRouter } from "./GuildRouter"

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/guilds/:guildId">
        <GuildRouter />
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
