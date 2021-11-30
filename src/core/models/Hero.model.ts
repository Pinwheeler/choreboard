import { User } from "@firebase/auth"

export type HeroModelMap = { [key: string]: HeroModel }

export type HeroMap = { [key: string]: HeroEntity }

export interface HeroModel {
  name: string
  uid: string
  coin: number
}

export class HeroEntity {
  name: string
  uid: string
  coin: number

  toModel(): HeroModel {
    return {
      name: this.name,
      uid: this.uid,
      coin: this.coin,
    }
  }

  constructor(model: HeroModel) {
    this.name = model.name
    this.uid = model.uid
    this.coin = model.coin
  }

  static fromUser(user: User) {
    return new HeroEntity({
      name: user.displayName ?? user.email ?? "Anon",
      uid: user.uid,
      coin: 0,
    })
  }
}
