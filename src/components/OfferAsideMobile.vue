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
    <header class="aside__header" :class="isUnwrapped ? 'active' : ''" @click="unwrapContent">
      <h3 class="aside__header-heading">
        <slot name="section"></slot>
      </h3>
      <FadeScaleIconTransition>
        <svg
          v-if="isUnwrapped"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g transform="rotate(270 12 12)">
            <g fill="#666">
              <path
                d="m14.829 14.828l1.414-1.414L12 9.172l-4.243 4.242l1.415 1.415L12 12l2.829 2.828Z"
              />
              <path
                fill-rule="evenodd"
                d="M1 19a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v14Zm4 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z"
                clip-rule="evenodd"
              />
            </g>
          </g>
        </svg>

        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="#666">
            <path
              d="m7.757 10.586l1.415-1.414L12 12l2.828-2.828l1.415 1.414L12 14.828l-4.243-4.242Z"
            />
            <path
              fill-rule="evenodd"
              d="M1 5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V5Zm4-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
              clip-rule="evenodd"
            />
          </g>
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
    g {
      fill: $color-black;
    }
  }
}
</style>
