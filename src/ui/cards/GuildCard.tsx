import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material"
import React from "react"
import { GuildModel } from "../../core/models/Guild.model"

interface Props {
  guildId: string
  guild: GuildModel
}

export const GuildCard: React.FC<Props> = (props) => {
  const { guild, guildId } = props
  return (
    <Card>
      <CardContent style={{ minHeight: 200 }}>
        <Typography>{guild.name}</Typography>
      </CardContent>
      <CardActions>
        <Button href={`/guilds/${guildId}`}>Go</Button>
      </CardActions>
    </Card>
  )
}
