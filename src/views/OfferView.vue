<script setup>
import BannerEl from '../template/BannerEl.vue'
import OfferMobile from '../components/OfferMobile.vue'
import OfferDesktop from '../components/OfferDesktop.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { ref, onMounted } from 'vue'

function viewSwitchCheck() {
  if (window.innerWidth >= 1024) {
    viewSwitch.value = true
  } else {
    viewSwitch.value = false
  }
}

const viewSwitch = ref()

window.addEventListener('resize', () => {
  viewSwitchCheck()
})

onMounted(() => {
  viewSwitchCheck()
})
</script>

<template>
  <main>
    <BannerEl />
    <section class="description">
      <h3>
        Across our four painting levels, we offer a minimum quality that is above the industry
        standard.
      </h3>
      <p>
        We pride ourselves on being the go-to studio for the client that wants their army to stand
        out, with no expense spared during the process no matter how big or small. This is why you
        will find that even our most cost effective tier has a level of attention to detail that you
        will not find at any other studio.
      </p>
    </section>
    <FadeTransition>
      <OfferDesktop v-if="viewSwitch" />
      <OfferMobile v-else />
    </FadeTransition>
  </main>
</template>

<style lang="scss" scoped>
main {
  @include container;

  .description {
    @include description($gap: 1vw, $width: 70ch);
    margin-bottom: 5vw;
  }
}
</style>
