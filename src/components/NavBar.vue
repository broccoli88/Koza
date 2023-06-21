<script setup>
import linksData from '../data/links.json'
import LogoEl from '../template/LogoEl.vue'
import FadeScaleIconTransition from '../utils/transitions/FadeScaleIconTransition.vue'
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { auth } from '../firebase/db'

const links = reactive(linksData.links)
const header = ref()
const navHeight = ref()
const route = useRoute()

const showDesktopAdminPanel = ref(true)

const isUserLoggedIn = computed(() => {
      return auth.currentUser
})

// Navbar toggle

const navUnwrapped = ref(false)
const toggleNav = () => {
      navUnwrapped.value = !navUnwrapped.value
}

// Disabling navbar in admin panel + navUnwrapped = false

watch(
      () => route.fullPath,
      () => {
            navUnwrapped.value = false

            if (route.fullPath === '/blog') {
                  header.value.style.display = 'initial'
            }
      }
)

// check if desktop to display admin panel

window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
            showDesktopAdminPanel.value = false
      } else {
            showDesktopAdminPanel.value = true
      }

      if (!header.value || header.value.classList === null) {
            return
      } else {
            if (window.innerWidth >= 768) {
                  navUnwrapped.value = false
            }
            navHeight.value = header.value.clientHeight
      }
})

//  Intersection Observer + Nav Height
onMounted(() => {
      //   check if desktop to display admin panel
      if (window.innerWidth >= 768) {
            showDesktopAdminPanel.value = true
      } else {
            showDesktopAdminPanel.value = false
      }

      // Nav Observer

      if (header.value) {
            const watchedEl = document.createElement('div')
            header.value.before(watchedEl)

            const navObserver = new IntersectionObserver(
                  (entries) => {
                        if (!header.value || header.value.classList === null) {
                              return
                        } else {
                              header.value.classList.toggle('shrink', !entries[0].isIntersecting)
                        }
                  },
                  { rootMargin: '30px 0px 0px 0px' }
            )

            navObserver.observe(watchedEl)

            //   Nav Height

            navHeight.value = header.value.clientHeight
      } else return
})
</script>
<template>
      <header ref="header">
            <div class="nav-container" :class="navUnwrapped ? 'navToggled' : ''">
                  <LogoEl class="logo" />
                  <div class="menu" tabindex="0">
                        <FadeScaleIconTransition name="fade" mode="out-in">
                              <img
                                    v-if="!navUnwrapped"
                                    @click="toggleNav"
                                    src="/svg/open.svg"
                                    alt=""
                              />
                              <img v-else @click="toggleNav" src="/svg/close.svg" alt="" />
                        </FadeScaleIconTransition>
                  </div>
                  <nav class="nav">
                        <ul class="nav__list">
                              <li class="nav__item" v-for="(value, key) in links" :key="key">
                                    <router-link
                                          :to="value.path"
                                          class="nav__link"
                                          :class="value.path === route.fullPath ? 'active' : ''"
                                          >{{ value.name }}</router-link
                                    >
                              </li>
                        </ul>
                        <!-- <div v-if="showDesktopAdminPanel">
                              <router-link
                                    v-if="!isUserLoggedIn"
                                    class="admin-panel"
                                    ref="adminPanel"
                                    to="/admin-panel"
                              >
                                    <svg
                                          height="100%"
                                          stroke-miterlimit="10"
                                          style="
                                                fill-rule: nonzero;
                                                clip-rule: evenodd;
                                                stroke-linecap: round;
                                                stroke-linejoin: round;
                                          "
                                          version="1.1"
                                          viewBox="0 0 21.5 21.5"
                                          width="100%"
                                          xml:space="preserve"
                                          xmlns="http://www.w3.org/2000/svg"
                                          xmlns:xlink="http://www.w3.org/1999/xlink"
                                    >
                                          <defs />
                                          <g id="User">
                                                <path
                                                      d="M20.75 10.75C20.75 15.464 20.75 17.821 19.285 19.285C17.822 20.75 15.464 20.75 10.75 20.75C6.036 20.75 3.679 20.75 2.214 19.285C0.75 17.822 0.75 15.464 0.75 10.75C0.75 6.036 0.75 3.679 2.214 2.214C3.68 0.75 6.036 0.75 10.75 0.75C15.464 0.75 17.821 0.75 19.285 2.214C20.259 3.188 20.585 4.557 20.695 6.75"
                                                      fill="none"
                                                      opacity="1"
                                                      stroke="#666"
                                                      stroke-linecap="round"
                                                      stroke-linejoin="miter"
                                                      stroke-width="1.5"
                                                />
                                                <path
                                                      d="M10.539 4.08276C12.0053 4.08276 13.194 5.27143 13.194 6.73772C13.194 8.20401 12.0053 9.39268 10.539 9.39268C9.07275 9.39268 7.88409 8.20401 7.88409 6.73772C7.88409 5.27143 9.07275 4.08276 10.539 4.08276M10.539 3.02078C8.48623 3.02078 6.8221 4.68491 6.8221 6.73772C6.8221 8.79053 8.48623 10.4547 10.539 10.4547C12.5919 10.4547 14.256 8.79053 14.256 6.73772C14.256 4.68491 12.5919 3.02078 10.539 3.02078ZM15.849 17.8885L14.787 17.8885L14.787 15.2336C14.787 13.7673 13.5983 12.5786 12.132 12.5786L8.94607 12.5786C7.47978 12.5786 6.29111 13.7673 6.29111 15.2336L6.29111 17.8885L5.22913 17.8885L5.22913 15.2336C5.22913 13.1808 6.89326 11.5166 8.94607 11.5166L12.132 11.5166C14.1848 11.5166 15.849 13.1808 15.849 15.2336L15.849 17.8885Z"
                                                      fill="#666"
                                                      fill-rule="nonzero"
                                                      opacity="1"
                                                      stroke="none"
                                                />
                                          </g>
                                    </svg>
                                    <p>Admin</p>
                              </router-link>
                        </div> -->
                  </nav>
            </div>
      </header>
