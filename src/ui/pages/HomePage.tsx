import { Grid } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { ApiContext } from "../../core/contexts/ApiContext"
import { GuildModel } from "../../core/models/Guild.model"
import { GuildCard } from "../GuildCard"
import { LoadingSpinner } from "../LoadingSpinner"

export const HomePage: React.FC = () => {
  const { fetchGuilds } = useContext(ApiContext)
  const [guilds, setGuilds] = useState<GuildModel[]>()

  useEffect(() => {
    fetchGuilds().then((result) => {
      setGuilds(result)
    })
  })

  if (!guilds) {
    return <LoadingSpinner whatIsLoading="Guilds" />
  }

  return (
    <Grid container>
      {guilds.map((guild) => (
        <Grid key={`guild_card_${guild.name}`} item sm={12} md={3}>
          <GuildCard guild={guild} />
        </Grid>
      ))}
    </Grid>
  )
}
