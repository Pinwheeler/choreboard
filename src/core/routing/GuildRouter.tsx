import React from "react"
import {
  BrowserRouter,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom"
import { AuthGate } from "../../ui/AuthGate"
import { LoadingSpinner } from "../../ui/LoadingSpinner"
import { GuildPage } from "../../ui/pages/guild/GuildPage"
import { NewQuestPage } from "../../ui/pages/quest/NewQuestPage"
import { GuildProvider } from "../contexts/GuildContext"

export const GuildRouter = () => {
  let { path, url } = useRouteMatch()
  const { guildId } = useParams<{ guildId?: string }>()

  if (!guildId) {
    return <LoadingSpinner whatIsLoading="GuildID for GuildRouter" />
  }

  return (
    <AuthGate>
      <GuildProvider guildId={guildId}>
        <BrowserRouter>
          <Switch>
            <Route path={`${path}/quests/new`}>
              <AuthGate>
                <NewQuestPage />
              </AuthGate>
            </Route>
            <Route path={`${path}`}>
              <GuildPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </GuildProvider>
    </AuthGate>
  )
}
