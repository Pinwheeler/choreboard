import { Button, Grid, Stack, Typography, useTheme } from "@mui/material"
import { useContext } from "react"
import { GuildContext } from "../../../core/contexts/GuildContext"
import { QuestCard } from "../../cards/QuestCard"

export const GuildPage: React.FC = () => {
  const { guild, guildId } = useContext(GuildContext)

  const sortedQuests = guild.sortedQuests
  const theme = useTheme()

  return (
    <Grid container style={{ padding: 5 }}>
      <Grid item xs={12}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h3">{`${guild.name} Quest Log`}</Typography>
          <Button variant="contained" href={`/guilds/${guildId}/quests/new`}>
            Post New Quest!
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography style={{ marginTop: 10 }} variant="h4">
          Active Quests
        </Typography>
      </Grid>
      {sortedQuests.activeQuests.length > 0 ? (
        sortedQuests.activeQuests.map((quest) => (
          <Grid
            style={{ margin: 5 }}
            item
            sm={12}
            md={3}
            key={`quest_card_${quest.id}`}
          >
            <QuestCard quest={quest} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography>There are no active quests</Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography style={{ marginTop: 10 }} variant="h4">
          Completed Quests
        </Typography>
      </Grid>
      {sortedQuests.completedQuests.length > 0 ? (
        sortedQuests.completedQuests.map((quest) => (
          <Grid
            style={{ margin: 5 }}
            item
            sm={12}
            md={4}
            key={`quest_card_${quest.id}`}
          >
            <QuestCard quest={quest} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography>There are no recently completed quests</Typography>
        </Grid>
      )}
    </Grid>
  )
}
