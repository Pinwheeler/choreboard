import { Stack, Typography } from "@mui/material"
import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { GuildContext } from "../../core/contexts/GuildContext"
import baseSprite from "../../ui/assets/sprites/BODY_male.png"
import undergarments from "../../ui/assets/sprites/LEGS_pants_greenish.png"
import { LoadingSpinner } from "../LoadingSpinner"
import { Sprite } from "../Sprite"

export const HeroPage: React.FC = () => {
  const { heroId } = useParams<{ heroId?: string }>()
  const { heroMap } = useContext(GuildContext)

  if (!heroId) {
    return <LoadingSpinner whatIsLoading="Hero ID" />
  }

  const hero = heroMap[heroId]

  return (
    <>
      <div style={{ position: "relative", width: 64, height: 64 }}>
        <Sprite
          style={{ position: "absolute" }}
          spriteSheetAsset={baseSprite}
          spriteItemSize={{
            width: 64,
            height: 64,
          }}
          spriteSheetIndex={{
            x: 0,
            y: 3,
          }}
        />
        <Sprite
          style={{ position: "absolute" }}
          spriteSheetAsset={undergarments}
          spriteItemSize={{ width: 64, height: 64 }}
          spriteSheetIndex={{ x: 0, y: 3 }}
        />
      </div>
      <Stack>
        <Typography>{hero.name}</Typography>
      </Stack>
    </>
  )
}
