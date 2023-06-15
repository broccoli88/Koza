<script setup>
import { ref } from 'vue'

const props = defineProps(['imgLink'])
const img = ref(props.imgLink)
</script>

<template>
  <section class="section">
    <img class="section__img" :data-src="img" :src="img" alt="" />
    <article class="section__description">
      <h2 class="section__heading">
        <slot name="heading"></slot>
      </h2>
      <p><slot name="description"></slot></p>

      <slot name="button"></slot>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.section {
  @include section-double-col;
  grid-template-rows: 350px 1fr;
  padding-bottom: 4rem;

  .section__img {
    @include img;
  }

  .section__description {
    @include description(2vw);
    margin-bottom: 0;

    .section__heading {
      @include heading-underline-purple;
    }

    p {
      margin-block: 2rem;
    }
  }
}
.reverse {
  background-color: $color-gray-lighter;
  @include breakpoint {
    grid-template-columns: 35% 1fr;
  }

  .section__img {
    @include breakpoint {
      order: 2;
    }
  }

  .section__description {
    @include breakpoint {
      order: 1;
    }
  }
}
</style>
