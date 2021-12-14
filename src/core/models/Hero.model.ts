import { User } from "@firebase/auth"
import { ItemModel } from "./Item.model"

export type HeroModelMap = { [key: string]: HeroModel }

export type HeroMap = { [key: string]: HeroEntity }

export interface HeroModel {
  title?: string
  heroName?: string
  initials: string
  name: string
  uid: string
  coin: number
  inventory: ItemModel[]
  equipped: EquippedItems
}

export interface EquippedItems {
  head?: ItemModel
  torso?: ItemModel
  hands?: ItemModel
  legs?: ItemModel
  quiver?: ItemModel
  weapon?: ItemModel
  shield?: ItemModel
}

const blankEquip = () => ({
  head: undefined,
  torso: undefined,
  hands: undefined,
  legs: undefined,
  quiver: undefined,
  weapon: undefined,
  shield: undefined,
})

export class HeroEntity {
  title?: string
  heroName?: string
  initials: string
  name: string
  uid: string
  coin: number
  inventory: ItemModel[]
  equipped: EquippedItems

  toModel(): HeroModel {
    return {
      title: this.title,
      heroName: this.heroName,
      initials: this.initials,
      name: this.name,
      uid: this.uid,
      coin: this.coin,
      inventory: this.inventory,
      equipped: this.equipped,
    }
  }

  constructor(model: HeroModel) {
    this.title = model.title
    this.heroName = model.heroName
    this.initials = model.initials
    this.name = model.name
    this.uid = model.uid
    this.coin = model.coin
    this.inventory = model.inventory ?? []
    this.equipped = model.equipped ?? blankEquip()
  }

  static fromUser(user: User) {
    const name = user.displayName ?? user.email ?? "Anon"
    const initials = name
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), "")
      .toUpperCase()
    return new HeroEntity({
      initials,
      name: user.displayName ?? user.email ?? "Anon",
      uid: user.uid,
      coin: 0,
      inventory: [],
      equipped: blankEquip(),
    })
  }
}
