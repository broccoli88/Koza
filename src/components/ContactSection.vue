<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import SingleColEl from '../template/SingleColEl.vue'
</script>

<template>
  <SingleColEl>
    <template v-slot:heading>Have Any questions?</template>
    <template v-slot:fluff>Contact us!</template>
    <template v-slot:description>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia optio eligendi minima rerum
      cupiditate tenetur, officiis commodi reprehenderit, odit consectetur sapiente molestias error
      voluptatum incidunt sint. Magnam repellat eligendi qui iste sapiente, id voluptas, et
      obcaecati accusamus, debitis at nostrum!</template
    >
    <template v-slot:button>
      <ButtonEl class="btn--link btn--medium btn--white btn--slide-black">
        <router-link to="/contact"> Learn More </router-link>
      </ButtonEl>
    </template>
  </SingleColEl>
</template>

<style lang="scss" scoped></style>
