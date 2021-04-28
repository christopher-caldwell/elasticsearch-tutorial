export type Fuzziness = 'AUTO' | '1' | '2'

export interface MatchQueryOptions {
  query: string
  fuzziness?: Fuzziness
  auto_generate_synonyms_phrase_query?: boolean
  /** Allows specifying an absolute or relative document frequency where high frequency terms are moved into an optional subquery and are only scored if one of the low frequency (below the cutoff) terms in the case of an or operator or all of the low frequency terms in the case of an and operator match.
   * @deprecated 7.3.0 */
  cutoff_frequency?: number
  operator?: 'and' | 'or'
  zero_terms_query?: 'none' | 'all'
}

export type MatchQuery<ResultType, KeyOfSearchedProperty extends keyof ResultType> = {
  query: {
    /** You can only declare a single property of the partial here. Adding more than one will cause a runtime error */
    match: Pick<
      {
        [key in keyof ResultType]: ResultType[key] | MatchQueryOptions
      },
      KeyOfSearchedProperty
    >
  }
}

// Complete definition of the Search response
export interface ShardsResponse {
  total: number
  successful: number
  failed: number
  skipped: number
}

export interface Explanation {
  value: number
  description: string
  details: Explanation[]
}

export interface SearchResponse<T> {
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
