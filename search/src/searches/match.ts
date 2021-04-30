import { RequestParams } from '@elastic/elasticsearch'

import { characterIndex, SearchClient } from '../constants'
import { SearchResponse, Character, MatchQuery } from '../interfaces'

export const matchSearch = async () => {
  // This is specific to a match query. You can only have one key, and it must be inside the objects you are searching.
  const searchParams: RequestParams.Search<MatchQuery<Character, 'father'>> = {
    index: characterIndex,
    body: {
      query: {
        match: {
          father: {
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
