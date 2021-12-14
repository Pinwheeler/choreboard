import { AddCircle } from "@mui/icons-material"
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material"
import { useContext } from "react"
import { Helmet } from "react-helmet"
import { GuildContext } from "../../../core/contexts/GuildContext"
import { ViewOnlyGuildContext } from "../../../core/contexts/ViewOnlyGuildContext"
import { GuildEntity } from "../../../core/models/Guild.model"
import coinIcon from "../../assets/coin.png"
import { QuestCard } from "../../cards/QuestCard"

interface Props {
  viewOnly?: boolean
}

export const GuildPage: React.FC<Props> = (props) => {
  const { viewOnly } = props
  const { guild, guildId } = useContext(GuildContext)
  const { guild: viewOnlyGuild, guildId: viewOnlyGuildId } =
    useContext(ViewOnlyGuildContext)

  if (viewOnly) {
    return (
      <InnerComponent
        guild={viewOnlyGuild}
        viewOnly
        guildId={viewOnlyGuildId}
      />
    )
  } else {
    return <InnerComponent guild={guild} guildId={guildId} />
  }
}

interface InnerProps {
  guild: GuildEntity
  guildId: string
  viewOnly?: boolean
}

const InnerComponent: React.FC<InnerProps> = (props) => {
  const { guild, guildId, viewOnly } = props
  const { signedInHero } = useContext(GuildContext)

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
          <Grid item xs={11}>
            <Button href={`/guilds/${guildId}/heroes/${signedInHero.uid}`}>
              <Typography variant="subtitle1">{signedInHero.coin}</Typography>
              <img
                src={coinIcon}
                alt="coin icon"
                style={{ width: 22, height: 22 }}
              />
              <div style={{ width: 8 }} />
              <Typography variant="subtitle1">{signedInHero.name}</Typography>
            </Button>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              color="secondary"
              href={`/guilds/${guildId}/quests/new`}
            >
              <AddCircle />
            </IconButton>
          </Grid>
        </Grid>
      )}
      <Grid container style={{ padding: 5 }}>
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
