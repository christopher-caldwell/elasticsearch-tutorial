import { QueryConfig } from './shared'

/** Using the `range` operation for searching
 * @link [Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html)
 */
export interface RangeQueryOptions {
  /** Greater than */
  gt?: string | number
  /** Greater than or equal to */
  gte?: string | number
  /** Less than */
  lt?: string | number
  /** Less than or equal to */
  lte?: string | number
  /** Date format used to convert date values in the query.
   * By default, Elasticsearch uses the date format provided in the <field>'s mapping. This value overrides that mapping format.
   *
   *
   * If a format or date value is incomplete, the range query replaces any missing components with default values.
   * @link [Format Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html)
   */
  format?: string
  /** Indicates how the range query matches values for range fields
   * @option `INTERSECTS` Matches documents with a range field value that intersects the query’s range
   * @option `CONTAINS` Matches documents with a range field value that entirely contains the query’s range.
   * @option `WITHIN` Matches documents with a range field value entirely within the query’s range.
   */
  relation?: 'INTERSECTS' | 'CONTAINS' | 'WITHIN'
  /** Coordinated Universal Time (UTC) offset or IANA time zone used to convert date values in the query to UTC.
   *
   * Valid values are ISO 8601 UTC offsets, such as +01:00 or -08:00, and IANA time zone IDs, such as `America/Los_Angeles`.
   *
   *
   * The time_zone parameter does not affect the date math value of now. now is always the current system time in UTC.
   * However, the time_zone parameter does convert dates calculated using now and date math rounding.
   * For example, the `time_zone` parameter will convert a value of `now/d`. */
  time_zone?: string
  /** Floating point number used to decrease or increase the relevance scores of a query. Defaults to 1.0.
   *
   * You can use the boost parameter to adjust relevance scores for searches containing two or more queries.
   *
   * Boost values are relative to the default value of 1.0. A boost value between 0 and 1.0 decreases the relevance score. A value greater than 1.0 increases the relevance score.
   * @default 1.0*/
  boost?: number
}

/**
 * Returns documents that contain terms within a provided range.
 * @link [Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html)
 */
export type RangeQuery<ResultType, KeyOfSearchedProperty extends keyof ResultType> = {
  range: QueryConfig<ResultType, KeyOfSearchedProperty, RangeQueryOptions>
}
