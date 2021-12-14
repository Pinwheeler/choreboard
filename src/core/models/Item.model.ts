export type ItemSpriteName =
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
  sprites: ItemSpriteName[]
  price: number
}

export const AllItems: { [K in ItemSlot]: ItemModel[] } = {
  Quiver: [{ name: "Quiver", sprites: ["Quiver"], price: 7 }],
  Weapon: [
    { name: "Shield", sprites: ["WEAPON_shield_cutout_body"], price: 12 },
  ],
  Belt: [
    { name: "Leather Belt", sprites: ["BELT_Leather"], price: 10 },
    { name: "Rope Belt", sprites: ["BELT_Rope"], price: 5 },
  ],
  Feet: [
    {
      name: "Plate Stabbotons",
      sprites: ["FEET_plate_armor_shoes"],
      price: 10,
    },
    { name: "Brown Shoes", sprites: ["FEET_shoes_brown"], price: 3 },
  ],
  Hands: [
    {
      name: "Plate Armor Gloves",
      sprites: ["HANDS_plate_armor_gloves"],
      price: 10,
    },
  ],
  Head: [
    { name: "Chain Helmet", sprites: ["HEAD_chain_armor_helmet"], price: 10 },
    { name: "Chain Hood", sprites: ["HEAD_chain_armor_hood"], price: 10 },
    { name: "Leather Hat", sprites: ["HEAD_leather_armor_hat"], price: 12 },
    { name: "Plate Helmet", sprites: ["HEAD_plate_armor_helmet"], price: 20 },
    { name: "Robe Hood", sprites: ["HEAD_robe_hood"], price: 7 },
  ],
  Legs: [
    { name: "Plate Pants", sprites: ["LEGS_plate_armor_pants"], price: 20 },
  ],
  Torso: [
    {
      name: "Purple Chain Jacket",
      sprites: ["TORSO_chain_armor_jacket_purple"],
      price: 30,
    },
    { name: "Chain Vest", sprites: ["TORSO_chain_armor_torso"], price: 22 },
    { name: "Leather Vest", sprites: ["TORSO_leather_armor_torso"], price: 10 },
    {
      name: "Leather Armor",
      sprites: [
        "TORSO_leather_armor_torso",
        "TORSO_leather_armor_shoulders",
        "TORSO_leather_armor_bracers",
      ],
      price: 18,
    },
    {
      name: "White Shirt",
      sprites: ["TORSO_leather_armor_shirt_white"],
      price: 7,
    },
    { name: "Plate Vest", sprites: ["TORSO_plate_armor_torso"], price: 16 },
    {
      name: "Plate Armor",
      sprites: ["TORSO_plate_armor_torso", "TORSO_plate_armor_arms_shoulders"],
      price: 50,
    },
    {
      name: "Robe",
      sprites: ["TORSO_robe_shirt_brown", "LEGS_robe_skirt"],
      price: 10,
    },
  ],
}
