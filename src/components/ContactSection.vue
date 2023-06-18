<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import SingleColEl from '../template/SingleColEl.vue'
import { reactive } from 'vue'

const description = reactive({
      heading: `Have Any Questions?`,
      fluff: 'Contact us!',
      text: `You have questions that don't require quote? Feel free to ask us anytime about anything that is connected to painting and basing miniatures! We will gladly answer all your questions.`
})
</script>

<template>
      <SingleColEl :description="description">
            <!-- <template v-slot:heading></template>
            <template v-slot:fluff></template>
            <template v-slot:description> </template> -->
            <template v-slot:button>
                  <ButtonEl class="btn--link btn--medium btn--outline-purple btn--slide-purple">
                        <router-link to="/contact"> Learn More </router-link>
                  </ButtonEl>
            </template>
      </SingleColEl>
</template>

<style lang="scss" scoped></style>
