<script setup></script>

<template>
  <section class="single-col__description">
    <h2 class="single-col__heading">
      <slot name="heading"></slot>
    </h2>
    <h3 class="single-col__fluff">
      <slot name="fluff"></slot>
    </h3>
    <p>
      <slot name="description"> </slot>
    </p>

    <slot name="button"></slot>
  </section>
</template>

<style lang="scss" scoped>
.single-col__description {
  @include description;
  padding-bottom: 4rem;
  margin-bottom: 0;

  .single-col__heading {
    @include heading-underline-purple;
  }

  .single-col__fluff {
    @include breakpoint {
      margin-bottom: 1.5vw;
    }
  }

  p {
    margin-block: 2rem;
  }
}
// }
.single-col--alt {
  background-color: $color-gray-lighter;
  display: grid;
}
</style>
