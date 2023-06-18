<script setup>
import ButtonEl from '../template/ButtonEl.vue'

import SectionEl from '../template/SectionEl.vue'
import { ref, reactive } from 'vue'

const imgLink = ref('/images/main/workstation.webp')
const description = reactive({
      heading: 'Our Team',
      text: 'We always have our eyes on painting miniatures. If you´re looking for our faces, here you can know who we are! Discover our way.'
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
