import React from "react"
import { Route, Switch, useRouteMatch } from "react-router"
import { AuthGate } from "../../ui/AuthGate"
import { GuildPage } from "../../ui/pages/guild/GuildPage"
import { HeroPage } from "../../ui/pages/hero/HeroPage"
import { UpcertQuestPage } from "../../ui/pages/quest/UpcertQuestPage"
import { SignedInProvider } from "../contexts/SignedInContext"
import { QuestRouter } from "./QuestRouter"

export const SignedInRouter = () => {
  let { path } = useRouteMatch()

  return (
    <AuthGate>
      <SignedInProvider>
        <Switch>
          <Route path={`${path}/quests/new`}>
            <UpcertQuestPage />
          </Route>
          <Route path={`${path}/quests/:questId`}>
            <QuestRouter />
          </Route>
          <Route path={`${path}/heroes/:heroId`}>
            <HeroPage />
          </Route>
          <Route path={`${path}`}>
            <GuildPage />
          </Route>
        </Switch>
      </SignedInProvider>
    </AuthGate>
  )
}
