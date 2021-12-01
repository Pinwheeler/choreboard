import React from "react"
import { useParams } from "react-router-dom"
import { ViewOnlyGuildProvider } from "../../../core/contexts/ViewOnlyGuildContext"
import { LoadingSpinner } from "../../LoadingSpinner"
import { GuildPage } from "./GuildPage"

export const ViewOnlyGuildPage = () => {
  const { guildId } = useParams<{ guildId?: string }>()

  if (!guildId) {
    return <LoadingSpinner whatIsLoading="GuildID for ViewOnlyGuildPage" />
  }

  return (
    <ViewOnlyGuildProvider guildId={guildId}>
      <GuildPage viewOnly />
    </ViewOnlyGuildProvider>
  )
}
