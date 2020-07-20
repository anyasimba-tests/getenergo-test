export interface FetchedCatalogCategory {
  category_id: number
  parent_id: number|null
  name: string
  url: string
}

export interface CatalogCategory {
  category_id: number
  parent: CatalogCategory|null
  parent_id: number|null
  name: string
  url: string
  list: CatalogCategory[]
}
