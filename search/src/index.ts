import { RequestParams } from '@elastic/elasticsearch'
import { red } from 'colors'
import { serializeError } from 'serialize-error'

import { index, SearchClient } from './constants'
import { SearchResponse, Character, MatchQuery } from './interfaces'

const search = async () => {
  // This is specific to a match query. You can only have one key, and it must be inside the objects you are searching.
  const searchParams: RequestParams.Search<MatchQuery<Character, 'name'>> = {
    index,
    body: {
      query: {
        match: {
          name: {
            query: 'Star',
            fuzziness: 'AUTO',
          },
        },
      },
    },
  }
  const result = await SearchClient.search<SearchResponse<Character>>(searchParams)
  const results = result.body.hits.hits.map(hit => hit._source)
  console.log(results)
}

const main = async () => {
  try {
    await search()
  } catch (error) {
    const serializedError = serializeError(error)
    console.error(red('Error searching:'), serializedError)
  }
}

main()
