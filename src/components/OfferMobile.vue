<script setup>
import OfferAsideMobile from './OfferAsideMobile.vue'
import OfferPainting from './OfferPainting.vue'
import OfferAssembly from './OfferAssembly.vue'
import OfferBasing from './OfferBasing.vue'
import OfferCleaning from './OfferCleaning.vue'
</script>

<template>
  <aside class="offer__aside">
    <OfferAsideMobile>
      <template v-slot:section> Painting </template>
      <template v-slot:content>
        <OfferPainting />
      </template>
    </OfferAsideMobile>
    <OfferAsideMobile>
      <template v-slot:section> Assembly </template>
      <template v-slot:content>
        <OfferAssembly />
      </template>
    </OfferAsideMobile>
    <OfferAsideMobile>
      <template v-slot:section> Basing </template>
      <template v-slot:content>
        <OfferBasing />
      </template>
    </OfferAsideMobile>
    <OfferAsideMobile>
      <template v-slot:section> Cleaning </template>
      <template v-slot:content>
        <OfferCleaning />
      </template>
    </OfferAsideMobile>
  </aside>
</template>

<style lang="scss" scoped>
.offer__aside {
  width: 100%;
  max-width: 70ch;
  margin-inline: auto;

  text-align: left;

  display: grid;
  padding-inline: 1.5rem;
}
</style>
