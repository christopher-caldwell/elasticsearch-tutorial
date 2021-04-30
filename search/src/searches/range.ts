import { RequestParams } from '@elastic/elasticsearch'

import { characterIndex, SearchClient } from '../constants'
import { SearchResponse, Character, Query, RangeQuery } from '../interfaces'

export const rangeSearch = async () => {
  const searchParams: RequestParams.Search<Query<RangeQuery<Character, 'seasons'>>> = {
    index: characterIndex,
    body: {
      query: {
        range: {
          seasons: {
            lt: 4,
            gt: 1,
          },
        },
      },
    },
  }
  const result = await SearchClient.search<SearchResponse<Character>>(searchParams)
  const results = result.body.hits.hits.map(hit => hit._source)
  console.log(results)
}
