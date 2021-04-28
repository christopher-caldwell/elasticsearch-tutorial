import { Client, RequestParams } from '@elastic/elasticsearch'
// import { SearchResponse } from '@elastic/elasticsearch/lib/pool/'

const SearchClient = new Client({ node: 'http://localhost:9200' })

const index = 'game-of-thrones'

const indexNode = async (character: Character) => {
  await SearchClient.index<Record<string, any>, Character>({
    index,
    body: character,
  })
}

const characters: Character[] = [
  {
    name: 'John Snow',
    house: 'Targaryen',
    isAlive: true,
  },
  {
    name: 'Arya Stark',
    house: 'Stark',
    isAlive: true,
  },
  {
    name: 'Sansa Stark',
    house: 'Stark',
    isAlive: true,
  },
  {
    name: 'Ned Stark',
    house: 'Stark',
    isAlive: false,
  },
]

const seed = async () => {
  const indexPromises = characters.map(character => indexNode(character))
  await Promise.all(indexPromises)
  // await SearchClient.indices.refresh({ index })
}

const search = async () => {
  const searchParams: RequestParams.Search<SearchResult> = {
    index,
    body: {
      query: {
        match: {
          isAlive: true,
        },
      },
    },
  }
  const result = await SearchClient.search<SearchResponse<Character>>(searchParams)
  const results = result.body.hits.hits.map(hit => hit._source)
  console.log(results)
}

const main = async () => {
  await seed()
  await search()
}

main()

interface Character {
  name: string
  house: string
  isAlive: boolean
}

interface SearchResult {
  query: {
    match: Partial<Character>
  }
}
// Define the type of the body for the Search request
interface SearchBody {
  query: {
    match: { foo: string }
  }
}

// Complete definition of the Search response
interface ShardsResponse {
  total: number
  successful: number
  failed: number
  skipped: number
}

interface Explanation {
  value: number
  description: string
  details: Explanation[]
}

interface SearchResponse<T> {
  took: number
  timed_out: boolean
  _scroll_id?: string
  _shards: ShardsResponse
  hits: {
    total: number
    max_score: number
    hits: Array<{
      _index: string
      _type: string
      _id: string
      _score: number
      _source: T
      _version?: number
      _explanation?: Explanation
      fields?: any
      highlight?: any
      inner_hits?: any
      matched_queries?: string[]
      sort?: string[]
    }>
  }
  aggregations?: any
}

// Define the interface of the source object
interface Source {
  foo: string
}
