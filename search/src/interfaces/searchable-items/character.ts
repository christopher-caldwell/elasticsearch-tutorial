export interface Character {
  titles: string[]
  origins: string[]
  siblings: string[]
  spouses: string[]
  lovers: string[]
  cultures: string[]
  religions: string[]
  allegiances: string[]
  seasons: string[]
  appearances: string[]
  name: string
  image: string
  gender: string
  isAlive: boolean
  deathYear: number
  father: string
  house: string
  firstSeen: string
  actor: string
  related: {
    name: string
    mentions: number
  }[]
  age?: number
}
