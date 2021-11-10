import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material"
import React from "react"
import { GuildModel } from "../core/models/Guild.model"

interface Props {
  guild: GuildModel
}

export const GuildCard: React.FC<Props> = (props) => {
  const { guild } = props
  return (
    <Card>
      <CardContent style={{ minHeight: 200 }}>
        <Typography>{guild.name}</Typography>
      </CardContent>
      <CardActions>
        <Button href={`/guilds/${guild.uid}`}>Go</Button>
      </CardActions>
    </Card>
  )
}
