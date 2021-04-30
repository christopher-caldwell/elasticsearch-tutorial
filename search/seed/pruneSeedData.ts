import { Character } from '../src/interfaces'
// Credit: https://api.got.show/doc/#api-CharacterShow-GetAllCharacterShow
import characters from './characters.json'

export const seedCharacters: Character[] = ((characters as unknown) as SeedCharacter[]).map(character => {
  return {
    titles: character.titles,
    origins: character.origin,
    siblings: character.siblings,
    spouses: character.spouse,
    lovers: character.lovers,
    cultures: character.culture,
    religions: character.religion,
    allegiances: character.allegiances,
    seasons: character.seasons,
    appearances: character.appearances,
    name: character.name,
    image: character.image,
    gender: character.gender,
    isAlive: character.alive,
    deathYear: character.death,
    father: character.father,
    house: character.house,
    firstSeen: character.first_seen,
    actor: character.actor,
    related: character.related,
    age: character.age?.age,
  }
})

interface SeedCharacter {
  titles: string[]
  origin: string[]
  siblings: string[]
  spouse: string[]
  lovers: string[]
  plod: number
  longevity: string[]
  plodB: number
  plodC: number
  longevityB: string[]
  longevityC: string[]
  culture: string[]
  religion: string[]
  allegiances: string[]
  seasons: string[]
  appearances: string[]
  name: string
  image: string
  gender: string
  alive: boolean
  death: number
  father: string
  house: string
  first_seen: string
  actor: string
  related: {
    name: string
    mentions: number
  }[]
  createdAt: string
  updatedAt: string
  __v: string
  pagerank: string
  age: {
    name: string
    age: number
  }
  id: string
}
