<script setup>
// import ButtonEl from '../template/ButtonEl.vue'
import { gsap } from 'gsap'
import SplitType from 'split-type'
import { onMounted } from 'vue'

onMounted(() => {
      const textSplit = new SplitType(`#text-hero`, {
            types: 'lines, words, chars'
      })
      const fluffSplit = new SplitType(`#fluff-hero`, {
            types: 'lines, words, chars'
      })
      const headingSplit = new SplitType(`#heading-hero`, {
            types: 'lines, words, chars'
      })
      const tl = gsap.timeline()

      tl.from(headingSplit.chars, {
            delay: 0.3,
            stagger: 0.03,
            opacity: 0
      })
            .from(
                  fluffSplit.chars,
                  {
                        stagger: 0.02,
                        opacity: 0
                  },
                  '<-=0.1'
            )
            .from(
                  textSplit.chars,
                  {
                        stagger: 0.007,
                        opacity: -10
                  },
                  '-=0.8'
            )
            .from('#underline-hero', {
                  duration: 0.5,
                  opacity: 0,
                  y: 50,
                  zIndex: -1
            })
})
</script>

<template>
      <section class="hero">
            <article class="hero__description">
                  <div class="hero__content">
                        <h1 @enter="onEnter" class="hero__heading" id="heading-hero">
                              homey goat
                              <div class="underline" id="underline-hero"></div>
                        </h1>

                        <h3 class="hero__heading-fluff" id="fluff-hero">
                              Professional Miniature Painting Studio
                        </h3>
                        <p id="text-hero">
                              Welcome to Homey Goat Studio! We are here to help turn your creative
                              ideas for wargaming miniatures into reality through unrivalled
                              service, excellent communication and dedication to your project.
                        </p>
                        <!-- <div class="hero__btns">
                              <ButtonEl class="btn--link btn--medium btn--gray btn--slide-black">
                                    <router-link to="/contact">Ask for quote</router-link>
                              </ButtonEl>
                              <ButtonEl class="btn--link btn--medium btn--purple btn--slide-black">
                                    <router-link to="/gallery"> Gallery </router-link>
                              </ButtonEl>
                        </div> -->
                  </div>
            </article>
            <div class="hero__bg">
                  <div class="bg-img bg-img-1"></div>
                  <div class="bg-img bg-img-2"></div>
                  <div class="bg-img bg-img-3"></div>
            </div>
      </section>
</template>

<style lang="scss" scoped>
.hero {
      @include section-single-col;
      min-height: 100vh;
      min-height: 100dvh;

      color: $color-gray-lighter;
      background-color: $color-black;

      position: relative;
      isolation: isolate;
      overflow: hidden;

      @include breakpoint {
            place-items: left;
      }

      .hero__bg {
            position: absolute;
            top: 0;
            right: 0;
            z-index: -1;
            width: 100vw;
            height: 100vh;
            // overflow-x: hidden;

            display: grid;
            grid-auto-flow: column;

            // display: flex;
            .bg-img {
                  width: 120%;
                  height: 100%;
                  background-repeat: no-repeat;
                  background-size: cover;

                  filter: grayscale(1) opacity(0.3);
                  clip-path: polygon(0 0, 75% 0, 100% 100%, 25% 100%);
            }

            .bg-img-1 {
                  background-image: url('../images/main/th-clean.webp');
                  background-position: top 20% left 30%;
            }

            .bg-img-2 {
                  background-image: url('../images/main/skull-clean.webp');
                  background-position: center;
                  margin-left: -5%;
            }

            .bg-img-3 {
                  background-image: url('../images/main/Yoroi-clean.webp');
                  background-position: center left 33%;
                  margin-left: -10%;
            }

            @include breakpoint {
                  width: 50%;

                  right: 0;
                  .bg-img {
                        // background-position: center;
                        background-size: cover;
                        filter: grayscale(1) opacity(0.5);
                        // filter: none;
                  }

                  .bg-img-1 {
                        background-position: center left 30%;
                  }
            }
      }

      .hero__description {
            margin-block: auto;
            padding-inline: 1.5rem;
            text-align: center;

            .hero__heading {
                  color: $color-white;
                  margin-bottom: 1rem;
                  position: relative;

                  .underline {
                        position: absolute;
                        inset: 0;
                        // opacity: 0;

                        &::before {
                              content: '';
                              background-color: $color-purple;

                              position: absolute;
                              bottom: 0;
                              left: 50%;
                              width: min(30%, 150px);
                              height: clamp(3px, 0.5vw, 5px);

                              transform: translateX(-50%);
                        }
                  }
            }

            .hero__heading-fluff {
                  color: $color-white;
                  margin-bottom: 3rem;
                  margin-top: 1rem;
            }

            .hero__btns {
                  margin-top: 1.5rem;

                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  gap: 3vw;
            }

            @include breakpoint() {
                  .hero__content {
                        display: grid;
                        width: min(60ch, 60%);
                        text-align: center;

                        .hero__heading {
                              margin-bottom: 1rem;
                        }

                        .hero__heading-fluff {
                              margin-bottom: 3rem;
                        }
                  }
            }

            @include breakpoint(1640px) {
                  margin-left: 10%;
            }
      }
}
</style>
