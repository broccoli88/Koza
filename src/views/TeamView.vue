<script setup>
import BannerEl from '../template/BannerEl.vue'
import CardEl from '../template/CardEl.vue'
import ModalTeam from '../components/ModalTeam.vue'
import { useMemberStore } from '../stores/MemberStore'
import { storeToRefs } from 'pinia'

const memberStore = useMemberStore()
const { members } = storeToRefs(memberStore)
</script>

<template>
      <main>
            <BannerEl />
            <article class="description">
                  <h3>
                        Since 2013, Homey Goat has evolved from its origin in a small flat above a
                        chemist, to one of top commission miniature painting studio in the industry,
                        offering the highest standards consistently across the board.
                  </h3>
                  <p>
                        We are small independent painting service focused on smaller projects. This
                        ensures that we have more time for our customers, a fast turn around time
                        and can ​deliver high quality products. At Homey Goat Studio we ensure that
                        our prices allow beginner gamers, or those who don't necessarily have the
                        time to paint their army or hero can have high quality painted table-top
                        ready miniatures.
                  </p>
            </article>
            <section class="members">
                  <CardEl v-for="member in members" :key="member" :member="member" />
            </section>

            <ModalTeam />
      </main>
</template>

<style lang="scss" scoped>
main {
      @include container;

      .description {
            @include description($gap: 2rem, $width: 70ch);
            place-content: inherit;

            @include breakpoint {
                  gap: 2vw;
            }

            p {
                  margin-block: 1.5rem;
            }
      }

      .members {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(25rem, 100%), 1fr));
            margin-block: 3rem;
            padding: 1.5rem;
      }
}
</style>
