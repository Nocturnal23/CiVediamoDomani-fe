export interface BaseCriteria {
  ids ?: Array<number>;
  excludedIds ?: Array<number>;
  pageNumber ?: number;
  pageSize ?: number;
  sortDirection ?: string;
  orderBy ?: string;
}
