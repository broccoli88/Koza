<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import SplitType from 'split-type'

const props = defineProps(['imgLink', 'description'])
const img = ref(props.imgLink)

const textCharRef = ref(null)
const headingCharRef = ref(null)

const splitText = ref(null)
const splitHeading = ref(null)

const options = { rootMargin: ' 0px 0px -200px 0px' }
const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
            if (entry.isIntersecting) {
                  const tl = gsap.timeline()
                  const section = entry.target
                  const textWords = section.querySelectorAll('.text-char .char')
                  const headingWords = section.querySelectorAll('.section__heading .char')
                  const underline = section.querySelectorAll('.underline')
                  const button = section.querySelector('.btn')

                  tl.fromTo(
                        headingWords,
                        {
                              opacity: 0
                        },
                        {
                              duration: 1,
                              stagger: 0.03,
                              opacity: 1
                        },
                        'heading'
                  )

                        .fromTo(
                              textWords,
                              {
                                    opacity: 0
                              },

                              {
                                    opacity: 1,
                                    duration: 1,
                                    stagger: 0.004
                              },
                              'heading-=0.1'
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
                              duration: 0.5,
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
      const sections = document.querySelectorAll('.section')

      sections.forEach((el) => {
            textObserver.observe(el)
      })
})
const textObserver = new IntersectionObserver(handleIntersection, options)
</script>

<template>
      <section class="section">
            <img class="section__img" :data-src="img" :src="img" alt="" />
            <article class="section__description">
                  <h2 class="section__heading" ref="headingCharRef" id="heading-char">
                        {{ description.heading }}
                        <div class="underline"></div>
                  </h2>

                  <article class="section__text">
                        <div class="mask">
                              <p class="text-char" id="text-char" ref="textCharRef">
                                    {{ description.text }}
                              </p>
                        </div>
                  </article>
                  <slot name="button"></slot>
            </article>
      </section>
</template>

<style lang="scss" scoped>
.section {
      @include section-double-col;
      grid-template-rows: 350px 1fr;
      padding-bottom: 4rem;

      .section__img {
            @include img;
            filter: grayscale(1);
      }

      .section__description {
            @include description(2vw);
            margin-bottom: 0;

            .section__heading {
                  white-space: pre-wrap;
                  line-height: 1.1;
                  position: relative;
                  margin-bottom: 1rem;
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

            .heading-char {
                  @include char;
            }

            .text-char {
                  font-kerning: none;
            }
      }

      .section__text {
            margin-block: 2rem;
            white-space: pre-wrap;
      }
}
.reverse {
      background-color: $color-gray-lighter;
      @include breakpoint {
            grid-template-columns: 35% 1fr;
      }

      .section__img {
            @include breakpoint {
                  order: 2;
            }
      }

      .section__description {
            @include breakpoint {
                  order: 1;
            }
      }
}
</style>
