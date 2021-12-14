import { EquippedItems } from "../models/Hero.model"
import { ItemModel } from "../models/Item.model"

export interface UpdateHero {
  title: string | null
  heroName: string | null
  initials: string
  id: string
  coin: number
  inventory: ItemModel[]
  equipped: EquippedItems
}
