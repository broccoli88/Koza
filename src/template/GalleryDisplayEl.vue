<script setup>
import GalleryTileEl from '../template/GalleryTileEl.vue'
import { useAdminStore } from '../stores/AdminStore'
import { useAdminGalleryStore } from '../stores/AdminGalleryStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const props = defineProps(['currentSystem'])
const adminStore = useAdminStore()
const { data } = storeToRefs(adminStore)

const adminGalleryStore = useAdminGalleryStore()
const { isInAdminPanel } = storeToRefs(adminGalleryStore)

const filteredSystem = computed(() => {
      return data.value.filter((s) => s.system === props.currentSystem)
})

const displaySystem = computed(() => {
      return props.currentSystem === 'all models' ? data.value : filteredSystem.value
})
</script>

<template>
      <section>
            <article
                  class="gallery"
                  v-for="{ system, fractions, id } in displaySystem"
                  :key="system"
            >
                  <header class="gallery__header">
                        <h2>
                              <p>{{ system }}</p>

                              <svg
                                    v-if="isInAdminPanel"
                                    @click="adminGalleryStore.openDeleteModal(system, id)"
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
                        </h2>
                  </header>
                  <div v-if="fractions.length > 0">
                        <section
                              v-for="{ fraction, images } in fractions"
                              :key="fraction"
                              class="gallery__fraction"
                        >
                              <div class="gallery__fraction-title">
                                    <h3>
                                          <p>{{ fraction }}</p>

                                          <svg
                                                v-if="isInAdminPanel"
                                                @click="
                                                      adminGalleryStore.openDeleteModal(
                                                            system,
                                                            id,
                                                            fraction
                                                      )
                                                "
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
                                    </h3>
                              </div>

                              <GalleryTileEl
                                    @delete="
                                          adminGalleryStore.openDeleteModal(
                                                system,
                                                id,
                                                fraction,
                                                model
                                          )
                                    "
                                    v-for="{ model, img } in images"
                                    :key="model"
                                    :model="img"
                                    :set="images"
                              >
                              </GalleryTileEl>
                        </section>
                  </div>
            </article>
      </section>
</template>

<style lang="scss" scoped>
.gallery {
      margin-block: 3rem;
      //   background-color: $color-gray-lighter;
      padding: 3rem 2rem;
      //   box-shadow: $box-shadow-5;
      // box-shadow: 4px 5px 15px 1px hsl(0, 0%, 0%, 0.15);

      @include breakpoint {
            margin-block: 3vw;
      }

      .gallery__fraction-title,
      .gallery__header {
            display: flex;
            gap: 2rem;

            h2 {
                  @include heading-underline-black;
                  color: $color-black;

                  &::before {
                        opacity: 1;
                        left: 10%;
                        bottom: 0;
                  }
            }
      }

      .gallery__fraction {
            margin-block: 2vw;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
            gap: 1vw;

            .gallery__fraction-title {
                  grid-column: 1 / -1;
                  margin-bottom: 1rem;

                  h3 {
                        position: relative;
                  }
            }
      }

      .gallery__header,
      .gallery__fraction-title {
            &:hover {
                  .delete-icon {
                        opacity: 1;
                        width: clamp(2rem, 1rem + 1.4vw, 2.6rem);
                  }
            }
      }

      .delete-icon {
            opacity: 0;
            width: 0;

            aspect-ratio: 1;
            cursor: pointer;

            position: absolute;
            top: -7%;
            left: calc(100% + 2rem);
            transition: $transition-04;
      }
}
</style>
