<script setup>
import SectionEl from '../template/SectionEl.vue'
import ButtonEl from '../template/ButtonEl.vue'
import { ref, reactive } from 'vue'

const imgLink = ref('/images/main/warm.webp')
const description = reactive({
      heading: 'Painting, modeling, basing',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, a minima temporibus perspiciatis quasi ut harum nulla, eos qui amet excepturi maxime illum, facere ea sit ab officiis libero dolor. Laborum adipisci consequatur, rem reprehenderit quidem eos ut sapiente fuga.'
})
</script>

<template>
      <SectionEl :img-link="imgLink" :description="description" class="reverse">
            <template v-slot:button>
                  <ButtonEl class="btn--link btn--medium btn--outline-purple btn--slide-purple">
                        <router-link to="/offer"> Prices & Levels </router-link>
                  </ButtonEl>
            </template>
      </SectionEl>
</template>

<style lang="scss" scoped></style>
