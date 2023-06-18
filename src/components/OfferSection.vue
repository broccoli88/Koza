<script setup>
import SectionEl from '../template/SectionEl.vue'
import ButtonEl from '../template/ButtonEl.vue'
import { ref, reactive } from 'vue'

const imgLink = ref('/images/main/warm.webp')
const description = reactive({
      heading: 'Painting, modeling, basing',
      text: 'We can paint from individual miniatures to large armies. Choose the painting level that best suits your needs. From the most basic standard to painted miniatures for the most demanding customers.'
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
