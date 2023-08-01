<script setup>
import BlogPostPreviewEl from '../template/BlogPostPreviewEl.vue'
import BlogMedia from '../components/BlogMedia.vue'
import { onMounted, ref } from 'vue'
import { useBlogStore } from '../stores/BlogStore'
import { storeToRefs } from 'pinia'

const blogStore = useBlogStore()
const { blogData } = storeToRefs(blogStore)
const showMediaPanel = ref(false)

window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
            showMediaPanel.value = true
      } else {
            showMediaPanel.value = false
      }
})

onMounted(() => {
      if (window.innerWidth >= 1024) {
            showMediaPanel.value = true
      }

      blogStore.getBlogData()
})
</script>

<template>
      <section class="themes-blog" v-if="blogData.length > 0">
            <h1 class="blog__heading">Blog</h1>
            <BlogMedia class="blog__media" v-if="showMediaPanel" />
            <section class="blog__previews">
                  <BlogPostPreviewEl v-for="post in blogData" :key="post.sys.id" :post="post" />
            </section>
      </section>
</template>

<style lang="scss" scoped>
.themes-blog {
      @include container;
      padding-inline: 1.5rem;
      margin-top: 8rem;

      @include breakpoint(1024px) {
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
