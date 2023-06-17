<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import SplitType from 'split-type'

const props = defineProps(['imgLink', 'description'])
const img = ref(props.imgLink)

const options = { rootMargin: ' 0px 0px -200px 0px' }
const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
            if (entry.isIntersecting) {
                  const tl = gsap.timeline()
                  const section = entry.target
                  const heading = section.querySelector('.section__heading')
                  const text = section.querySelector('.section__text')
                  const button = section.querySelector('.section__btn')
                  const underline = section.querySelector('.heading-container .underline')

                  const headingSplit = new SplitType(heading, {
                        types: 'lines, words, chars'
                  })
                  const textSplit = new SplitType(text, {
                        types: 'lines, words, chars'
                  })

                  tl.to(heading, {
                        duration: 0.1,
                        opacity: 1
                  })
                  tl.to(text, {
                        duration: 0.1,
                        opacity: 1
                  })
                  tl.from(headingSplit.chars, {
                        stagger: 0.03,
                        opacity: 0
                  })
                  tl.from(
                        textSplit.chars,
                        {
                              stagger: 0.007,
                              opacity: 0
                        },
                        '<-=0.2'
                  )
                  tl.to(button, {
                        duration: 0.4,
                        opacity: 1,
                        y: 0
                  })
                  tl.to(underline, {
                        duration: 0.4,
                        opacity: 1,
                        y: 0
                  })

                  observer.unobserve(section)
            }
      })
}

onMounted(() => {
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
                  <div class="heading-container">
                        <h2 class="section__heading" id="heading-section">
                              {{ description.heading }}
                        </h2>
                        <div class="underline" id="underline-section"></div>
                  </div>

                  <article class="section__text">
                        <p class="text-char" id="text-section">
                              {{ description.text }}
                        </p>
                  </article>
                  <div class="section__btn">
                        <slot id="slot" name="button"></slot>
                  </div>
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
            // filter: grayscale(1);
      }

      .section__description {
            @include description(2vw);
            margin-bottom: 0;

            .heading-container {
                  position: relative;
            }
            .section__heading {
                  white-space: pre-wrap;
                  line-height: 1.1;
                  position: relative;
                  margin-bottom: 1rem;
                  opacity: 0;
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

            .section__text {
                  margin-block: 2rem;
                  opacity: 0;
            }

            .section__btn {
                  opacity: 0;
                  transform: translateY(50px);
            }
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
