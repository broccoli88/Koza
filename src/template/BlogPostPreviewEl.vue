<script setup>
import { computed, ref } from 'vue'
import ButtonEl from './ButtonEl.vue'

const props = defineProps(['post'])

const previewText = computed(() => {
      return props.post.fields.postText1.substring(0, 200) + '...'
})

const dateString = ref(props.post.fields.postCreationDate)
const dateParts = computed(() => dateString.value.split(/T/))
const id = ref(props.post.sys.id)
</script>

<template>
      <article class="blog-preview">
            <figure class="preview__img-container">
                  <img class="preview__img" :src="post.fields.postBanner.fields.file.url" alt="" />
            </figure>
            <section class="preview__content">
                  <router-link :to="`/blog/${id}`" class="preview__title">{{
                        post.fields.postTitle
                  }}</router-link>
                  <p class="preview__text">
                        {{ previewText }}
                  </p>
                  <footer class="preview__footer">
                        <p>{{ dateParts[0] }}, {{ dateParts[1] }}</p>
                        <ButtonEl class="btn--small btn--outline-black btn--slide-black btn--link">
                              <router-link :to="`/blog/${id}`"> Read more </router-link>
                        </ButtonEl>
                  </footer>
            </section>
      </article>
</template>

<style lang="scss" scoped>
.blog-preview {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      position: relative;

      &::before {
            content: '';

            position: absolute;
            bottom: -2rem;
            left: 50%;
            width: 80%;
            height: 1px;

            transform: translateX(-50%);

            background-color: $bc-grayopacity-05;
      }

      // padding-inline: 1.5rem;

      @include breakpoint {
            max-height: 40rem;
            flex-direction: row;
      }

      .preview__img-container {
            max-height: 30vh;
            @include breakpoint {
                  width: 50%;
            }
      }

      .preview__img {
            @include img;
      }

      .preview__content {
            width: min(50ch, 100%);
            display: grid;
            grid-template-rows: min-content 1fr min-content;
            gap: 2rem;
            .preview__title {
                  font-size: clamp(2rem, 1rem + 1.7vw, 2.7rem);
                  font-weight: 700;
                  color: $color-black;
            }

            .preview__footer {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
            }
      }
}
</style>
