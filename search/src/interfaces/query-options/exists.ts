import { QueryConfig } from './shared'

/** Using the `exists` operation for searching
 * @link [Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html)
 */
export interface ExistsQueryOptions {
  /**  Name of the field you wish to search.
   *
   * While a field is deemed non-existent if the JSON value is null or [], these values will indicate the field does exist:
   * - Empty strings, such as `""` or `"-"`
   * - Arrays containing `null` and another value, such as `[null, "foo"]`
   * - A custom null-value, defined in field mapping */
  field: string
}

/** Returns documents that contain an indexed value for a field.
 * An indexed value may not exist for a document’s field due to a variety of reasons:
 * - The field in the source JSON is `null` or `[]`
 * - The field has `"index": false` set in the mapping
 * - The length of the field value exceeded an `ignore_above` setting in the mapping
 * - The field value was malformed and `ignore_malformed` was defined in the mapping
 * @link [Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html)
 */
export type ExistsQuery<ResultType, KeyOfSearchedProperty extends keyof ResultType> = {
  /** You can only declare a single property of the partial here. Adding more than one will cause a runtime error */
  exists: QueryConfig<ResultType, KeyOfSearchedProperty, ExistsQueryOptions>
}
