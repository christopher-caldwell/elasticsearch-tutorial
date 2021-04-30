import { RequestParams } from '@elastic/elasticsearch'

import { characterIndex, SearchClient } from '../constants'
import { SearchResponse, Character, Query, BooleanQuery, MatchQuery } from '../interfaces'

/** Queries for all children of Stark, or if the character is male */
export const booleanSearch = async () => {
  // This is specific to a match query. You can only have one key, and it must be inside the objects you are searching.
  const searchParams: RequestParams.Search<
    Query<BooleanQuery<MatchQuery<Character, 'father'> | MatchQuery<Character, 'gender'>>>
  > = {
    index: characterIndex,
    body: {
      query: {
        bool: {
          should: [
            {
              match: {
                father: {
                  query: 'Star',
                  fuzziness: 'AUTO',
                },
              },
            },
            {
              match: {
                gender: 'male',
              },
            },
          ],
        },
      },
    },
  }

  const result = await SearchClient.search<SearchResponse<Character>>(searchParams)
  const results = result.body.hits.hits.map(hit => hit._source)
  console.log(results)
}
