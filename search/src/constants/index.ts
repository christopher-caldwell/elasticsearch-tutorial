import { Client } from '@elastic/elasticsearch'

export const index = 'game-of-thrones'

export const SearchClient = new Client({ node: 'http://localhost:9200' })
