import { Client } from '@elastic/elasticsearch'

export const characterIndex = 'game-of-thrones-characters'

export const SearchClient = new Client({ node: 'http://localhost:9200' })
