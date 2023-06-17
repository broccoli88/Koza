<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import SectionEl from '../template/SectionEl.vue'
import { reactive, ref } from 'vue'

const imgLink = ref('/images/main/gargant.webp')
const description = reactive({
      heading: 'Gallery',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, a minima temporibus perspiciatis quasi ut harum nulla, eos qui amet excepturi maxime illum, facere ea sit ab officiis libero dolor. Laborum adipisci consequatur, rem reprehenderit quidem eos ut sapiente fuga.'
})
</script>
<template>
      <SectionEl :img-link="imgLink" :description="description">
            <template v-slot:button>
                  <ButtonEl class="btn--link btn--medium btn--outline-purple btn--slide-purple">
                        <router-link to="/gallery"> Discover our work </router-link>
                  </ButtonEl>
            </template>
      </SectionEl>
</template>

<style lang="scss" scoped>
.mask {
      @include mask;
}

.heading-char,
.text-char {
      @include char;
}
</style>
