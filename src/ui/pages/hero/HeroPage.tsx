import { Grid, Typography } from "@mui/material"
import { Formik } from "formik"
import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { GuildContext } from "../../../core/contexts/GuildContext"
import { UpdateHero } from "../../../core/forms/Hero.form"
import { blankEquip } from "../../../core/models/Hero.model"
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

  const formSubmit = (value: UpdateHero) => {}

  const initialValues: UpdateHero = {
    title: hero.title ?? null,
    heroName: hero.heroName ?? null,
    initials: hero.initials,
    id: hero.uid,
    coin: hero.coin,
    inventory: hero.inventory ?? [],
    equipped: hero.equipped ?? blankEquip(),
  }

  return (
    <Formik onSubmit={formSubmit} initialValues={initialValues}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h2">Hero Profile</Typography>
        </Grid>
        <Grid item xs={3}>
          <Avatar hero={hero} />
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={12}>
          <Store />
        </Grid>
      </Grid>
    </Formik>
  )
}
