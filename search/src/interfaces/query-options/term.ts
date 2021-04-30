import { QueryConfig } from './shared'

/** Using the `term` operation for searching
 * @link [Docs](https://www.elastic.co/guide/en/elasticsearch/reference/7.x/query-dsl-term-query.html)
 */
export interface TermQueryOptions {
  value: string
  /** Floating point number used to decrease or increase the relevance scores of a query.
   *
   * You can use the boost parameter to adjust relevance scores for searches containing two or more queries.
   *
   * Boost values are relative to the default value of 1.0. A boost value between 0 and 1.0 decreases the relevance score. A value greater than 1.0 increases the relevance score.
   * @default 1.0
   */
  boost?: number
  /** Allows ASCII case insensitive matching of the value with the indexed field values when set to true.
   *
   * Default is false which means the case sensitivity of matching depends on the underlying field’s mapping.
   * @version 7.10.0
   * @default false
   */
  case_insensitive?: boolean
}

/**
 * Returns documents that contain an **exact** term in a provided field.
 *
 * You can use the term query to find documents based on a precise value such as a price, a product ID, or a username.
 *
 * Avoid using the term query for text fields.
 *
 * By default, Elasticsearch changes the values of text fields as part of analysis. This can make finding exact matches for text field values difficult.
 * To search text field values, use the match query instead.
 * @link [Docs](https://www.elastic.co/guide/en/elasticsearch/reference/7.x/query-dsl-term-query.html)
 */
export type TermQuery<ResultType, KeyOfSearchedProperty extends keyof ResultType> = {
  /** You can only declare a single property of the partial here. Adding more than one will cause a runtime error */
  term: QueryConfig<ResultType, KeyOfSearchedProperty, TermQueryOptions>
}
