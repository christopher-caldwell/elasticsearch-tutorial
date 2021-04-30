import { NamedQuery } from './shared'

type BooleanQueryOccurrenceOption = 'must' | 'filter' | 'should' | 'must_not'

/** Using the `exists` operation for searching
 * @link [Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html)
 */
export interface BooleanQueryOptions {
  /** You can use the minimum_should_match parameter to specify the number or percentage of should clauses returned documents must match.
   *
   * If the bool query includes at least one should clause and no must or filter clauses, the default value is `1`. Otherwise it is `0`
   * */
  minimum_should_match?: number
  boost?: number
}

/** A query that matches documents matching boolean combinations of other queries.
 * The bool query maps to Lucene `BooleanQuery`.
 * It is built using one or more boolean clauses, each clause with a typed occurrence.
 * @link [Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)
 */
export interface BooleanQuery<QueryType> {
  bool: Partial<
    {
      [key in BooleanQueryOccurrenceOption]: (QueryType & NamedQuery) | (QueryType & NamedQuery)[]
    } &
      BooleanQueryOptions
  >
}
