import { Grid } from "@mui/material"
import React, { useContext } from "react"
import { ApiContext } from "../../core/contexts/ApiContext"
import { GuildCard } from "../cards/GuildCard"
import { LoadingSpinner } from "../LoadingSpinner"

export const HomePage: React.FC = () => {
  const { guilds } = useContext(ApiContext)

  if (!guilds) {
    return <LoadingSpinner whatIsLoading="Guilds" />
  }

  return (
    <Grid container>
      {Object.entries(guilds).map(([key, guild]) => (
        <Grid key={`guild_card_${key}`} item sm={12} md={3}>
          <GuildCard guild={guild} guildId={key} />
        </Grid>
      ))}
    </Grid>
  )
}
