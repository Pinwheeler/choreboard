import React from "react"
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom"
import { AuthGate } from "../../ui/AuthGate"
import { LoadingSpinner } from "../../ui/LoadingSpinner"
import { GuildPage } from "../../ui/pages/guild/GuildPage"
import { UpcertQuestPage } from "../../ui/pages/quest/UpcertQuestPage"
import { GuildProvider } from "../contexts/GuildContext"
import { QuestRouter } from "./QuestRouter"

export const GuildRouter = () => {
  let { path, url } = useRouteMatch()
  const { guildId } = useParams<{ guildId?: string }>()

  if (!guildId) {
    return <LoadingSpinner whatIsLoading="GuildID for GuildRouter" />
  }

  return (
    <AuthGate>
      <GuildProvider guildId={guildId}>
        <Switch>
          <Route path={`${path}/quests/new`}>
            <UpcertQuestPage />
          </Route>
          <Route path={`${path}/quests/:questId`}>
            <QuestRouter />
          </Route>
          <Route path={`${path}`}>
            <GuildPage />
          </Route>
        </Switch>
      </GuildProvider>
    </AuthGate>
  )
}