</template>

<style lang="scss" scoped>
header {
      background-color: white;
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 999;

      .nav-container {
            @include container;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            padding-block: 1.5rem;
            margin-bottom: 0;

            transition: $transition-04;

            @include breakpoint {
                  padding: 1rem;
            }

            .logo {
                  margin-left: 1.5rem;
                  @include breakpoint {
                        margin-left: 0;
                  }
            }

            .menu {
                  width: 26px;
                  height: 26px;
                  margin-right: 1.5rem;

                  cursor: pointer;

                  @include breakpoint {
                        display: none;
                  }

                  &:focus {
                        outline: $outline-purple;
                  }

                  & > img {
                        width: 100%;
                        object-fit: cover;
                  }
            }

            .nav {
                  width: 100%;
                  display: grid;

                  grid-template-rows: 0fr;
                  transition: $transition-04;

                  @include breakpoint {
                        width: auto;
                        grid-template-rows: 1fr;
                        grid-auto-flow: column;
                        align-items: center;
                        gap: 1rem;
                  }

                  .navToggled {
                        grid-template-rows: 1fr;
                  }

                  .nav__list {
                        overflow: hidden;

                        @include breakpoint {
                              display: flex;
                              gap: 2rem;
                              // margin-right: 2rem;
                        }

                        .nav__item {
                              &:first-child {
                                    margin-top: 2rem;

                                    @include breakpoint {
                                          margin-top: 0;
                                    }
                              }

                              .active {
                                    color: $color-white;
                                    font-weight: 700;

                                    @include breakpoint {
                                          color: $color-black;
                                    }

                                    &::before {
                                          width: 100%;

                                          @include breakpoint {
                                                width: 30px;
                                                left: 50%;
                                                transform: translateX(-50%);
                                          }
                                    }
                              }
                              .invisible {
                                    display: none;
                              }
                              .visible {
                                    display: initial;
                              }
                        }
                  }

                  .admin-panel,
                  .nav__link {
                        display: block;
                        padding: 0.4rem 2rem 0.1rem;
                        position: relative;
                        color: $color-font-light;
                        text-transform: uppercase;
                        isolation: isolate;
                        transition: $transition-04;

                        @include breakpoint {
                              padding-inline: 0;
                              font-weight: 700;
                        }

                        &:hover,
                        &:focus {
                              font-weight: 700;
                              color: $color-white;
                              outline: none;

                              @include breakpoint {
                                    color: $color-black;
                              }
                        }

                        &::before {
                              content: '';
                              background-color: $color-black;

                              position: absolute;
                              width: 0%;
                              height: 100%;
                              bottom: 0;
                              left: 0;
                              z-index: -1;

                              transition: $transition-04;

                              @include breakpoint {
                                    height: 3px;
                              }
                        }
                        &:hover::before,
                        &:focus::before {
                              width: 100%;

                              @include breakpoint {
                                    width: 30px;
                                    left: 50%;
                                    transform: translateX(-50%);
                              }
                        }
                  }

                  .admin-panel {
                        margin-left: 1.5em;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;

                        svg {
                              width: clamp(1.8rem, 1rem + 1.9vw, 2.5rem);
                              height: clamp(1.5rem, 1rem + 1vw, 2.5rem);
                              align-self: baseline;
                        }

                        &:hover,
                        &:focus {
                              svg {
                                    path:nth-of-type(1) {
                                          stroke: $color-black;
                                    }
                                    path:nth-of-type(2) {
                                          fill: $color-black;
                                    }
                              }
                        }
                  }
            }
      }
      .navToggled {
            box-shadow: $box-shadow-10;
            .nav {
                  grid-template-rows: 1fr;
            }
      }
}

.shrink {
      box-shadow: $box-shadow-5;
      .nav-container {
            padding-block: 0.4rem;

            @include breakpoint {
                  padding-block: 0.6rem;
            }

            .menu {
                  width: 20px;
                  height: 20px;
                  transition: $transition-04;
            }

            .nav__link {
                  @include breakpoint {
                        font-size: clamp(1rem, 1rem + 0.4vw, 1.7rem);
                  }
            }
      }
}
</style>
