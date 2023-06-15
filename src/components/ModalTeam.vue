<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { ref } from 'vue'
import { useMemberStore } from '../stores/MemberStore'
import { storeToRefs } from 'pinia'
import ModalEl from '../template/ModalEl.vue'

const memberStore = useMemberStore()
const { member, showModal } = storeToRefs(memberStore)
const bio = ref()
</script>

<template>
  <Teleport to="#bio-modal">
    <FadeTransition>
      <section class="modal-container" ref="bio" v-if="showModal">
        <ModalEl>
          <template v-slot:heading>
            <h2>{{ member.name }}</h2>
          </template>
          <template v-slot:description>
            <section class="modal__bio">
              <h3>{{ member.role }}</h3>
              <p>
                {{ member.bio }}
              </p>
            </section>
          </template>
          <template v-slot:button>
            <ButtonEl
              @click="memberStore.toggleModal"
              class="btn__bio btn--small btn--outline-black btn--slide-black"
            >
              Close
            </ButtonEl>
          </template>
        </ModalEl>
      </section>
    </FadeTransition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-container {
  @include modal-container;

  .modal {
    width: min(80rem, 85vw);

    .modal__bio {
      text-align: left;

      h3 {
        margin-bottom: 1rem;
      }
    }

    .btn__bio {
      margin-left: auto;
    }
  }
}
</style>
