<script setup>
import LinksData from '../data/links.json'
import LogoEl from '../template/LogoEl.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { ref } from 'vue'

defineProps(['adminLogin'])

const links = ref(LinksData.links)
</script>

<template>
      <footer class="footer">
            <LogoEl />
            <section class="media">
                  <a href="#" class="footer__icon fb-icon" title="HomeyGoat Facebook">
                        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                        >
                              <path
                                    fill="white"
                                    d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z"
                              />
                        </svg>
                  </a>
                  <a href="#" class="footer__icon insta-icon" title="HomeyGoat Instagram">
                        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 15 15"
                        >
                              <path
                                    fill="none"
                                    stroke="white"
                                    d="M11 3.5h1M4.5.5h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4v-6a4 4 0 0 1 4-4Zm3 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z"
                              />
                        </svg>
                  </a>
            </section>
            <ul class="footer__list">
                  <li v-for="(value, key) in links" :key="key">
                        <router-link :to="value.path" class="footer__link">{{
                              value.name
                        }}</router-link>
                  </li>
            </ul>
            <FadeTransition>
                  <router-link to="/admin-panel" class="admin-panel-login" v-if="adminLogin">
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
                        <p>Admin panel login</p>
                  </router-link>
            </FadeTransition>
            <section class="maker">
                  <p>Made by</p>
                  <a href="https://paweljaromin.io/" class="maker__link" title="PJ Website">
                        <img src="/svg/pj.svg" alt="Letters P and J" />
                  </a>
            </section>
      </footer>
</template>

<style lang="scss" scoped>
.footer {
      @include container;
      height: min-content;
      display: grid;
      justify-items: center;
      gap: 1vw;

      padding: 1.5rem;
      margin-block: 2rem;
      @include breakpoint {
            padding: 2rem;
      }

      .media {
            .footer__icon {
                  display: inline-flex;
                  padding: 0.4em;
                  border-radius: 50%;
                  cursor: pointer;
                  transition: $transition-04;
                  background-color: $color-gray;

                  &:hover,
                  &:focus {
                        outline: none;
                  }

                  & > svg {
                        width: clamp(15px, 0.5rem + 2vw, 24px);
                        height: clamp(15px, 0.5rem + 2vw, 24px);
                  }
            }

            .fb-icon {
                  margin-right: 1rem;

                  &:hover,
                  &:focus {
                        background-color: hsl(214, 89%, 52%);
                  }
            }

            .insta-icon {
                  background-image: $color-gray;
                  position: relative;
                  overflow: hidden;
                  isolation: isolate;

                  &::after {
                        content: '';
                        background-image: linear-gradient(
                              190deg,
                              #405de6,
                              #5b51d8,
                              #833ab4,
                              #c13584,
                              #e1306c,
                              #fd1d1d,
                              #f56040,
                              #f77737,
                              #fcaf45,
                              #ffdc80
                        );

                        position: absolute;
                        inset: 0;
                        z-index: -1;
                        opacity: 0;
                        transition: $transition-04;
                  }

                  &:hover::after,
                  &:focus::after {
                        opacity: 1;
                  }
            }
      }

      .footer__list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1vw;
      }

      .footer__link,
      .admin-panel-login {
            font-size: clamp(1.1rem, 1rem + 0.3vw, 1.6rem);
            text-transform: uppercase;
            color: $color-font-light;
            padding: 0.2rem 0.3rem 0rem;
            transition: $transition-04;

            @include breakpoint {
                  font-weight: 600;
            }

            &:hover,
            &:focus {
                  color: $color-black;
                  outline: none;
            }
      }

      .admin-panel-login {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            svg {
                  align-self: baseline;
                  width: clamp(1.1rem, 1rem + 0.7vw, 1.8rem);
                  height: clamp(1.1rem, 1rem + 0.7vw, 1.8rem);
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

      .maker {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            margin-top: 2rem;

            & > p {
                  font-size: clamp(1.1rem, 1rem + 0.3vw, 1.6rem);
                  color: $color-purple;
            }
            .maker__link {
                  &:focus {
                        outline: $outline-purple;
                  }

                  & > img {
                        vertical-align: middle;
                        width: clamp(2rem, 1rem + 1vw, 2.5rem);
                  }
            }
      }
}
</style>
