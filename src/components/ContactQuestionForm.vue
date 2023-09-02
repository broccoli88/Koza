<script setup>
import ContactInput from './ContactInput.vue'
import ContactTextArea from './ContactTextArea.vue'
import ButtonEl from '../template/ButtonEl.vue'
import { useContactStore } from '../stores/ContactStore'
import { storeToRefs } from 'pinia'

const contactStore = useContactStore()
const { questionState, v1, inputData } = storeToRefs(contactStore)
</script>

<template>
      <form class="form" @submit.prevent="contactStore.handleQuestionForm">
            <ContactInput
                  type="text"
                  :id="inputData.firstName.id"
                  :label="inputData.firstName.label"
                  :placeholder="inputData.firstName.placeholder"
                  :v="v1.firstName"
                  v-model="questionState.firstName"
            />

            <ContactInput
                  type="text"
                  :id="inputData.lastName.id"
                  :label="inputData.lastName.label"
                  :placeholder="inputData.lastName.placeholder"
                  :v="v1.lastName"
                  v-model="questionState.lastName"
            />

            <ContactInput
                  type="email"
                  :id="inputData.email.id"
                  :label="inputData.email.label"
                  :placeholder="inputData.email.placeholder"
                  :v="v1.email"
                  v-model="questionState.email"
            />

            <ContactInput
                  type="text"
                  :id="inputData.subject.id"
                  :label="inputData.subject.label"
                  :placeholder="inputData.subject.placeholder"
                  :v="v1.subject"
                  v-model="questionState.subject"
            />

            <ContactTextArea
                  :id="inputData.message.id"
                  :label="inputData.message.label"
                  :placeholder="inputData.message.placeholder"
                  :v="v1.message"
                  v-model="questionState.message"
            />
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
