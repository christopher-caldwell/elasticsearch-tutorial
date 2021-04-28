import { Character } from '../src/interfaces'
import { SearchClient, index } from '../src/constants'

const characters: Character[] = [
  {
    name: 'John Snow',
    house: ['Targaryen', 'Snow'],
    isAlive: true,
  },
  {
    name: 'Arya Stark',
    house: 'Stark',
    isAlive: true,
  },
  {
    name: 'Bran Stark',
    house: 'Stark',
    isAlive: true,
  },
  {
    name: 'Sansa Stark',
    house: 'Stark',
    isAlive: true,
  },
  {
    name: 'Eddard "Ned" Stark',
    house: 'Stark',
    isAlive: false,
  },
  {
    name: 'Catelyn Stark',
    house: 'Stark',
    isAlive: false,
  },
  {
    name: 'Robb Stark',
    house: 'Stark',
    isAlive: false,
  },
  {
    name: 'Robert Baratheon',
    house: 'Baratheon',
    isAlive: false,
  },
  {
    name: 'Joffrey Baratheon',
    house: 'Baratheon',
    isAlive: false,
  },
  {
    name: 'Stannis Baratheon',
    house: 'Baratheon',
    isAlive: false,
  },
  {
    name: 'Jaime Lannister',
    house: 'Lannister',
    isAlive: false,
  },
  {
    name: 'Tyrion Lannister',
    house: 'Lannister',
    isAlive: true,
  },
  {
    name: 'Cersei Lannister',
    house: 'Lannister',
    isAlive: false,
  },
  {
    name: 'Tywin Lannister',
    house: 'Lannister',
    isAlive: false,
  },
  {
    name: 'Daenerys Targaryen',
    house: 'Targaryen',
    isAlive: false,
  },
  {
    name: 'Viserys Targaryen',
    house: 'Targaryen',
    isAlive: false,
  },
  {
    name: 'Jeor Mormont',
    house: 'Mormont',
    isAlive: false,
  },
  {
    name: 'Lyanna Mormont',
    house: 'Mormont',
    isAlive: false,
  },
  {
    name: 'Theon Greyjoy',
    house: 'Greyjoy',
    isAlive: false,
  },
  {
    name: 'Sandor "The Hound" Clegane',
    house: 'Clegane',
    isAlive: false,
  },
  {
    name: 'Petyr "Littlefinger" Baelish',
    house: 'Baelish',
    isAlive: false,
  },
  {
    name: 'Davos Seaworth',
    house: 'Seaworth',
    isAlive: true,
  },
  {
    name: 'Samwell Tarly',
    house: 'Tarly',
    isAlive: true,
  },
  {
    name: 'Houten	Melisandre',
    house: 'No House',
    isAlive: false,
  },
  {
    name: 'Varys',
    house: 'No House',
    isAlive: true,
  },
  {
    name: 'Shae',
    house: 'No House',
    isAlive: false,
  },
  {
    name: 'Margaery Tyrell',
    house: 'Tyrell',
    isAlive: false,
  },
  {
    name: 'Loras Tyrell',
    house: 'Tyrell',
    isAlive: false,
  },
  {
    name: 'Ygritte',
    house: 'No House',
    isAlive: true,
  },
  {
    name: 'Tormund Giantsbane',
    house: 'Giantsbane',
    isAlive: true,
  },
]

const indexNode = async (character: Character) => {
  await SearchClient.index<Record<string, any>, Character>({
    index,
    body: character,
  })
}

const seed = async () => {
  const indexPromises = characters.map(character => indexNode(character))
  await Promise.all(indexPromises)
  await SearchClient.indices.refresh({ index })
}

seed()

// Brienne of Tarth		Recurring	Main
// Ramsay Bolton		Recurring	Main
// Gilly		Recurring	Main
// Daario Naharis		Recurring[f]	Main
// Missandei		Recurring	Main
// Chapman	Tommen Baratheon	Recurring[g]		Recurring	Main
// Ellaria Sand		Recurring	Main
// Jaqen H'ghar	Body double	Recurring		Main
// Roose Bolton		Recurring	Guest	Main
// The High Sparrow		Recurring	Main
// Grey Worm
