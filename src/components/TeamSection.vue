<script setup>
import ButtonEl from '../template/ButtonEl.vue'

import SectionEl from '../template/SectionEl.vue'
import { ref, reactive } from 'vue'

const imgLink = ref('/images/main/workstation.webp')
const description = reactive({
      heading: 'Great Painters',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, a minima temporibus perspiciatis quasi ut harum nulla, eos qui amet excepturi maxime illum, facere ea sit ab officiis libero dolor. Laborum adipisci consequatur, rem reprehenderit quidem eos ut sapiente fuga.'
})
</script>
<template>
      <SectionEl :img-link="imgLink" :description="description">
            <template v-slot:button>
                  <ButtonEl class="btn--link btn--medium btn--outline-purple btn--slide-purple">
                        <router-link to="/team"> Meet our team </router-link>
                  </ButtonEl>
            </template>
      </SectionEl>
</template>

<style lang="scss" scoped></style>
