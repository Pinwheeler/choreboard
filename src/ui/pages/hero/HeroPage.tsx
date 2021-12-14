import { Grid, Typography } from "@mui/material"
import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { GuildContext } from "../../../core/contexts/GuildContext"
import { LoadingSpinner } from "../../LoadingSpinner"
import { Avatar } from "./components/Avatar"
import { Store } from "./components/Store"

export const HeroPage: React.FC = () => {
  const { heroId } = useParams<{ heroId?: string }>()
  const { heroMap } = useContext(GuildContext)

  if (!heroId) {
    return <LoadingSpinner whatIsLoading="Hero ID" />
  }

  const hero = heroMap[heroId]

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h2">{hero.name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Avatar hero={hero} />
        </Grid>
        <Grid item xs={12}>
          <Store />
        </Grid>
      </Grid>
    </>
  )
}
