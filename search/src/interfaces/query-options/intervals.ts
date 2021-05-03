import { QueryConfig } from './shared'

export type IntervalOptionKeys = 'match' | 'prefix' | 'wildcard' | 'fuzzy' | 'all_of' | 'any_of'

/** The filter rule returns intervals based on a query. */
export interface IntervalFilter<ResultType, KeyOfSearchedProperty extends keyof ResultType, QueryOptions> {
  /** Query used to return intervals that follow an interval from the filter rule. */
  after?: QueryConfig<ResultType, KeyOfSearchedProperty, QueryOptions>
  /** Query used to return intervals that occur before an interval from the filter rule. */
  before?: QueryConfig<ResultType, KeyOfSearchedProperty, QueryOptions>
  /** Query used to return intervals contained by an interval from the filter rule. */
  contained_by?: QueryConfig<ResultType, KeyOfSearchedProperty, QueryOptions>
  /** Query used to return intervals that contain an interval from the filter rule. */
  containing?: QueryConfig<ResultType, KeyOfSearchedProperty, QueryOptions>
  /** Query used to return intervals that are not contained by an interval from the filter rule. */
  not_contained_by?: QueryConfig<ResultType, KeyOfSearchedProperty, QueryOptions>
  /** Query used to return intervals that do not contain an interval from the filter rule. */
  not_containing?: QueryConfig<ResultType, KeyOfSearchedProperty, QueryOptions>
  /** Query used to return intervals that do not overlap with an interval from the filter rule. */
  not_overlapping?: QueryConfig<ResultType, KeyOfSearchedProperty, QueryOptions>
  /** Query used to return intervals that overlap with an interval from the filter rule. */
  overlapping?: QueryConfig<ResultType, KeyOfSearchedProperty, QueryOptions>
  /** Script used to return matching documents. This script must return a boolean value, true or false. See Script filters for an example. */
  script?: QueryConfig<ResultType, KeyOfSearchedProperty, QueryOptions>
}

/** The match rule matches analyzed text */
export interface IntervalsMatchOptions<ResultType, KeyOfSearchedProperty extends keyof ResultType, QueryOptions> {
  /** Text you wish to find in the provided <field>. */
  query: string
  /** Maximum number of positions between the matching terms. Terms further apart than this are not considered matches
   * If unspecified or set to -1, there is no width restriction on the match. If set to 0, the terms must appear next to each other.
   * @default -1
   */
  max_gaps?: number
  /** If true, matching terms must appear in their specified order
   * @default false
   */
  ordered?: boolean
  /** [Analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis.html) used to analyze terms in the query. Defaults to the top-level `<field>`'s analyzer. */
  analyzer?: string
  filter?: IntervalFilter<ResultType, KeyOfSearchedProperty, QueryOptions>
  /** If specified, then match intervals from this field rather than the top-level `<field>`.
   * Terms are analyzed using the search analyzer from this field.
   * This allows you to search across multiple fields as if they were all the same field;
   * for example, you could index the same text into stemmed and unstemmed fields, and search for stemmed tokens near unstemmed ones. */
  use_field?: string
}

/** The prefix rule matches terms that start with a specified set of characters. This prefix can expand to match **at most 128 terms**.
 *
 * If the prefix matches more than 128 terms, Elasticsearch returns an error. You can use the index-prefixes option in the field mapping to avoid this limit. */
export interface IntervalsPrefixOptions {
  /** Beginning characters of terms you wish to find in the top-level `<field>` */
  prefix: string
  /** [Analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis.html) used to normalize the prefix. Defaults to the top-level `<field>`'s analyzer. */
  analyzer?: string
  /** If specified, then match intervals from this field rather than the top-level `<field>`.
   *
   * The prefix is normalized using the search analyzer from this field, unless a separate analyzer is specified.
   */
  use_field?: string
}

/** The wildcard rule matches terms using a wildcard pattern. This prefix can expand to match **at most 128 terms**.
 *
 * If the prefix matches more than 128 terms, Elasticsearch returns an error
 */
export interface IntervalsWildcardOptions {
  /** Wildcard pattern used to find matching terms. 
   * This parameter supports two wildcard operators:
    - `?`: matches any single character
    - `*`: can match zero or more characters, including an empty one
    @warning **Avoid beginning patterns** with `*` or `?`. This can increase the iterations needed to find matching terms and slow search performance.
  */
  pattern: string
  /** [Analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis.html) used to normalize the pattern. Defaults to the top-level `<field>`'s analyzer. */
  analyzer?: string
  /** If specified, then match intervals from this field rather than the top-level `<field>`.
   *
   * The pattern is normalized using the search analyzer from this field, unless a separate analyzer is specified.
   */
  use_field?: string
}

