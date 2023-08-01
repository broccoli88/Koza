<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/BlogStore'
import { computed } from 'vue'

const blogStore = useBlogStore()

const route = useRoute()

const postData = computed(() => blogStore.blogData.find((post) => post.sys.id === route.params.id))
const dateParts = computed(() => postData.value.fields.postCreationDate.split(/T/))
console.log(postData.value)
</script>

<template>
      <section class="blog-post">
            <header class="post__header">
                  <p class="post__date">{{ dateParts[0] }}, {{ dateParts[1] }}</p>
                  <ButtonEl class="btn--link btn--small btn--outline-black btn--slide-black">
                        <router-link to="/blog">Back to all posts</router-link>
                  </ButtonEl>
                  <h2>{{ postData.fields.postTitle }}</h2>
                  <figure class="post__banner">
                        <img
                              class="post__header-img"
                              :src="postData.fields.postBanner.fields.file.url"
                              alt=""
                        />
                  </figure>
            </header>

            <p class="post__text">
                  {{ postData.fields.postText1 }}
            </p>

            <p class="post__text">
                  {{ postData.fields.descriptionForChapter1 }}
            </p>

            <div class="post__images" v-if="postData.fields.imageForChapter1.length > 0">
                  <img
                        v-for="img in postData.fields.imageForChapter1"
                        :key="img.sys.id"
                        class="post__img"
                        :src="img.fields.file.url"
                        alt=""
                  />
            </div>

            <p class="post__text">
                  {{ postData.fields.descriptionForChapter2 }}
            </p>

            <div class="post__images" v-if="postData.fields.imageForChapter2.length > 0">
                  <img
                        v-for="img in postData.fields.imageForChapter2"
                        :key="img.sys.id"
                        class="post__img"
                        :src="img.fields.file.url"
                        alt=""
                  />
            </div>

            <p class="post__text">
                  {{ postData.fields.descriptionForChapter3 }}
            </p>
            <ButtonEl class="btn--link btn--small btn--outline-black btn--slide-black">
                  <router-link to="/blog">Back to all posts</router-link>
            </ButtonEl>
      </section>
</template>

<style lang="scss" scoped>
.blog-post {
      @include container;
      margin-top: 8rem;
      padding-inline: 1.5rem;
      display: grid;

      gap: 3rem;

      .post__header {
            display: grid;
            gap: 2rem;
            justify-items: center;
            text-align: center;

            .post__banner {
                  justify-self: stretch;
                  max-height: 40rem;
            }
            .post__header-img {
                  @include img;
                  object-position: center;
            }

            .post__date {
                  font-size: clamp(1.3rem, 1rem + 0.5vw, 1.8rem);
            }
      }

      .post__images {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
            justify-content: center;
      }
      .post__img {
            width: min(30rem, 100%);
            object-fit: cover;
      }

      .post__text {
            max-width: 80ch;
            margin-inline: auto;
      }
}
</style>
