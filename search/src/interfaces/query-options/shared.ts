export type QueryConfig<ResultType, KeyOfSearchedProperty extends keyof ResultType, QueryOptions> = Pick<
  {
    [key in keyof ResultType]: ResultType[key] | QueryOptions
  },
  KeyOfSearchedProperty
>

export type Query<QueryType> = {
  query: QueryType
}

export interface NamedQuery {
  /** Each query accepts a _name in its top level definition. You can use named queries to track which queries matched returned documents.
   *
   * If named queries are used, the response includes a matched_queries property for each hit. */
  _name?: string
}
