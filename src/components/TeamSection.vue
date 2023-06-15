<script setup>
import ButtonEl from '../template/ButtonEl.vue'

import SectionEl from '../template/SectionEl.vue'
import { ref } from 'vue'

const imgLink = ref('/images/US.webp')
</script>
<template>
  <SectionEl :img-link="imgLink">
    <template v-slot:heading>Great Painters</template>
    <template v-slot:description>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, a minima temporibus
      perspiciatis quasi ut harum nulla, eos qui amet excepturi maxime illum, facere ea sit ab
      officiis libero dolor. Laborum adipisci consequatur, rem reprehenderit quidem eos ut sapiente
      fuga.
    </template>
    <template v-slot:button>
      <ButtonEl class="btn--link btn--medium btn--gray btn--slide-black">
        <router-link to="/offer"> See our team </router-link>
      </ButtonEl>
    </template>
  </SectionEl>
</template>

<style lang="scss" scoped></style>
