<script setup>
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { useGalleryStore } from '../stores/GalleryStore'
import { storeToRefs } from 'pinia'

const galleryStore = useGalleryStore()

const {
      currentModel,
      orderedCurrentFraction,
      showImgTransition,
      currentTransition,
      showCarouselModal
} = storeToRefs(galleryStore)
</script>

<template>
      <Teleport to="#image-modal">
            <FadeTransition>
                  <div class="modal-container" v-if="showCarouselModal">
                        <TransitionGroup
                              tag="ul"
                              :name="currentTransition"
                              class="modal__miniatures"
                        >
                              <li v-for="{ img, model } in orderedCurrentFraction" :key="model">
                                    <img
                                          class="modal__image"
                                          :src="img"
                                          alt=""
                                          @click="galleryStore.switchImg(img)"
                                    />
                              </li>
                        </TransitionGroup>

                        <div class="modal__image-container">
                              <FadeTransition>
                                    <img
                                          v-if="showImgTransition"
                                          class="modal__image"
                                          :src="currentModel"
                                          alt=""
                                    />
                                    <img v-else class="modal__image" :src="currentModel" alt="" />
                              </FadeTransition>
                        </div>

                        <section class="modal__btns">
                              <svg
                                    class="chevron-left"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="34"
                                    height="34"
                                    viewBox="0 0 24 24"
                                    @click="galleryStore.moveLeft"
                              >
                                    <g
                                          fill="none"
                                          stroke="white"
                                          stroke-linecap="round"
                                          stroke-width="1.5"
                                    >
                                          <path
                                                stroke-linejoin="round"
                                                d="M16 12H8m0 0l3-3m-3 3l3 3"
                                          />
                                          <path
                                                d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
                                          />
                                    </g>
                              </svg>
                              <svg
                                    class="close-btn"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="34"
                                    height="34"
                                    viewBox="0 0 24 24"
                                    @click="galleryStore.toggleModal"
                              >
                                    <path
                                          fill="none"
                                          stroke="white"
                                          stroke-linecap="round"
                                          stroke-width="1.5"
                                          d="m14.5 9.5l-5 5m0-5l5 5M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
                                    />
                              </svg>
                              <svg
                                    class="chevron-right"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="34"
                                    height="34"
                                    viewBox="0 0 24 24"
                                    @click="galleryStore.moveRight"
                              >
                                    <g
                                          fill="none"
                                          stroke="white"
                                          stroke-linecap="round"
                                          stroke-width="1.5"
                                    >
                                          <path
                                                stroke-linejoin="round"
                                                d="M8 12h8m0 0l-3-3m3 3l-3 3"
                                          />
                                          <path
                                                d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
                                          />
                                    </g>
                              </svg>
                        </section>
                  </div>
            </FadeTransition>
      </Teleport>
</template>

<style lang="scss" scoped>
.modal-container {
      position: fixed;
      inset: 0;
      z-index: 999;
      display: grid;
      grid-template-rows: 80% auto;
      align-content: center;
      gap: 1rem;

      @include breakpoint {
            grid-template-rows: auto 75% auto;
      }
      padding: 2rem;

      background-color: black;

      .modal__miniatures {
            display: none;

            @include breakpoint {
                  display: grid;
                  grid-auto-flow: column;
                  grid-auto-columns: 10rem;

                  justify-content: center;
                  align-items: center;
                  gap: 1rem;

                  li {
                        height: 100%;

                        img {
                              @include img;
                        }
                  }
            }
      }

      .modal__image {
            @include img;

            object-fit: contain;
      }

      .modal__btns {
            display: flex;
            justify-content: center;
            gap: 6rem;

            margin-top: 1rem;

            .close-btn,
            .chevron-left,
            .chevron-right {
                  cursor: pointer;
            }

            .close-btn:active,
            .chevron-left:active,
            .chevron-right:active {
                  @include scale-button;
            }
      }
}

// .modal-container {
//   position: fixed;
//   inset: 0;
//   z-index: 999;

//   background-color: $bs-c-black-09;
//   display: grid;
//   place-content: center;

//   .modal__miniatures {
//     display: none;

//     @include breakpoint {
//       display: grid;
//       grid-auto-flow: column;
//       grid-auto-columns: 7rem;
//       justify-content: center;
//       align-items: center;
//       gap: 1rem;

//       margin-bottom: 2rem;

//       img {
//         width: 100%;
//         object-fit: cover;
//         cursor: pointer;
//       }
//     }
//   }

//   .modal__wrapper {
//     height: fit-content;
//     position: relative;
//     display: grid;

//     grid-template-columns: minmax(min(40rem, 100%), 90rem);
//     grid-auto-rows: 90rem;

//     .modal__image-container {
//       .modal__image {
//         @include img;
//         //   height: auto;
//       }
//     }

//   }
// }

.remove-enter-from,
.remove-leave-to,
.left-enter-from,
.left-leave-to,
.right-leave-to,
.right-enter-from {
      opacity: 0;
}

.left-leave-to,
.right-enter-from {
      transform: translateX(100px);
}
.remove-enter-from,
.left-enter-from,
.right-leave-to {
      transform: translateX(-100px);
}

.remove-leave-to {
      transform: translateY(-40px);
}

.remove-move,
.remove-enter-active,
.remove-leave-active,
.left-move,
.left-enter-active,
.left-leave-active,
.right-move,
.right-enter-active,
.right-leave-active {
      transition: all 0.5s ease;
}

.remove-leave-active {
      position: absolute;
}
</style>
