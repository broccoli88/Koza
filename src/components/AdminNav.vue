<script setup>
import LogoEl from '../template/LogoEl.vue'
import ButtonEl from '../template/ButtonEl.vue'
import { useLoginStore } from '../stores/LoginStore'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

const childRoutes = computed(() => {
      return router.options.routes.filter((route) => {
            return route.name === 'admin panel'
      })
})
const loginStore = useLoginStore()

const defaultLogin = computed(() => {
      //   return !loginStore.userData ? 'your-admin@mail.com' : loginStore.userData
      return !loginStore.loginState.email ? 'your-admin@mail.com' : loginStore.loginState.email
})
</script>

<template>
      <aside class="nav">
            <LogoEl class="logo" />

            <nav class="nav__nav">
                  <ul class="nav__list">
                        <li
                              v-for="child in childRoutes[0].children"
                              :key="child.path"
                              class="nav__item"
                        >
                              <router-link :to="`/admin-panel/${child.path}`" class="nav__link"
                                    >{{ child.name }}
                              </router-link>
                        </li>
                  </ul>
            </nav>
            <section class="nav__other">
                  <div class="user">
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
                                          stroke="#000000"
                                          stroke-linecap="round"
                                          stroke-linejoin="miter"
                                          stroke-width="1.5"
                                    />
                                    <path
                                          d="M10.539 4.08276C12.0053 4.08276 13.194 5.27143 13.194 6.73772C13.194 8.20401 12.0053 9.39268 10.539 9.39268C9.07275 9.39268 7.88409 8.20401 7.88409 6.73772C7.88409 5.27143 9.07275 4.08276 10.539 4.08276M10.539 3.02078C8.48623 3.02078 6.8221 4.68491 6.8221 6.73772C6.8221 8.79053 8.48623 10.4547 10.539 10.4547C12.5919 10.4547 14.256 8.79053 14.256 6.73772C14.256 4.68491 12.5919 3.02078 10.539 3.02078ZM15.849 17.8885L14.787 17.8885L14.787 15.2336C14.787 13.7673 13.5983 12.5786 12.132 12.5786L8.94607 12.5786C7.47978 12.5786 6.29111 13.7673 6.29111 15.2336L6.29111 17.8885L5.22913 17.8885L5.22913 15.2336C5.22913 13.1808 6.89326 11.5166 8.94607 11.5166L12.132 11.5166C14.1848 11.5166 15.849 13.1808 15.849 15.2336L15.849 17.8885Z"
                                          fill="#000000"
                                          fill-rule="nonzero"
                                          opacity="1"
                                          stroke="none"
                                    />
                              </g>
                        </svg>
                        <p>{{ defaultLogin }}</p>
                  </div>

                  <ButtonEl
                        @click="loginStore.logOut"
                        class="btn--nav btn--small btn--outline-black btn--slide-black"
                        >Log Out</ButtonEl
                  >
                  <ButtonEl
                        @click="loginStore.goBack"
                        class="btn--nav btn--small btn--outline-black btn--slide-black"
                        >Go to Main</ButtonEl
                  >
            </section>
      </aside>
</template>

<style lang="scss" scoped>
.nav {
      position: sticky;
      top: 0;

      display: grid;
      grid-template-rows: auto 1fr;

      height: 100dvh;
      padding-block: 4rem;
      background-color: $color-gray-lighter;
      box-shadow: $box-shadow-10;

      .logo {
            // filter: invert(1);
            padding-inline: 1.5rem;
      }
      .nav__nav {
            margin-top: 50%;

            .nav__list {
                  display: grid;

                  .nav__item {
                        .nav__link {
                              font-size: clamp(1.5rem, 0.8rem + 1.4vw, 2rem);
                              font-weight: 700;
                        }

                        .nav__link {
                              display: block;
                              color: $color-gray-darker;
                              text-transform: uppercase;
                              padding: 0.7em 1.5em 0.5em;
                              transition: $transition-04;

                              &:hover,
                              &:focus {
                                    background-color: $color-black;
                                    color: $color-white;
                              }
                        }
                  }
            }

            .active {
                  grid-template-rows: 1fr;
            }
      }
      .nav__other {
            align-self: flex-end;
            display: grid;
            gap: 1rem;
            padding: 1.5rem;

            height: min-content;

            .user {
                  display: flex;
                  gap: 0.5rem;
                  align-items: center;
                  margin-bottom: 2rem;
                  word-wrap: break-word;

                  svg {
                        width: clamp(1.8rem, 0.7rem + 1vw, 2.5rem);
                        height: clamp(1.8rem, 0.7rem + 1vw, 2.5rem);
                  }

                  p {
                        margin-top: 0.5rem;
                        color: $color-black;
                        font-size: clamp(1.4rem, 1rem + 0.6vw, 2rem);
                  }
            }

            .btn--nav {
                  justify-self: stretch;
            }
      }
}
</style>
