export type ItemType =
  | "Quiver"
  | "BELT_Leather"
  | "BELT_Rope"
  | "FEET_plate_armor_shoes"
  | "FEET_shoes_brown"
  | "HANDS_plate_armor_gloves"
  | "HEAD_chain_armor_helmet"
  | "HEAD_chain_armor_hood"
  | "HEAD_leather_armor_hat"
  | "HEAD_plate_armor_helmet"
  | "HEAD_robe_hood"
  | "LEGS_pants_greenish"
  | "LEGS_plate_armor_pants"
  | "LEGS_robe_skirt"
  | "TORSO_chain_armor_jacket_purple"
  | "TORSO_chain_armor_torso"
  | "TORSO_leather_armor_bracers"
  | "TORSO_leather_armor_shirt_white"
  | "TORSO_leather_armor_shoulders"
  | "TORSO_leather_armor_torso"
  | "TORSO_plate_armor_arms_shoulders"
  | "TORSO_plate_armor_torso"
  | "TORSO_robe_shirt_brown"
  | "WEAPON_shield_cutout_body"

export type ItemSlot =
  | "Quiver"
  | "Weapon"
  | "Belt"
  | "Feet"
  | "Hands"
  | "Head"
  | "Legs"
  | "Torso"

export interface ItemModel {
  name: string
  type: ItemType
}

export const AllItems: { [K in ItemSlot]: ItemModel[] } = {
  Quiver: [{ name: "Quiver", type: "Quiver" }],
  Weapon: [{ name: "Shield", type: "WEAPON_shield_cutout_body" }],
  Belt: [
    { name: "Leather Belt", type: "BELT_Leather" },
    { name: "Rope Belt", type: "BELT_Rope" },
  ],
  Feet: [
    { name: "Plate Stabbotons", type: "FEET_plate_armor_shoes" },
    { name: "Brown Shoes", type: "FEET_shoes_brown" },
  ],
  Hands: [{ name: "Plate Armor Gloves", type: "HANDS_plate_armor_gloves" }],
  Head: [
    { name: "Chain Helmet", type: "HEAD_chain_armor_helmet" },
    { name: "Chain Hood", type: "HEAD_chain_armor_hood" },
    { name: "Leather Hat", type: "HEAD_leather_armor_hat" },
    { name: "Plate Helmet", type: "HEAD_plate_armor_helmet" },
    { name: "Robe Hood", type: "HEAD_robe_hood" },
  ],
  Legs: [
    { name: "Plate Pants", type: "LEGS_plate_armor_pants" },
    { name: "Robe", type: "LEGS_robe_skirt" },
  ],
  Torso: [
    { name: "Purple Chain Jacket", type: "TORSO_chain_armor_jacket_purple" },
    { name: "Chain Vest", type: "TORSO_chain_armor_torso" },
    { name: "Armor Bracers", type: "TORSO_leather_armor_bracers" },
    { name: "White Shirt", type: "TORSO_leather_armor_shirt_white" },
    { name: "Leather Shoulders", type: "TORSO_leather_armor_shoulders" },
    { name: "Leather Vest", type: "TORSO_leather_armor_torso" },
    { name: "Plate Shoulders", type: "TORSO_plate_armor_arms_shoulders" },
    { name: "Plate Vest", type: "TORSO_plate_armor_torso" },
    { name: "Robe", type: "TORSO_robe_shirt_brown" },
  ],
}
