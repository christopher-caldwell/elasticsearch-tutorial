export type House =
  | 'Baratheon'
  | 'Stark'
  | 'Mormont'
  | 'Targaryen'
  | 'Snow'
  | 'Greyjoy'
  | 'Clegane'
  | 'Baelish'
  | 'Seaworth'
  | 'Tarly'
  | 'No House'
  | 'Tyrell'
  | 'Giantsbane'
  | 'Bolton'
  | 'Lannister'

export interface Character {
  name: string
  house: House | House[]
  isAlive: boolean
}
