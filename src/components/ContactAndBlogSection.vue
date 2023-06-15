<script setup>
import ContactSection from './ContactSection.vue'
import BlogSection from './BlogSection.vue'
</script>

<template>
  <section class="cab">
    <article class="cab--alt">
      <ContactSection />
    </article>
    <BlogSection />
  </section>
</template>

<style lang="scss" scoped>
.cab {
  @include section-single-col;
  grid-template-rows: repeat(2, 1fr);

  @include breakpoint {
    grid-template-rows: 1fr;
    grid-template-columns: repeat(2, 1fr);
  }
}
.cab--alt {
  background-color: $color-gray-lighter;
  display: grid;
}
</style>
