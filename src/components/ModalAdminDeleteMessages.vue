<script setup>
import ModalEl from '../template/ModalEl.vue'
import ButtonEl from '../template/ButtonEl.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { useContactStore } from '../stores/ContactStore'
import { storeToRefs } from 'pinia'

const contactStore = useContactStore()
const { showDeleteMessageModal } = storeToRefs(contactStore)
</script>

<template>
  <Teleport to="#admin-messages-modal">
    <FadeTransition>
      <div class="modal-container" v-if="showDeleteMessageModal">
        <ModalEl>
          <template v-slot:heading>
            <h2>Delete Message?</h2>
          </template>
          <template v-slot:description>
            <p>Are you sure you want to delete this message?</p>
          </template>
          <template v-slot:button>
            <div class="btns">
              <ButtonEl
                @click="contactStore.deleteMessage()"
                class="btn--small btn--outline-black btn--slide-black"
                >Delete</ButtonEl
              >
              <ButtonEl
                @click="contactStore.closeDeleteMessageModal"
                class="btn--small btn--outline-black btn--slide-black"
                >Cancel</ButtonEl
              >
            </div>
          </template>
        </ModalEl>
      </div>
    </FadeTransition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-container {
  @include modal-container;
}
.btns {
  display: flex;
  gap: 1.5rem;
  margin-inline: auto;
}
</style>
