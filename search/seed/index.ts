import { Character } from '../src/interfaces'
import { SearchClient, characterIndex } from '../src/constants'
import { seedCharacters } from './pruneSeedData'

const indexNode = async (character: Character) => {
  await SearchClient.index<Record<string, any>, Character>({
    index: characterIndex,
    body: character,
  })
}

const seed = async () => {
  await SearchClient.indices.delete({
    index: characterIndex,
  })
  for (const character of seedCharacters) {
    await indexNode(character)
  }
  await SearchClient.indices.refresh({ index: characterIndex })
}

seed()
