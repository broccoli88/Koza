<script setup>
import { ref } from 'vue'
import FadeScaleIconTransition from '../utils/transitions/FadeScaleIconTransition.vue'

const isUnwrapped = ref(false)
const unwrapContent = () => {
      isUnwrapped.value = !isUnwrapped.value
}
</script>

<template>
      <section class="mobile-aside" :class="isUnwrapped ? 'shadow-bottom' : ''">
            <header
                  class="aside__header"
                  :class="isUnwrapped ? 'active' : ''"
                  @click="unwrapContent"
            >
                  <h3 class="aside__header-heading">
                        <slot name="section"></slot>
                  </h3>
                  <FadeScaleIconTransition>
                        <svg
                              class="open"
                              v-if="!isUnwrapped"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                        >
                              <g fill="none">
                                    <path
                                          fill="#666"
                                          d="M9 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"
                                    />
                                    <path
                                          stroke="#666"
                                          stroke-linecap="round"
                                          stroke-width="1.5"
                                          d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
                                    />
                              </g>
                        </svg>

                        <svg
                              class="close"
                              v-else
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                        >
                              <path
                                    fill="none"
                                    stroke="#666"
                                    stroke-linecap="round"
                                    stroke-width="1.5"
                                    d="m14.5 9.5l-5 5m0-5l5 5M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
                              />
                        </svg>
                  </FadeScaleIconTransition>
            </header>
            <section class="aside__content" :class="isUnwrapped ? 'unwrapped' : ''">
                  <div class="overflow">
                        <slot name="content"></slot>
                  </div>
            </section>
      </section>
</template>

<style lang="scss" scoped>
.mobile-aside {
      text-transform: uppercase;
      display: grid;
      position: relative;

      .aside__header {
            text-transform: uppercase;
            display: flex;
            justify-content: space-between;
            padding: 1em 0 0.6em;
            cursor: pointer;
            margin-bottom: 0rem;
            transition: $transition-04;
            position: relative;

            .aside__header-heading {
                  @include heading-underline-black;
            }

            g {
                  transition: $transition-04;
            }
      }
      .aside__content {
            display: grid;
            grid-template-rows: 0fr;
            transition: $transition-04;
            position: relative;
      }

      .overflow {
            overflow: hidden;
            text-transform: none;
      }

      .unwrapped {
            grid-template-rows: 1fr;
            margin-bottom: 2rem;
      }

      .active {
            margin-bottom: 3rem;

            .aside__header-heading {
                  color: $color-black;

                  &::before {
                        left: 50%;
                        transform: translateX(-50%);
                        opacity: 1;
                  }
            }

            path {
                  stroke: $color-black;
            }
      }
}
</style>
