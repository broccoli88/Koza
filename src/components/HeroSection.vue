<script setup>
import ButtonEl from '../template/ButtonEl.vue'
</script>

<template>
  <section class="hero">
    <article class="hero__description">
      <h1 class="hero__heading">homey goat</h1>
      <h2 class="hero__heading-fluff">professional miniature painting studio</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nihil cumque sit porro quae
        dolore autem sapiente molestias repellendus ad, fugit quisquam suscipit optio inventore!
        Odit quisquam accusamus, repellat iure iusto esse laudantium dolorem voluptatum? Et
        voluptate ullam incidunt aperiam!
      </p>
      <div class="hero__btns">
        <ButtonEl class="btn--link btn--medium btn--gray btn--slide-black">
          <router-link to="/contact">Ask for quote</router-link>
        </ButtonEl>
        <ButtonEl class="btn--link btn--medium btn--gray btn--slide-black">
          <router-link to="/gallery"> Gallery </router-link>
        </ButtonEl>
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  @include section-single-col;
  min-height: 130vh;
  min-height: 130dvh;
  place-items: center;

  color: $color-gray-lighter;
  background-color: $color-black;

  //   background-image: url('/images/battle.webp');
  //   background-size: cover;
  //   background-repeat: no-repeat;
  //   background-position: center;

  position: relative;
  isolation: isolate;

  &::before {
    content: '';

    position: absolute;
    inset: 0;
    z-index: -1;
    opacity: 0.8;

    //     background-image: linear-gradient(
    //       135deg,
    //       hsl(0, 0%, 0%),
    //       hsl(0, 0%, 25%),
    //       hsl(0, 0%, 60%),
    //       transparent 96%
    //     );
  }

  .hero__description {
    @include description(2vw);
    margin-block: 0;

    .hero__heading,
    .hero__heading-fluff {
      color: $color-white;
      text-transform: capitalize;
    }

    .hero__heading-fluff {
      text-transform: capitalize;
    }

    .hero__heading {
      text-transform: uppercase;
    }

    .hero__heading-fluff {
      margin-bottom: 2.5vw;
    }

    .hero__btns {
      margin-top: 1.5rem;

      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 3vw;
    }
  }
}
</style>
