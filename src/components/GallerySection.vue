<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import SectionEl from '../template/SectionEl.vue'
import { reactive, ref } from 'vue'

const imgLink = ref('/images/main/gargant.webp')
const description = reactive({
      heading: 'Gallery',
      text: 'We love to dedicate full time to miniature painting! If you are a lover of wargames in our gallery you can see different models painted example of our painting levels and some of our best miniatures.'
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
