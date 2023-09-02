<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import { useContactStore } from '../stores/ContactStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const contactStore = useContactStore()
const { questionState, v1 } = storeToRefs(contactStore)

const inputData = ref({
      firstName: { label: 'First Name', placeholder: 'Enter name...', id: 'name' },
      lastName: { label: 'Last Name', placeholder: 'Enter last name...', id: 'last-name' },
      email: { label: 'Email', placeholder: 'Enter email...', id: 'email' },
      subject: { label: 'Subject', placeholder: 'Enter subject...', id: 'subject' },
      message: { label: 'Message', placeholder: 'What is your question ugly human?', id: 'message' }
})
</script>

<template>
      <form class="form" @submit.prevent="contactStore.handleQuestionForm">
            <section class="form__section">
                  <input
                        class="form__input"
                        type="text"
                        id="name"
                        placeholder="Enter name..."
                        v-model="questionState.firstName"
                        @blur="v1.firstName.$touch"
                  />
                  <label class="form__label" for="name">First Name:</label>
                  <p class="error" v-if="v1.firstName.$error">
                        {{ v1.firstName.$errors[0].$message }}
                  </p>
            </section>

            <section class="form__section">
                  <input
                        class="form__input"
                        type="text"
                        id="last-name"
                        placeholder="Enter last name..."
                        v-model="questionState.lastName"
                        @blur="v1.lastName.$touch"
                  />
                  <label class="form__label" for="last-name">Last Name:</label>
                  <p class="error" v-if="v1.lastName.$error">
                        {{ v1.lastName.$errors[0].$message }}
                  </p>
            </section>

            <section class="form__section">
                  <input
                        class="form__input"
                        type="text"
                        id="email"
                        placeholder="Enter email..."
                        v-model="questionState.email"
                        @blur="v1.email.$touch"
                  />
                  <label class="form__label" for="email">Email address:</label>
                  <p class="error" v-if="v1.email.$error">{{ v1.email.$errors[0].$message }}</p>
            </section>

            <section class="form__section">
                  <input
                        class="form__input"
                        type="text"
                        id="subject"
                        placeholder="Enter subject..."
                        v-model="questionState.subject"
                        @blur="v1.subject.$touch"
                  />
                  <label class="form__label" for="subject">Subject:</label>
                  <p class="error" v-if="v1.subject.$error">{{ v1.subject.$errors[0].$message }}</p>
            </section>

            <section class="form__section">
                  <textarea
                        class="form__input resize"
                        type="text"
                        id="message"
                        placeholder="What is your question?"
                        rows="10"
                        v-model="questionState.message"
                        @blur="v1.message.$touch"
                  />
                  <label class="form__label" for="message">Message:</label>
                  <p class="error" v-if="v1.message.$error">{{ v1.message.$errors[0].$message }}</p>
            </section>
            <ButtonEl class="form__btn btn--medium btn--outline-black btn--slide-black"
                  >Submit</ButtonEl
            >
      </form>
</template>

<style lang="scss" scoped>
.form {
      @include form;

      .form__section {
            @include form-section;

            .form__input {
                  @include form-input;
            }
      }

      .form__btn {
            justify-self: auto;
            align-self: auto;
      }

      .resize {
            resize: vertical;
      }
}
</style>
