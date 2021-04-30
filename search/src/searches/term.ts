import { RequestParams } from '@elastic/elasticsearch'

import { characterIndex, SearchClient } from '../constants'
import { SearchResponse, Character, Query, TermQuery } from '../interfaces'

export const termSearch = async () => {
  const searchParams: RequestParams.Search<Query<TermQuery<Character, 'isAlive'>>> = {
    index: characterIndex,
    body: {
      query: {
        term: {
          isAlive: false,
        },
      },
    },
  }
  const result = await SearchClient.search<SearchResponse<Character>>(searchParams)
  const results = result.body.hits.hits.map(hit => hit._source)
  console.log(results)
}
