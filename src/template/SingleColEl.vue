<script setup>
import { gsap } from 'gsap'
import SplitType from 'split-type'
import { ref, onMounted } from 'vue'

defineProps(['description'])

const textCharRef = ref()
const fluffCharRef = ref()
const headingCharRef = ref()

const splitText = ref(null)
const splitHeading = ref(null)
const splitFluff = ref(null)

const options = { rootMargin: ' 0px 0px -200px 0px' }
const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
            if (entry.isIntersecting) {
                  const tl = gsap.timeline()
                  const section = entry.target
                  const textWords = section.querySelectorAll('.text-char .char')
                  const headingWords = section.querySelectorAll('.single-col__heading .char')
                  const fluffWords = section.querySelectorAll('.single-col__fluff .char')
                  const underline = section.querySelectorAll('.underline')
                  const button = section.querySelector('.btn')

                  console.log(fluffWords)
                  tl.fromTo(
                        headingWords,

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

                        .fromTo(
                              fluffWords,
                              {
                                    opacity: 0
                              },
                              {
                                    duration: 0.5,
                                    stagger: 0.03,
                                    opacity: 1
                              },
                              'fluff',
                              'heading<'
                        )
                        .fromTo(
                              textWords,
                              {
                                    opacity: 0
                              },

                              {
                                    opacity: 1,
                                    duration: 1,
                                    stagger: 0.007
                              },
                              'fluff<'
                        )
                        .fromTo(
                              button,
                              {
                                    opacity: 0,
                                    y: 20
                              },

                              {
                                    duration: 0.5,
                                    opacity: 1,
                                    y: 0
                              },
                              '-=1'
                        )
                        .to(underline, {
                              duration: 1,
                              opacity: 1,
                              y: 0
                        })

                  observer.unobserve(section)
            }
      })
}

onMounted(() => {
      splitText.value = new SplitType(`#${textCharRef.value.id}`, { types: 'lines, words, chars' })
      splitHeading.value = new SplitType(`#${headingCharRef.value.id}`, {
            types: 'lines, words, chars'
      })
      splitFluff.value = new SplitType(`#${fluffCharRef.value.id}`, {
            types: 'lines, words, chars'
      })

      const sections = document.querySelectorAll('.single-col__description')

      sections.forEach((el) => {
            textObserver.observe(el)
      })
})
const textObserver = new IntersectionObserver(handleIntersection, options)
</script>

<template>
      <section class="single-col__description">
            <h2 class="single-col__heading" ref="headingCharRef" id="heading-char">
                  {{ description.heading }}
                  <div class="underline"></div>
            </h2>
            <h3 class="single-col__fluff" ref="fluffCharRef" id="fluff-char">
                  {{ description.fluff }}
            </h3>
            <article class="section__text">
                  <div class="mask">
                        <p class="text-char" id="text-char" ref="textCharRef">
                              {{ description.text }}
                        </p>
                  </div>
            </article>

            <slot name="button"></slot>
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
      }
      .underline {
            position: absolute;
            inset: 0;
            opacity: 0;
            transform: translateY(20px);

            &::before {
                  content: '';
                  background-color: $color-purple;

                  position: absolute;
                  bottom: -8px;
                  left: 50%;
                  width: min(30%, 80px);
                  height: 3px;

                  transform: translateX(-50%);
            }
      }

      .mask {
            @include mask;
      }

      .fluff-char,
      .heading-char {
            @include char;
            opacity: 0;
      }

      .text-char {
            font-kerning: none;
      }

      .single-col__fluff {
            @include breakpoint {
                  margin-bottom: 1.5vw;
                  white-space: pre-wrap;
            }
      }

      .section__text {
            margin-block: 2rem;
            white-space: pre-wrap;
      }
}

.single-col--alt {
      background-color: $color-gray-lighter;
      display: grid;
}
</style>
