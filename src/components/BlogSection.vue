<script setup>
import { reactive } from 'vue'
import ButtonEl from '../template/ButtonEl.vue'
import SingleColEl from '../template/SingleColEl.vue'

const description = reactive({
      heading: `Interested what's new?`,
      fluff: 'Check out our blog!',
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
                        <router-link to="/blog"> Learn More </router-link>
                  </ButtonEl>
            </template>
      </SingleColEl>
</template>

<style lang="scss" scoped></style>
