<script setup>
import { gsap } from 'gsap'
import SplitType from 'split-type'
import { onMounted } from 'vue'

defineProps(['description'])

const options = { rootMargin: ' 0px 0px -200px 0px' }
const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
            if (entry.isIntersecting) {
                  const tl = gsap.timeline()
                  const section = entry.target
                  const heading = section.querySelector('.single-col__heading')
                  const fluff = section.querySelector('.single-col__fluff')
                  const text = section.querySelector('.section__text')
                  const button = section.querySelector('.section__btn')
                  const underline = section.querySelector('.heading-container .underline')

                  const headingSplit = new SplitType(heading, {
                        types: 'lines, words, chars'
                  })
                  const fluffSplit = new SplitType(fluff, {
                        types: 'lines, words, chars'
                  })
                  const textSplit = new SplitType(text, {
                        types: 'lines, words, chars'
                  })

                  tl.to(heading, {
                        duration: 0.1,
                        opacity: 1
                  })
                        .to(fluff, {
                              duration: 0.1,
                              opacity: 1
                        })
                        .from(headingSplit.chars, {
                              stagger: 0.03,
                              opacity: 0
                        })
                        .from(fluffSplit.chars, {
                              stagger: 0.02,
                              opacity: 0
                        })
                        .from(
                              textSplit.chars,
                              {
                                    stagger: 0.007,
                                    opacity: 0
                              },
                              '<-=0.2'
                        )
                        .to(button, {
                              duration: 0.4,
                              opacity: 1,
                              y: 0
                        })
                        .to(underline, {
                              duration: 0.4,
                              opacity: 1,
                              y: 0
                        })

                  observer.unobserve(section)
            }
      })
}

onMounted(() => {
      const sections = document.querySelectorAll('.single-col__description')

      sections.forEach((el) => {
            textObserver.observe(el)
      })
})
const textObserver = new IntersectionObserver(handleIntersection, options)
</script>

<template>
      <section class="single-col__description">
            <div class="heading-container">
                  <h2 class="single-col__heading" id="heading-char">
                        {{ description.heading }}
                  </h2>
                  <div class="underline" id="underline-section"></div>
            </div>

            <h3 class="single-col__fluff" id="fluff-char">
                  {{ description.fluff }}
            </h3>
            <article class="section__text">
                  <p class="text-char" id="text-char">
                        {{ description.text }}
                  </p>
            </article>

            <div class="section__btn">
                  <slot name="button"></slot>
            </div>
      </section>
</template>

<style lang="scss" scoped>
.single-col__description {
      @include description;
      padding-bottom: 4rem;
      margin-bottom: 0;

      .single-col__heading {
            white-space: pre-wrap;
            line-height: 1.1;
            position: relative;
            margin-bottom: 1rem;
            opacity: 0;
      }

      .heading-container {
            position: relative;
      }
      .underline {
            position: absolute;
            inset: 0;
            opacity: 0;

            transform: translateY(50px);

            &::before {
                  content: '';
                  background-color: $color-purple;

                  position: absolute;
                  bottom: 0;
                  left: 50%;
                  width: min(30%, 80px);
                  height: 3px;

                  transform: translateX(-50%);
            }
      }
      .section__btn {
            opacity: 0;
            transform: translateY(50px);
      }

      .single-col__fluff {
            margin-block: 2rem 3rem;
            opacity: 0;
      }

      .section__text {
            margin-block: 2rem;
      }
}

.single-col--alt {
      background-color: $color-gray-lighter;
      display: grid;
}
</style>
