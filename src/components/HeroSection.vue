<script setup>
// import ButtonEl from '../template/ButtonEl.vue'
import { gsap } from 'gsap'
import SplitType from 'split-type'
import { ref, onMounted } from 'vue'

const textCharRef = ref()
const fluffCharRef = ref()
const headingCharRef = ref()

function onLoadAnimation() {
      const splitText = new SplitType(`#${textCharRef.value.id}`, { types: 'lines, words, chars' })
      const splitHeading = new SplitType(`#${headingCharRef.value.id}`, {
            types: 'lines, words, chars'
      })
      const splitFluff = new SplitType(`#${fluffCharRef.value.id}`, {
            types: 'lines, words, chars'
      })

      const tl = gsap.timeline()
      const textWords = document.querySelectorAll('.text-char .char')
      const headingWords = document.querySelectorAll('.hero__heading .char')
      const fluffWords = document.querySelectorAll('.hero__heading-fluff .char')
      const underline = document.querySelectorAll('.underline')

      // headingWords.forEach((word) => {
      //       word.style.opacity = '0'
      // })
      // fluffWords.forEach((word) => {
      //       word.style.opacity = '0'
      // })
      // textWords.forEach((word) => {
      //       word.style.opacity = '0'
      // })

      tl.fromTo(
            splitHeading.chars,

            {
                  opacity: 0
            },
            {
                  duration: 0.5,
                  stagger: 0.03,
                  opacity: 1
            },
            'heading'
      )
}

onMounted(() => {
      setTimeout(onLoadAnimation, 1000)
      
})
</script>

<template>
      <section class="hero">
            <article class="hero__description">
                  <div class="hero__content">
                        <p class="hero__heading" ref="headingCharRef" id="heading-char">
                              homey goat
                              <div class="underline"></div>
                        </p>
                        <h3 class="hero__heading-fluff" id="fluff-char" ref="fluffCharRef">
                              professional miniature painting studio
                        </h3>
                        <p class="text-char" id="text-char" ref="textCharRef">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nihil
                              cumque sit porro quae dolore autem sapiente molestias repellendus ad,
                              fugit quisquam suscipit optio inventore!
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
                  background-image: url('../images/th-clean.webp');
                  background-position: top 20% left 30%;
            }

            .bg-img-2 {
                  background-image: url('../images/skull-clean.webp');
                  background-position: center;
                  margin-left: -5%;
            }

            .bg-img-3 {
                  background-image: url('../images/HB-clean.webp');
                  background-position: center;
                  margin-left: -10%;
            }

            @include breakpoint {
                  width: 50%;

                  right: 0;
                  .bg-img {
                        background-position: center;
                        background-size: cover;
                        filter: grayscale(1) opacity(0.5);
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
                  text-transform: uppercase;
                  margin-bottom: 1rem;
                  position: relative;

                  .char {
                        opacity: 0;
                  }
                  .underline {
                        position: absolute;
                        inset: 0;
                        opacity: 1;
                        transform: translateY(20px);

                        &::before {
                              content: '';
                              background-color: $color-purple;

                              position: absolute;
                              bottom: 25%;
                              left: 50%;
                              width: min(30%, 150px);
                              height: clamp(3px, 0.5vw, 5px);

                              transform: translateX(-50%);
                        }
                  }
            }

            .hero__heading-fluff {
                  text-transform: capitalize;
                  color: $color-white;
                  margin-bottom: 3rem;
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
