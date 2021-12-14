import React, { useMemo } from "react"
import { ItemModel, ItemSpriteName } from "../core/models/Item.model"
import BEHIND_quiver from "../ui/assets/sprites/BEHIND_quiver.png"
import BELT_Leather from "../ui/assets/sprites/BELT_leather.png"
import BELT_Rope from "../ui/assets/sprites/BELT_rope.png"
import FEET_plate_armor_shoes from "../ui/assets/sprites/FEET_plate_armor_shoes.png"
import FEET_shoes_brown from "../ui/assets/sprites/FEET_shoes_brown.png"
import HANDS_plate_armor_gloves from "../ui/assets/sprites/HANDS_plate_armor_gloves.png"
import HEAD_chain_armor_helmet from "../ui/assets/sprites/HEAD_chain_armor_helmet.png"
import HEAD_chain_armor_hood from "../ui/assets/sprites/HEAD_chain_armor_hood.png"
import HEAD_leather_armor_hat from "../ui/assets/sprites/HEAD_leather_armor_hat.png"
import HEAD_plate_armor_helmet from "../ui/assets/sprites/HEAD_plate_armor_helmet.png"
import HEAD_robe_hood from "../ui/assets/sprites/HEAD_robe_hood.png"
import LEGS_plate_armor_pants from "../ui/assets/sprites/LEGS_plate_armor_pants.png"
import LEGS_robe_skirt from "../ui/assets/sprites/LEGS_robe_skirt.png"
import TORSO_chain_armor_jacket_purple from "../ui/assets/sprites/TORSO_chain_armor_jacket_purple.png"
import TORSO_chain_armor_torso from "../ui/assets/sprites/TORSO_chain_armor_torso.png"
import TORSO_leather_armor_bracers from "../ui/assets/sprites/TORSO_leather_armor_bracers.png"
import TORSO_leather_armor_shirt_white from "../ui/assets/sprites/TORSO_leather_armor_shirt_white.png"
import TORSO_leather_armor_shoulders from "../ui/assets/sprites/TORSO_leather_armor_shoulders.png"
import TORSO_leather_armor_torso from "../ui/assets/sprites/TORSO_leather_armor_torso.png"
import TORSO_plate_armor_arms_shoulders from "../ui/assets/sprites/TORSO_plate_armor_arms_shoulders.png"
import TORSO_plate_armor_torso from "../ui/assets/sprites/TORSO_plate_armor_torso.png"
import TORSO_robe_shirt_brown from "../ui/assets/sprites/TORSO_robe_shirt_brown.png"
import WEAPON_shield_cutout_body from "../ui/assets/sprites/WEAPON_shield_cutout_body.png"
import { Sprite } from "./Sprite"

const ItemComponentSprite: React.FC<InnerProps> = (props) => {
  const { sprite } = props

  const asset = useMemo(() => {
    switch (sprite) {
      case "Quiver":
        return BEHIND_quiver
      case "BELT_Leather":
        return BELT_Leather
      case "BELT_Rope":
        return BELT_Rope
      case "FEET_plate_armor_shoes":
        return FEET_plate_armor_shoes
      case "FEET_shoes_brown":
        return FEET_shoes_brown
      case "HANDS_plate_armor_gloves":
        return HANDS_plate_armor_gloves
      case "HEAD_chain_armor_helmet":
        return HEAD_chain_armor_helmet
      case "HEAD_chain_armor_hood":
        return HEAD_chain_armor_hood
      case "HEAD_leather_armor_hat":
        return HEAD_leather_armor_hat
      case "HEAD_plate_armor_helmet":
        return HEAD_plate_armor_helmet
      case "HEAD_robe_hood":
        return HEAD_robe_hood
      case "LEGS_plate_armor_pants":
        return LEGS_plate_armor_pants
      case "LEGS_robe_skirt":
        return LEGS_robe_skirt
      case "TORSO_chain_armor_jacket_purple":
        return TORSO_chain_armor_jacket_purple
      case "TORSO_chain_armor_torso":
        return TORSO_chain_armor_torso
      case "TORSO_leather_armor_bracers":
        return TORSO_leather_armor_bracers
      case "TORSO_leather_armor_shirt_white":
        return TORSO_leather_armor_shirt_white
      case "TORSO_leather_armor_shoulders":
        return TORSO_leather_armor_shoulders
      case "TORSO_leather_armor_torso":
        return TORSO_leather_armor_torso
      case "TORSO_plate_armor_arms_shoulders":
        return TORSO_plate_armor_arms_shoulders
      case "TORSO_plate_armor_torso":
        return TORSO_plate_armor_torso
      case "TORSO_robe_shirt_brown":
        return TORSO_robe_shirt_brown
      case "WEAPON_shield_cutout_body":
        return WEAPON_shield_cutout_body
      default:
        throw new Error(`Could not find asset for ${sprite}`)
    }
  }, [sprite])

  return (
    <Sprite
      style={{ position: "absolute" }}
      spriteSheetAsset={asset}
      spriteItemSize={{ width: 64, height: 64 }}
      spriteSheetIndex={{ x: 0, y: 3 }}
    />
  )
}

interface Props {
  item: ItemModel
}

export const ItemSprite: React.FC<Props> = (props) => {
  const { item } = props

  return (
    <div style={{ position: "relative", width: 64, height: 64 }}>
      {item.sprites.map((sprite) => (
        <ItemComponentSprite sprite={sprite} />
      ))}
    </div>
  )
}

interface InnerProps {
  sprite: ItemSpriteName
}
