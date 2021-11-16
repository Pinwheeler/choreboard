import React from "react"
import { Route, Switch, useParams, useRouteMatch } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { AuthGate } from "../../ui/AuthGate"
import { LoadingSpinner } from "../../ui/LoadingSpinner"
import { UpcertQuestPage } from "../../ui/pages/quest/UpcertQuestPage"
import { ViewQuestPage } from "../../ui/pages/quest/ViewQuestPage"
import { QuestContext, QuestProvider } from "../contexts/QuestContext"

export const QuestRouter = () => {
  let { path, url } = useRouteMatch()
  const { questId } = useParams<{ questId?: string }>()

  if (!questId) {
    return <LoadingSpinner whatIsLoading="QuestID for QuestRouter" />
  }

  return (
    <AuthGate>
      <QuestProvider questId={questId}>
        <QuestContext.Consumer>
          {({ quest }) => (
            <BrowserRouter>
              <Switch>
                <Route path={`${path}/update`}>
                  <UpcertQuestPage quest={quest} />
                </Route>
                <Route path={path}>
                  <ViewQuestPage />
                </Route>
              </Switch>
            </BrowserRouter>
          )}
        </QuestContext.Consumer>
      </QuestProvider>
    </AuthGate>
  )
}
