<script setup>
import ModalDelete from '../components/ModalDelete.vue'
import ButtonEl from '../template/ButtonEl.vue'
import GalleryDisplayEl from '../template/GalleryDisplayEl.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { useAdminStore } from '../stores/AdminStore'
import { storeToRefs } from 'pinia'

const adminStore = useAdminStore()
const { data, systemBtns, currentSystem, switchGallery } = storeToRefs(adminStore)
</script>

<template>
  <section class="container">
    <section class="btns" v-if="systemBtns.length > 1">
      <ButtonEl
        v-for="system in systemBtns"
        :key="system"
        class="btn--small btn--outline-black btn--slide-black"
        :class="currentSystem === system ? 'active' : ''"
        @click="adminStore.chooseSystem(system)"
      >
        {{ system }}
      </ButtonEl>
      <section v-if="data.length > 0">
        <FadeTransition>
          <div v-if="switchGallery">
            <GalleryDisplayEl :current-system="currentSystem" />
          </div>
          <div v-else>
            <GalleryDisplayEl :current-system="currentSystem" />
          </div>
        </FadeTransition>
      </section>
    </section>

    <ModalDelete />
  </section>
</template>

<style lang="scss" scoped>
.container {
  margin: $margin-admin;
}
.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 5vw;
}

.active {
  background-color: $color-black;
  color: $color-white;
}
</style>
