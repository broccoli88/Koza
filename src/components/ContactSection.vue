<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import SingleColEl from '../template/SingleColEl.vue'
import { reactive } from 'vue'

const description = reactive({
      heading: `Have Any questions?`,
      fluff: 'Contact us!',
      text: '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia optio eligendi minima rerum cupiditate tenetur, officiis commodi reprehenderit, odit consectetur sapiente molestias error voluptatum incidunt sint. Magnam repellat eligendi qui iste sapiente, id voluptas, et obcaecati accusamus, debitis at nostrum!'
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
