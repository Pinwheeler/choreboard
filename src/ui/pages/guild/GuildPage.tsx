import { Button, Grid, Stack, Typography } from "@mui/material"
import { useContext } from "react"
import { GuildContext } from "../../../core/contexts/GuildContext"
import { QuestCard } from "../../cards/QuestCard"

export const GuildPage: React.FC = () => {
  const { guild, guildId } = useContext(GuildContext)

  const sortedQuests = guild.sortedQuests

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Typography variant="h3">{`${guild.name} Quest Log`}</Typography>
        <Button variant="contained" href={`/guilds/${guildId}/quests/new`}>
          Post New Quest!
        </Button>
      </Stack>
      <Typography variant="h4">Active Quests</Typography>
      {sortedQuests.activeQuests.length > 0 ? (
        <Grid container spacing={2}>
          {sortedQuests.activeQuests.map((quest) => (
            <Grid item key={`quest_card_${quest.id}`}>
              <QuestCard quest={quest} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>There are no active quests</Typography>
      )}
      <Typography variant="h4">Failed Quests</Typography>
      {sortedQuests.failedQuests.length > 0 ? (
        <Grid container spacing={2}>
          {sortedQuests.failedQuests.map((quest) => (
            <Grid item key={`quest_card_${quest.id}`}>
              <QuestCard quest={quest} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>There are no recently failed quests</Typography>
      )}
      <Typography variant="h4">Completed Quests</Typography>
      {sortedQuests.completedQuests.length > 0 ? (
        <Grid container spacing={2}>
          {sortedQuests.failedQuests.map((quest) => (
            <Grid item key={`quest_card_${quest.id}`}>
              <QuestCard quest={quest} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>There are no recently completed quests</Typography>
      )}
    </Stack>
  )
}