export interface IntervalsFuzzyOptions {
  /** The term to match */
  term: string
  /** Number of beginning characters left unchanged when creating expansions
   * @default 0
   */
  prefix_length?: number
  /** Indicates whether edits include transpositions of two adjacent characters (ab → ba)
   * @default true
   */
  transpositions?: boolean
  /** Maximum edit distance allowed for matching. See Fuzziness for valid values and more information.
   * @default auto
   */
  fuzziness?: string
  /** [Analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis.html) used to normalize the term. Defaults to the top-level <field> 's analyzer. */
  analyzer?: string
  /** If specified, then match intervals from this field rather than the top-level `<field>`.
   *
   * The term is normalized using the search analyzer from this field, unless a separate analyzer is specified.
   */
  use_field?: string
}

type IntervalIntervalsOptions<ResultType, KeyOfSearchedProperty extends keyof ResultType, QueryOptions> =
  | IntervalsMatchOptions<ResultType, KeyOfSearchedProperty, QueryOptions>
  | IntervalsPrefixOptions
  | IntervalsWildcardOptions
  | IntervalsFuzzyOptions
  | IntervalsAllOfOptions<ResultType, KeyOfSearchedProperty, QueryOptions>
  | IntervalsAnyOfOptions<ResultType, KeyOfSearchedProperty, QueryOptions>
  | QueryConfig<ResultType, KeyOfSearchedProperty, QueryOptions>

/** The all_of rule returns matches that span a combination of other rules. */
export interface IntervalsAllOfOptions<ResultType, KeyOfSearchedProperty extends keyof ResultType, QueryOptions> {
  /**  An array of rules to combine. **All rules must produce a match** in a document for the overall source to match. */
  intervals: IntervalIntervalsOptions<ResultType, KeyOfSearchedProperty, QueryOptions>[]
  /** Maximum number of positions between the matching terms. Intervals produced by the rules further apart than this are not considered matches.
   * If unspecified or set to -1, there is no width restriction on the match. If set to 0, the terms must appear next to each other.
   * @default -1
   */
  max_gaps?: number
  /** If true, intervals produced by the rules should appear in the order in which they are specified. Defaults to false. */
  ordered?: boolean
  /** Rule used to filter returned intervals. */
  filter?: IntervalFilter<ResultType, KeyOfSearchedProperty, QueryOptions>
}

export interface IntervalsAnyOfOptions<ResultType, KeyOfSearchedProperty extends keyof ResultType, QueryOptions> {
  /**  An array of rules to match. */
  intervals: IntervalIntervalsOptions<ResultType, KeyOfSearchedProperty, QueryOptions>[]
  /** Rule used to filter returned intervals. */
  filter?: IntervalFilter<ResultType, KeyOfSearchedProperty, QueryOptions>
}

export type IntervalQueryOptionMap<ResultType, KeyOfSearchedProperty extends keyof ResultType, QueryOptions> = {
  match: IntervalsMatchOptions<ResultType, KeyOfSearchedProperty, QueryOptions>
  prefix: IntervalsPrefixOptions
  wildcard: IntervalsWildcardOptions
  fuzzy: IntervalsFuzzyOptions
  all_of: IntervalsAllOfOptions<ResultType, KeyOfSearchedProperty, QueryOptions>
  any_of: IntervalsAnyOfOptions<ResultType, KeyOfSearchedProperty, QueryOptions>
}

/** Returns documents based on the order and proximity of matching terms.
 * The intervals query uses matching rules, constructed from a small set of definitions. These rules are then applied to terms from a specified field.
 * The definitions produce sequences of minimal intervals that span terms in a body of text. These intervals can be further combined and filtered by parent sources.
 * @link [Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-intervals-query.html)
 */
export type IntervalsQuery<
  IntervalOption extends IntervalOptionKeys,
  ResultType,
  KeyOfSearchedProperty extends keyof ResultType,
  QueryOptions
> = {
  /** You can only declare a single property of the partial here. Adding more than one will cause a runtime error */
  intervals: Pick<IntervalQueryOptionMap<ResultType, KeyOfSearchedProperty, QueryOptions>, IntervalOption>
}
