<script setup>
import BlogPreviewEl from '../template/BlogPreviewEl.vue'
import BlogMedia from '../components/BlogMedia.vue'
import { ref } from 'vue'

const showMediaPanel = ref(false)

window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
            showMediaPanel.value = true
      } else {
            showMediaPanel.value = false
      }
})
</script>

<template>
      <section class="themes-blog">
            <h1 class="blog__heading">Blog</h1>
            <BlogMedia class="blog__media" v-if="showMediaPanel" />
            <section class="blog__previews">
                  <BlogPreviewEl v-for="n in 5" :key="n" />
            </section>
      </section>
</template>

<style lang="scss" scoped>
.themes-blog {
      @include container;
      padding-inline: 1.5rem;

      @include breakpoint(1024px) {
            // padding-inline: 0;
            display: grid;
            gap: 3rem;
            grid-template-areas:
                  'heading heading heading'
                  'previews previews media';
      }

      .blog__heading {
            margin-block: 4rem;

            @include breakpoint(1024px) {
                  grid-area: heading;
            }
      }

      .blog__media {
            @include breakpoint(1024px) {
                  grid-area: media;
            }
      }

      .blog__previews {
            display: grid;
            gap: 4rem;

            @include breakpoint(1024pxs) {
                  grid-area: previews;
            }
      }
}
</style>
