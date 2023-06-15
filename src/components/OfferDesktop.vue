<script setup>
import { reactive, ref } from 'vue'
import Painting from './OfferPainting.vue'
import Assembly from './OfferAssembly.vue'
import Basing from './OfferBasing.vue'
import Cleaning from './OfferCleaning.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'

const sections = reactive({
  painting: {
    title: 'Painting',
    active: true
  },
  assembly: {
    title: 'Assembly',
    active: false
  },
  basing: {
    title: 'Basing',
    active: false
  },
  cleaning: {
    title: 'Cleaning',
    active: false
  }
})

const currentTab = ref('Painting')
const tabs = {
  Assembly,
  Basing,
  Cleaning,
  Painting
}

const changeSection = (section) => {
  Object.values(sections).forEach((s) => {
    if (s.title === section) {
      currentTab.value = s.title
      s.active = true
    } else s.active = false
  })
}
</script>

<template>
  <section class="desktop-offer">
    <ul class="desktop-offer__section">
      <li
        v-for="section in sections"
        :key="section.title"
        class="desktop-offer__section-item"
        :class="{ active: section.active }"
        @click="changeSection(section.title)"
      >
        <h3 class="desktop-offer__section-item-title">
          {{ section.title }}
        </h3>
      </li>
    </ul>
    <article class="desktop-offer__section-description">
      <FadeTransition>
        <component :is="tabs[currentTab]" />
      </FadeTransition>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.desktop-offer {
  @include container;
  margin-bottom: 5vw;

  display: grid;
  grid-template-areas: 'aside desc desc desc';

  .desktop-offer__section {
    grid-area: aside;

    .desktop-offer__section-item {
      text-transform: uppercase;
      padding: 0.7em 0 0.4em;
      cursor: pointer;

      .desktop-offer__section-item-title {
        @include heading-underline-black;
        margin-left: 2rem;
        width: fit-content;
      }
    }

    .active {
      .desktop-offer__section-item-title {
        color: $color-black;

        &::before {
          left: 10%;
          //   transform: translateX(-50%);
          opacity: 1;
        }
      }
    }
  }

  .desktop-offer__section-description {
    grid-area: desc;
    width: 100%;
    max-width: 70ch;
    padding-inline: 3rem;

    .desktop-offer__section-description-heading {
      margin-bottom: 3rem;
    }
  }
}
</style>
