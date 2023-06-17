<script setup>
import linksData from '../data/links.json'
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const data = reactive(linksData.links)
const currentBanner = computed(() => {
      return Object.values(data).find((item) => item.path === route.fullPath)
})
</script>

<template>
      <section role="banner" class="banner" ref="banner">
            <h3 class="banner__fluff">homey goat</h3>
            <h1 class="banner__heading">{{ currentBanner.name }}</h1>
            <section class="banner__picture">
                  <div class="banner__background"></div>
                  <img :src="currentBanner.img" alt="" class="banner__img" />
            </section>
      </section>
</template>

<style lang="scss" scoped>
.banner {
      display: grid;
      text-align: center;
      margin-top: clamp(10rem, 5rem + 15vw, 18rem);
      margin-bottom: 4rem;

      .banner__fluff {
            font-weight: 600;
            text-transform: uppercase;
            font-size: clamp(1.4rem, 0.5rem + 1.2vw, 2rem);
      }

      .banner__heading {
            font-size: clamp(3.5rem, 1rem + 5vw, 6.5rem);
            @include heading-underline-purple;
            margin-bottom: 2.5rem;

            @include breakpoint {
                  margin-bottom: 3vw;
            }
      }
      .banner__picture {
            height: clamp(15rem, 5rem + 25vw, 50rem);
            display: grid;
            align-items: center;
            justify-items: center;

            position: relative;

            .banner__background {
                  background-size: cover;
                  background-repeat: no-repeat;
                  background-position: center;
                  background-image: url('/images/gray-concrete-wall.jpg');
                  background-image: url('/images/bga.jpg');
                  background-image: url('/images/bg.jpg');
                  width: 100%;
                  height: 70%;
            }

            .banner__img {
                  height: 110%;
                  object-fit: cover;

                  position: absolute;
                  left: 50%;
                  transform: translateX(-50%);
            }
      }
}
</style>
