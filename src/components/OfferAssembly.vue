<script setup>
import pricesData from '../data/prices.json'
import { ref } from 'vue'

const sizes = ref(pricesData.sizes)
const prices = ref(pricesData.assembling)
</script>

<template>
      <section class="offer-assembly">
            <p class="assembly__text">
                  Assembling price includes: cutting, cleaning, drilling gun barrels and exhausts,
                  gluing. We also offer magnetization and LED lights installation. Prices in
                  assembly pricelist are applicable when it's assembly + painting of a model.
            </p>

            <div class="assembly__prices">
                  <article class="assembly__sizes">
                        <section v-for="size in sizes" :key="size">
                              <p>{{ size }}</p>
                        </section>
                  </article>
                  <article class="assembly__price">
                        <section v-for="price in prices" :key="price">
                              <p>{{ price }}&euro;</p>
                        </section>
                  </article>
            </div>
      </section>
</template>

<style lang="scss" scoped>
.offer-assembly {
      display: grid;
      gap: 2rem;

      .assembly__prices {
            display: grid;
            grid-template-columns: auto 1fr;
            font-weight: 600;
            color: $color-black;
      }

      .assembly__sizes,
      .assembly__price {
            display: grid;
            grid-auto-rows: 5rem;
            align-items: center;
            font-weight: 600;
            color: $color-black;
      }

      .assembly__sizes {
            margin-right: 3rem;
      }
}
</style>
