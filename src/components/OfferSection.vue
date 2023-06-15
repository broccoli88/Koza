<script setup>
import SectionEl from '../template/SectionEl.vue'
import ButtonEl from '../template/ButtonEl.vue'
import { ref } from 'vue'

const imgLink = ref('/images/th-cropped.webp')
</script>

<template>
  <SectionEl :img-link="imgLink" class="reverse">
    <template v-slot:heading>Painting, modeling, basing</template>
    <template v-slot:description>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, a minima temporibus
      perspiciatis quasi ut harum nulla, eos qui amet excepturi maxime illum, facere ea sit ab
      officiis libero dolor. Laborum adipisci consequatur, rem reprehenderit quidem eos ut sapiente
      fuga.
    </template>
    <template v-slot:button>
      <ButtonEl class="btn--link btn--medium btn--white btn--slide-black">
        <router-link to="/offer"> Prices & Levels </router-link>
      </ButtonEl>
    </template>
  </SectionEl>
</template>

<style lang="scss" scoped></style>
