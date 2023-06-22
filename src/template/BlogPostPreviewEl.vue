<script setup>
import ButtonEl from './ButtonEl.vue'
</script>

<template>
      <article class="blog-preview">
            <figure>
                  <img class="preview__img" src="/images/blog/blog.jpeg" alt="" />
            </figure>
            <section class="preview__content">
                  <router-link to="/blog/blog-post-1" class="preview__title"
                        >Miniature base made of coconut</router-link
                  >
                  <p class="preview__text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil magnam
                        aperiam ea assumenda voluptates quas...
                  </p>
                  <footer class="preview__footer">
                        <p>24/06/2023</p>
                        <ButtonEl class="btn--small btn--outline-black btn--slide-black btn--link">
                              <router-link to="#"> Read more </router-link>
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
