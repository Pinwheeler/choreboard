import React from "react"
import { HeroEntity } from "../../../../core/models/Hero.model"
import baseSprite from "../../../assets/sprites/BODY_male.png"
import undergarments from "../../../assets/sprites/LEGS_pants_greenish.png"
import { Sprite } from "../../../Sprite"

interface Props {
  hero: HeroEntity
  style?: React.CSSProperties
}

export const Avatar: React.FC<Props> = (props) => {
  const { hero, style } = props

  return (
    <div style={style}>
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
    </div>
  )
}
