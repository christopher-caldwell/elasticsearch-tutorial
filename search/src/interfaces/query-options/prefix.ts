import { QueryConfig } from './shared'

/** Using the `prefix` operation for searching
 * @link [Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html)
 */
export interface PrefixQueryOptions {
  /**  Beginning characters of terms you wish to find in the provided `<field>`. */
  value: string
  /** Method used to rewrite the query. For valid values and more information, see the [rewrite](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-term-rewrite.html) parameter. */
  rewrite?: string
  /** Allows ASCII case insensitive matching of the value with the indexed field values when set to true.
   * Default is false which means the case sensitivity of matching depends on the underlying field’s mapping.
   * @default false*/
  case_insensitive?: boolean
}

/** Returns documents that contain a specific prefix in a provided field.
 * @link [Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html)
 */
export type PrefixQuery<ResultType, KeyOfSearchedProperty extends keyof ResultType> = {
  /** You can only declare a single property of the partial here. Adding more than one will cause a runtime error */
  prefix: QueryConfig<ResultType, KeyOfSearchedProperty, PrefixQueryOptions>
}
