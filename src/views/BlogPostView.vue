<script setup>
import ButtonEl from '../template/ButtonEl.vue'
</script>

<template>
      <section class="blog-post">
            <header class="post__header">
                  <p class="post__date">July 20 2023</p>
                  <ButtonEl class="btn--link btn--small btn--outline-black btn--slide-black">
                        <router-link to="/blog">Back to all posts</router-link>
                  </ButtonEl>
                  <h2>Blog Post #1</h2>
                  <figure class="post__banner">
                        <img class="post__header-img" src="/images/blog/blog.jpeg" alt="" />
                  </figure>
            </header>

            <p class="post__text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae provident
                  cupiditate aliquid fugiat atque magnam accusantium. Quidem voluptatibus
                  dignissimos natus quia dolores. Deserunt ab consectetur laudantium nam consequatur
                  dolores necessitatibus alias? Veritatis in deserunt recusandae tenetur. Magni
                  quod, omnis nisi consequuntur ex placeat pariatur maiores officia facilis odit,
            </p>

            <p class="post__text">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, nulla eum
                  quisquam dolor debitis quasi quis, illum qui dicta tenetur atque. Eveniet saepe
                  facere obcaecati provident ab, a enim quo!
            </p>

            <div class="post__images">
                  <img class="post__img" src="/images/blog/blog.jpeg" alt="" />
                  <img class="post__img" src="/images/blog/blog.jpeg" alt="" />
                  <img class="post__img" src="/images/blog/blog.jpeg" alt="" />
            </div>

            <p class="post__text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque porro
                  voluptatem iusto illo autem voluptatum debitis odit amet ab. Ab assumenda
                  excepturi doloremque. Incidunt dolorum officiis quos optio, tempore tempora ut.
                  Eligendi consequatur voluptatibus eius iusto, repellendus voluptatem quo, cum
                  rerum accusantium maiores dolorem aspernatur, expedita similique at optio neque
                  numquam? Animi laborum voluptatibus quasi ratione optio. Doloribus quasi
                  exercitationem earum perspiciatis iure obcaecati rerum suscipit dolore ipsa, nobis
                  sapiente odio dolores animi sit, reprehenderit, quae nemo voluptas? Non illo dolor
                  id repellat sequi ducimus praesentium ab neque, recusandae laudantium
                  reprehenderit incidunt nostrum, quasi consectetur cumque quo, sed aperiam
                  doloremque.
            </p>

            <div class="post__images">
                  <img class="post__img" src="/images/blog/blog.jpeg" alt="" />
                  <img class="post__img" src="/images/blog/blog.jpeg" alt="" />
                  <img class="post__img" src="/images/blog/blog.jpeg" alt="" />
            </div>

            <p class="post__text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque porro
                  voluptatem iusto illo autem voluptatum debitis odit amet ab. Ab assumenda
                  excepturi doloremque. Incidunt dolorum officiis quos optio, tempore tempora ut.
                  Eligendi consequatur voluptatibus eius iusto, repellendus voluptatem quo, cum
                  rerum accusantium maiores dolorem aspernatur, expedita similique at optio neque
                  numquam?
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
