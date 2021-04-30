import { RequestParams } from '@elastic/elasticsearch'

import { index, SearchClient } from '../constants'
import { SearchResponse, Character, TermQuery } from '../interfaces'

export const termSearch = async () => {
  const searchParams: RequestParams.Search<TermQuery<Character, 'name'>> = {
    index,
    body: {
      query: {
        term: {
          name: {
            value: 'Arya Stark',
          },
        },
      },
    },
  }
  const result = await SearchClient.search<SearchResponse<Character>>(searchParams)
  const results = result.body.hits.hits.map(hit => hit._source)
  console.log(results)
}
