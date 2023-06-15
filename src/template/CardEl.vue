<script setup>
import ButtonEl from './ButtonEl.vue'
import { useMemberStore } from '../stores/MemberStore'
import { ref } from 'vue'

const props = defineProps({
  member: {
    name: String,
    role: String,
    bio: String,
    img: String
  }
})

const currentMember = ref(props.member)
const memberStore = useMemberStore()

const openModal = () => {
  memberStore.member = currentMember.value
  memberStore.toggleModal()
}
</script>

<template>
  <section class="card">
    <img class="card__img" :src="currentMember.img" alt="" />
    <section class="card__mini" tabindex="0">
      <article class="card__mini-description">
        <h3 class="card__mini-person">{{ currentMember.name }}</h3>
        <p class="card__mini-occupation">{{ currentMember.role }}</p>
      </article>
      <ButtonEl
        @click="openModal"
        class="card__mini-btn btn--small btn--outline-white btn--slide-white"
        >Read bio
      </ButtonEl>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.card {
  //   width: min(35rem, 100%);
  display: grid;
  position: relative;

  .card__img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;

    filter: grayscale(100%);
  }

  .card__mini {
    position: absolute;
    inset: 0;
    z-index: 1;

    display: grid;
    grid-auto-flow: column;
    align-content: end;

    padding: 1.5rem;
    background-color: hsl(0, 0%, 0%, 0.7);
    opacity: 0;

    cursor: pointer;
    transition: $transition-04;

    &:hover,
    &:focus {
      opacity: 1;
      outline: none;
    }

    &:has(.card__mini-btn:focus) {
      opacity: 1;
    }
    .card__mini-occupation,
    .card__mini-description {
      .card__mini-person {
        color: $color-white;
      }
    }

    .card__mini-btn {
      margin-left: auto;
    }
  }
}
</style>
