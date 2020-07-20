<template>
  <section class="catalogMenu" v-bind:class="{'catalogMenu--collapsed': isCollapsed}">
    <div class="catalogMenu__header" v-on:click="toggle()">
      Категории <span class="catalogMenu__toggle">></span>
    </div>
    <div class="catalogMenu__body">
      <ul class="catalogMenu__list">
        <li v-for="(link, i) in links" :key="i">
          <nuxt-link :to="link.to">{{ link.text }}</nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CatalogMenu extends Vue {
  @Prop() links!: [{to: string, text: string}]
  isCollapsed = false

  toggle () {
    this.isCollapsed = !this.isCollapsed
  }
}
</script>

<style lang="scss">
.catalogMenu {
  display: inline-block;
  margin: 20px;
  padding: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  &--collapsed &__body {
    height: 0;
    overflow: hidden;
  }
  &--collapsed &__toggle {
    transform: rotate(90deg);
  }
  &__header {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;
  }
  &__toggle {
    display: inline-block;
    transform-origin: center;
    transform: rotate(-90deg);
  }
  &__list {
    list-style-type: none;
    padding: 20px 0 0;
    a {
      color: #000000;
    }
  }
}
</style>
