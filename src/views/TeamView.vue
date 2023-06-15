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
      <h2>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, dicta omnis. Excepturi
        ad quam assumenda!
      </h2>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet veritatis similique aperiam
        provident magni odit delectus laborum aliquid, velit labore.
      </h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nisi itaque sint alias
        voluptatum nobis est nulla ea, inventore cum amet, beatae, ratione atque rem. Exercitationem
        ullam labore aperiam sint animi molestiae doloribus fuga magni deserunt voluptas quasi, quod
        vitae qui sequi, eius a perspiciatis sit nihil expedita nemo totam enim! Excepturi, vel
        nesciunt minima impedit cupiditate reiciendis facilis eos?
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
