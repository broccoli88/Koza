<script setup>
import { useGalleryStore } from '../stores/GalleryStore'
import { useAdminGalleryStore } from '../stores/AdminGalleryStore'
import useImageObserver from '../utils/modules/useImageObserver'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

const props = defineProps(['model', 'set'])
const emits = defineEmits(['delete', 'rename', 'update-image'])

const galleryStore = useGalleryStore()
const { currentModel, currentFraction } = storeToRefs(galleryStore)

const adminGalleryStore = useAdminGalleryStore()
const { isInAdminPanel } = storeToRefs(adminGalleryStore)

const openModal = () => {
  currentModel.value = props.model
  currentFraction.value = props.set

  galleryStore.toggleModal()
}

// Intersection Observer

const imgRef = ref(null)
const imageObserver = useImageObserver.observeImages()

onMounted(() => {
  imageObserver.observe(imgRef.value)
})

const emitDelete = () => {
  emits('delete')
}
</script>

<template>
  <section class="miniature">
    <section class="miniature__tile">
      <img class="miniature__img" :data-src="model" alt="" ref="imgRef" />
      <div class="miniature__magnify" @click="openModal" tabindex="0" v-if="!isInAdminPanel">
        <img class="miniature__magnify-img" src="/svg/eye.svg" alt="" />
      </div>
      <div v-else class="admin-options">
        <svg
          @click="emitDelete"
          class="delete-icon"
          height="100%"
          stroke-miterlimit="10"
          style="
            fill-rule: nonzero;
            clip-rule: evenodd;
            stroke-linecap: round;
            stroke-linejoin: round;
          "
          version="1.1"
          viewBox="0 0 22 22"
          width="100%"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs />
          <g id="Untitled">
            <path
              d="M21 11C21 15.714 21 18.071 19.535 19.535C18.072 21 15.714 21 11 21C6.286 21 3.929 21 2.464 19.535C1 18.072 1 15.714 1 11C1 6.286 1 3.929 2.464 2.464C3.93 1 6.286 1 11 1C15.714 1 18.071 1 19.535 2.464C20.509 3.438 20.835 4.807 20.945 7"
              fill="none"
              opacity="1"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="miter"
              stroke-width="1.5"
            />
            <path
              d="M11.3364 17.0614L6.47112 17.0614C5.77964 17.0614 5.22521 16.5069 5.22521 15.8154L5.22521 5.84816C5.22521 5.16007 5.78302 4.60225 6.47112 4.60225L11.4548 4.60225L15.1925 8.33998L15.1925 11.5108C14.9869 11.4797 14.7813 11.4548 14.5695 11.4548C14.3577 11.4548 14.1522 11.4797 13.9466 11.5108L13.9466 8.96294L10.8318 8.96294L10.8318 5.84816L6.47112 5.84816L6.47112 15.8154L10.8879 15.8154C10.9626 16.264 11.1184 16.6813 11.3364 17.0614M16.7748 16.5132L15.4479 15.1925L16.7748 13.8718L15.8902 12.9935L14.5695 14.3141L13.2489 12.9935L12.3705 13.8718L13.6912 15.1925L12.3705 16.5132L13.2489 17.3977L14.5695 16.0709L15.8902 17.3977C15.8902 17.3977 16.7748 16.5132 16.7748 16.5132Z"
              fill="#000000"
              fill-rule="nonzero"
              opacity="1"
              stroke="none"
            />
          </g>
        </svg>
      </div>
    </section>
    <section class="miniature__description">
      <slot></slot>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.miniature {
  position: relative;
}

.miniature__tile {
  color: $color-white;
  font-size: 1.5rem;

  position: relative;
  cursor: pointer;

  &:hover .miniature__magnify,
  &:focus .miniature__magnify,
  &:hover .admin-options,
  &:focus .admin-options {
    opacity: 1;
  }

  &:hover .admin-options,
  &:focus .admin-options {
    svg {
      width: clamp(2rem, 1rem + 1.4vw, 2.6rem);
    }
  }

  .miniature__img {
    width: 100%;
    object-fit: cover;
    vertical-align: middle;
    box-shadow: $box-shadow-5;
    border-radius: 7px;
  }

  .miniature__magnify {
    background-color: hsl(0, 0%, 0%, 0.8);
    border-radius: 7px;

    display: grid;
    justify-content: center;
    align-items: center;

    position: absolute;
    inset: 0;
    z-index: 1;

    transition: $transition-03;
  }

  .miniature__magnify {
    opacity: 0;

    &:active .miniature__magnify-img {
      opacity: 0.7;
      scale: 0.9;
    }

    .miniature__magnify-img {
      width: 78px;
    }
  }

  .admin-options {
    opacity: 0;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

    display: flex;
    flex-direction: column;

    padding: 0.3rem;
    border-radius: 7px;
    transition: $transition-04;

    svg {
      width: 0;
      aspect-ratio: 1;
      cursor: pointer;
      transition: $transition-04;
    }
  }
}
.miniature__description {
  margin-top: 0.6rem;
  text-transform: capitalize;
}
</style>
