export type Fuzziness = 'AUTO' | '1' | '2'

/** Using the `match` operation for searching
 * @link [Docs](https://www.elastic.co/guide/en/elasticsearch/reference/7.x/query-dsl-match-query.html)
 */
export interface MatchQueryOptions {
  /** Text, number, boolean value or date you wish to find in the provided
   *
   * The match query analyzes any provided text before performing a search.
   * This means the match query can search text fields for analyzed tokens rather than an exact term.
   */
  query: string | number | boolean | Date
  /**  Maximum edit distance allowed for matching */
  fuzziness?: Fuzziness
  /** Allows specifying an absolute or relative document frequency where high frequency terms are moved into an
   * optional sub-query and are only scored if one of the low frequency (below the cutoff) terms in the case of
   * an or operator or all of the low frequency terms in the case of an and operator match.
   * @deprecated 7.3.0 */
  cutoff_frequency?: number
  /** Boolean logic used to interpret text in the query value
   * @default or
   */
  operator?: 'and' | 'or'
  /**  Indicates whether no documents are returned if the analyzer removes all tokens, such as when using a stop filter
   * @default none
   */
  zero_terms_query?: 'none' | 'all'
  /** Used to convert the text in the query value into tokens */
  analyzer?: string
  /** If true, match phrase queries are automatically created for multi-term synonyms
   * @default true
   */
  auto_generate_synonyms_phrase_query?: boolean
  /** Maximum number of terms to which the query will expand.
   * @default 50
   */
  max_expansions?: number
  /** Minimum number of clauses that must match for a document to be returned */
  minimum_should_match?: string
  /**  If true, format-based errors, such as providing a text query value for a numeric field, are ignored
   * @default false
   */
  lenient?: boolean
  /** Method used to rewrite the query. See the rewrite parameter for valid values and more information.
   *
   * If the fuzziness parameter is not 0,
   * the match query uses a fuzzy_rewrite method of `top_terms_blended_freqs_${max_expansions}` by default. */
  fuzzy_rewrite?: string
  /** If true, edits for fuzzy matching include transpositions of two adjacent characters (ab → ba).
   * @default true
   */
  fuzzy_transpositions?: boolean
  /** Number of beginning characters left unchanged for fuzzy matching.
   * @default 0
   */
  prefix_length?: number
}

/** Returns documents that match a provided text, number, date or boolean value. The provided text is analyzed before matching.

The match query is the standard query for performing a full-text search, including options for fuzzy matching. 
* @link [Docs](https://www.elastic.co/guide/en/elasticsearch/reference/7.x/query-dsl-match-query.html)
*/
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
