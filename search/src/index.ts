import { RequestParams } from '@elastic/elasticsearch'
import { red } from 'colors'
import { serializeError } from 'serialize-error'

import { index, SearchClient } from './constants'
import { SearchResponse, Character, MatchQuery } from './interfaces'

const search = async () => {
  const searchParams: RequestParams.Search<MatchQuery<Character, 'house'>> = {
    index,
    body: {
      query: {
        match: {
          house: 'Targaryen',
        },
      },
    },
  }
  const result = await SearchClient.search<SearchResponse<Character>>(searchParams)
  const results = result.body.hits.hits.map(hit => hit._source)
  console.log(results)
}

// {
//   query: 'Targaryen',
//   fuzziness: 'AUTO',
// },
// isAlive: true,

const main = async () => {
  try {
    await search()
  } catch (error) {
    const serializedError = serializeError(error)
    console.error(red('Error searching:'), serializedError)
  }
}

main()
