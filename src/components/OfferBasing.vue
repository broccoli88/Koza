<script setup>
import pricesData from '../data/prices.json'
import { ref } from 'vue'

const lvls = ref(pricesData.levels)
const prices = ref(pricesData.basing)
const sizes = ref(pricesData.sizes)
</script>

<template>
      <section class="offer-basing">
            <p>
                  We believe that a miniature without its decorated base is an incomplete miniature,
                  so we offer the following catalog of levels, examples and possible scenarios with
                  which to conceptualize an ideal environment for your miniatures.
            </p>

            <article class="aside__description">
                  <article class="aside__description-price-list">
                        <section class="price-list__lvl-tags">
                              <p v-for="lvl in lvls" :key="lvl" class="price-list__lvl-tag">
                                    {{ lvl.title }}
                              </p>
                        </section>
                        <section class="price-list__size-tags">
                              <p v-for="size in sizes" :key="size" class="price-list__size-tag">
                                    {{ size }}
                              </p>
                        </section>
                        <section class="price-list__price-tags">
                              <section class="price-list__price-tags-size">
                                    <p
                                          v-for="price in prices.smallBase"
                                          :key="price"
                                          class="price-list__price-tag"
                                    >
                                          {{ price }}&euro;
                                    </p>
                              </section>
                              <section class="price-list__price-tags-size">
                                    <p
                                          v-for="price in prices.mediumBase"
                                          :key="price"
                                          class="price-list__price-tag"
                                    >
                                          {{ price }}&euro;
                                    </p>
                              </section>
                              <section class="price-list__price-tags-size">
                                    <p
                                          v-for="price in prices.larageBase"
                                          :key="price"
                                          class="price-list__price-tag"
                                    >
                                          {{ price }}&euro;
                                    </p>
                              </section>
                              <section class="price-list__price-tags-size">
                                    <p
                                          v-for="price in prices.hugeBase"
                                          :key="price"
                                          class="price-list__price-tag"
                                    >
                                          {{ price }}&euro;
                                    </p>
                              </section>
                        </section>
                  </article>
            </article>
      </section>
</template>

<style lang="scss" scoped>
.aside__description {
      text-transform: none;

      .aside__description-levels {
            display: grid;
            gap: 2rem;
      }

      .aside__description-price-list {
            display: grid;
            grid-template-areas:
                  'size  lvl lvl lvl'
                  'size price price price'
                  'size price price price'
                  'size price price price'
                  'size price price price';

            margin-top: 3rem;

            .price-list__price-tags,
            .price-list__lvl-tags,
            .price-list__size-tags {
                  display: grid;
                  grid-auto-rows: 5rem;
                  align-items: center;
                  font-weight: 600;
                  color: $color-black;
            }

            // Lvl tags

            .price-list__lvl-tags {
                  grid-area: lvl;
                  grid-auto-flow: column;
                  text-align: center;
            }

            // Size tags

            .price-list__size-tags {
                  grid-area: size;
                  grid-template-areas:
                        '.'
                        'tag-1'
                        'tag-2'
                        'tag-3'
                        'tag-4';
                  @for $i from 1 through 4 {
                        .price-list__size-tag:nth-child(#{$i}) {
                              grid-area: tag-#{$i};
                        }
                  }
            }

            // Price tags

            .price-list__price-tags {
                  grid-area: price;

                  .price-list__price-tags-size {
                        display: grid;
                        grid-auto-flow: column;
                        text-align: center;
                  }
            }
      }
}
</style>
