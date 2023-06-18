<script setup>
import ModalContact from '../components/ModalContact.vue'
import BannerEl from '../template/BannerEl.vue'
import LogoEl from '../template/LogoEl.vue'
import ContactQuestionForm from '../components/ContactQuestionForm.vue'
import ContactGetQuoteForm from '../components/ContactGetQuoteForm.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { useContactStore } from '../stores/ContactStore'
import { storeToRefs } from 'pinia'

const contactStore = useContactStore()
const { questionForm } = storeToRefs(contactStore)
</script>
<template>
      <main>
            <BannerEl />

            <section class="description">
                  <h3>
                        Thanks for visiting our website, if you would like a quote or have a
                        question, please complete all the information below as thoroughly as
                        possible.
                  </h3>
            </section>

            <section class="contact">
                  <LogoEl class="contact__logo" />
                  <article class="contact__info">
                        <p>Kozia 2 / szafa do Narnii</p>
                        <p>43-000 Czechowice-Dziedzice</p>
                        <p>Poland</p>
                  </article>
                  <article class="contact__contact">
                        <p>+48 000 000 000</p>
                        <p>koza-to-pala@zdecydowanie.com</p>
                  </article>
            </section>

            <section class="contact__form">
                  <div class="contact__form-cards">
                        <div class="contact__form-card" @click="contactStore.switchToQuestionForm">
                              <p
                                    class="contact__form-card-heading card-underline-left"
                                    :class="questionForm ? 'card-left-active' : ''"
                              >
                                    Ask a question
                              </p>
                        </div>
                        <div class="contact__form-card" @click="contactStore.switchToQuoteForm">
                              <p
                                    class="contact__form-card-heading card-underline-right"
                                    :class="!questionForm ? 'card-right-active' : ''"
                              >
                                    Ask for a quote
                              </p>
                        </div>
                  </div>
                  <div class="contact__form-forms">
                        <FadeTransition>
                              <keep-alive>
                                    <component
                                          :is="
                                                questionForm
                                                      ? ContactQuestionForm
                                                      : ContactGetQuoteForm
                                          "
                                    />
                              </keep-alive>
                        </FadeTransition>
                  </div>
            </section>
            <ModalContact />
      </main>
</template>

<style lang="scss" scoped>
main {
      @include container;

      .description {
            @include description($gap: 1vw, $width: 70ch);
      }

      .contact {
            @include description($gap: 1vw, $width: 70ch);
            margin-block: 6rem;

            @include breakpoint {
                  margin-block: 6vw;
            }

            .contact__logo {
                  margin-inline: auto;
            }

            .contact__info {
                  margin-block: 2rem;
            }
      }
      .contact__form {
            width: min(70ch, 80%);
            margin-inline: auto;
            display: grid;
            gap: 2vw;

            .contact__form-cards {
                  font-size: clamp(1.3rem, 0.6rem + 1.2vw, 2.4rem);
                  text-transform: uppercase;

                  display: grid;
                  grid-auto-flow: column;
                  align-items: center;
                  transition: 0;

                  .contact__form-card {
                        display: grid;
                        justify-content: center;
                        cursor: pointer;

                        &:first-child {
                              border-right: $bw-05 solid $bc-grayopacity-05;
                        }

                        .contact__form-card-heading {
                              @include heading-underline-black;
                        }

                        .card-underline-right {
                              &::before {
                                    right: 0;
                                    left: auto;
                              }
                        }
                        .card-underline-left {
                              &::before {
                                    left: 0;
                              }
                        }

                        .card-right-active,
                        .card-left-active {
                              color: $color-black;
                        }

                        .card-left-active {
                              &::before {
                                    left: 50%;
                                    transform: translateX(-50%);
                                    opacity: 1;
                              }
                        }

                        .card-right-active {
                              &::before {
                                    right: 50%;
                                    transform: translateX(50%);
                                    opacity: 1;
                              }
                        }
                  }
            }
      }
}
</style>
