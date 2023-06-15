<script setup>
import ModalEl from '../template/ModalEl.vue'
import ButtonEl from '../template/ButtonEl.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { useAdminStore } from '../stores/AdminStore'

const adminStore = useAdminStore()
</script>

<template>
  <Teleport to="#admin-add-img-modal">
    <FadeTransition>
      <section class="modal-container" v-if="adminStore.showModal">
        <ModalEl class="contact-modal">
          <template v-slot:heading>
            <h2>Img Uploaded</h2>
          </template>
          <template v-slot:description>
            <p>Image uploaded successfuly. Stay tuned!</p>
          </template>
          <template v-slot:button>
            <ButtonEl
              @click="adminStore.closeModal"
              class="btn--small btn--outline-black btn--slide-black"
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
  background-color: transparent;
}
</style>
