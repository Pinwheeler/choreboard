import { Button, Grid, Stack, Typography } from "@mui/material"
import { useContext } from "react"
import { GuildContext } from "../../../core/contexts/GuildContext"
import { QuestCard } from "../../cards/QuestCard"

export const GuildPage: React.FC = () => {
  const { guild, guildId } = useContext(GuildContext)

  console.log("guild", guild)

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Typography variant="h3">{`${guild.name} Quest Log`}</Typography>
        <Button variant="contained" href={`/guilds/${guildId}/quests/new`}>
          Post New Quest!
        </Button>
      </Stack>
      <Grid container>
        {guild.quests.map((quest) => (
          <Grid item key={`quest_card_${quest.name}`}>
            <QuestCard quest={quest} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}
