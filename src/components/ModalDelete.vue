<script setup>
import ModalEl from '../template/ModalEl.vue'
import ButtonEl from '../template/ButtonEl.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { useAdminGalleryStore } from '../stores/AdminGalleryStore'
import { storeToRefs } from 'pinia'

const adminGalleryStore = useAdminGalleryStore()
const { showDeleteModal } = storeToRefs(adminGalleryStore)
</script>

<template>
  <Teleport to="#admin-manage-delete-modal">
    <FadeTransition>
      <div class="modal-container" v-if="showDeleteModal">
        <ModalEl>
          <template v-slot:heading>
            <h2>Delete Item?</h2>
          </template>
          <template v-slot:description>
            <p>Are you sure you want to delete this item?</p>
          </template>
          <template v-slot:button>
            <div class="btns">
              <ButtonEl
                @click="adminGalleryStore.submitDelete"
                class="btn--small btn--outline-black btn--slide-black"
                >Delete</ButtonEl
              >
              <ButtonEl
                @click="adminGalleryStore.closeDeleteModal"
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
