import { AddCircle } from "@mui/icons-material"
import { Button, Grid, Stack, Typography, useTheme } from "@mui/material"
import { useContext } from "react"
import { Helmet } from "react-helmet"
import { GuildContext } from "../../../core/contexts/GuildContext"
import { SignedInContext } from "../../../core/contexts/SignedInContext"
import { QuestCard } from "../../cards/QuestCard"
import { CoinIcon } from "../../CoinIcon"
import { PartyBanner } from "./PartyBanner"

interface Props {
  viewOnly?: boolean
}

export const GuildPage: React.FC<Props> = (props) => {
  const { viewOnly } = props
  const { guild, guildId } = useContext(GuildContext)

  const { heroMap } = useContext(GuildContext)
  const { signedInHero } = useContext(SignedInContext)
  const heroes = Object.values(heroMap)

  const theme = useTheme()
  const sortedQuests = guild.sortedQuests

  return (
    <>
      <Helmet>
        <title>{`Quest Log - ${guild.name}`}</title>
      </Helmet>
      {!viewOnly && (
        <Grid
          container
          style={{ padding: 5, backgroundColor: theme.palette.primary.main }}
        >
          <Grid item xs={9}>
            <Button href={`/guilds/${guildId}/heroes/${signedInHero.uid}`}>
              <Typography variant="subtitle1">{signedInHero.coin}</Typography>
              <CoinIcon />
              <div style={{ width: 8 }} />
              <Typography variant="subtitle1">{signedInHero.name}</Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button color="secondary" href={`/guilds/${guildId}/quests/new`}>
              Post new quest
              <div style={{ width: 8 }} />
              <AddCircle />
            </Button>
          </Grid>
        </Grid>
      )}

      <Grid container style={{ padding: 5 }}>
        {viewOnly && (
          <Grid item xs={12}>
            <PartyBanner heroes={heroes} />
          </Grid>
        )}
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h3">{`${guild.name} Quest Log`}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{`questlog.today/guilds/${guild.name}`}</Typography>
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
              xs={12}
              md={5.85}
              lg={3.85}
              xl={2}
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
              xs={12}
              md={5.85}
              lg={3.85}
              xl={2}
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
    </>
  )
}
