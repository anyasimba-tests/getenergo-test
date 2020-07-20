import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import { $axios } from '@/utils/api'
import { FetchedCatalogCategory, CatalogCategory } from '@/types/catalog'

@Module({
  name: 'catalog',
  stateFactory: true,
  namespaced: true,
})
export default class CatalogStore extends VuexModule {
  categories: CatalogCategory[] = []
  rootCategories: CatalogCategory[] = []

  @MutationAction({ mutate: ['categories', 'rootCategories'] })
  async fetch () {
    const items: FetchedCatalogCategory[] = (await $axios.$get(`/api/catalog/categories?limit=0`)).items
    const categories: CatalogCategory[] = []
    const rootCategories: CatalogCategory[] = []
    items.forEach(item => {
      const category = {
        name: item.name,
        category_id: item.category_id,
        url: item.url,
        parent: null,
        parent_id: item.parent_id,
        list: [],
      }
      categories.push(category)

      if (item.parent_id == null) {
        rootCategories.push(category)
        return
      }
    })
    categories.forEach(category => {
      const parent = categories.find(parent => parent.category_id === category.parent_id)
      if (parent) {
        category.parent = parent
        parent.list.push(category)
      }
    })
    return {categories, rootCategories}
  }

  get categoriesFrom () { return (url?: string) => {
    let {categories, rootCategories} = this
    if (url == null) {
      return rootCategories
    }
    if (url[0] === '/') {
      url = url.slice(1)
    }
    console.log(url)
    return categories.find(category => category.url === url)?.list
  }}
}
