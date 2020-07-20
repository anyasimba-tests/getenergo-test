<template>
  <section class="container catalog">
    <CatalogMenu :links="links"/>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { Route } from 'vue-router'
import CatalogMenu from '@/components/CatalogMenu.vue'

@Component({
  components: {
    CatalogMenu,
  }
})
export default class Catalog extends Vue {
  $route!: Route
  url = '/catalog/'

  get links () {
    const {$store, $route} = this
    return $store.getters['catalog/categoriesFrom']($route.params.category).map(category => {
      return {
        to: this.url + category.url,
        text: category.name,
      }
    })
  }
}
</script>
