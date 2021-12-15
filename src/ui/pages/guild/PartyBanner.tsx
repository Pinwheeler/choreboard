import { Stack, Typography } from "@mui/material"
import React from "react"
import { HeroEntity } from "../../../core/models/Hero.model"
import { CoinIcon } from "../../CoinIcon"

interface Props {
  heroes: HeroEntity[]
}

export const PartyBanner: React.FC<Props> = (props) => {
  const { heroes } = props
  console.log(heroes)

  return (
    <Stack direction="row" justifyContent="space-evenly">
      {heroes.map((entity) => {
        return (
          <div key={`party-banner-hero-${entity.uid}`}>
            <Stack alignItems="center">
              <Stack direction="row" spacing={0.5}>
                <Typography>{entity.coin}</Typography>
                <CoinIcon />
              </Stack>
              <Typography>{entity.heroName ?? entity.name}</Typography>
            </Stack>
          </div>
        )
      })}
    </Stack>
  )
}
