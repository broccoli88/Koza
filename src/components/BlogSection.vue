<script setup>
import { reactive } from 'vue'
import ButtonEl from '../template/ButtonEl.vue'
import SingleColEl from '../template/SingleColEl.vue'

const description = reactive({
      heading: `Need a Quote?`,
      fluff: 'Fill out the form, and we will get back to you.',
      text: ' Den of Imagination Studio is one of the largest painting studios which, offers worldwide services regarding miniature models. We offer variety of services, with great quality-price ratio! If you want to know more click the button below. Be sure to fill in the DoI Instruction file, to get a fast reply regarding your commission. '
})
</script>

<template>
      <SingleColEl :description="description">
            <template v-slot:button>
                  <ButtonEl class="btn--link btn--medium btn--outline-purple btn--slide-purple">
                        <router-link to="/contact"> Learn More </router-link>
                  </ButtonEl>
            </template>
      </SingleColEl>
</template>

<style lang="scss" scoped></style>
