<script setup>
import ContactInput from './ContactInput.vue'
import ContactTextArea from './ContactTextArea.vue'
import ContactSelectInput from './ContactSelectInput.vue'
import ContactCheckboxInputs from './ContactCheckboxInputs.vue'
import ButtonEl from '../template/ButtonEl.vue'
import { useContactStore } from '../stores/ContactStore'
import { storeToRefs } from 'pinia'

const contactStore = useContactStore()
const { quoteState, v2, inputData } = storeToRefs(contactStore)
</script>

<template>
      <form class="form" @submit.prevent="contactStore.handleQuoteForm">
            <ContactInput
                  type="text"
                  :id="inputData.firstName.id"
                  :label="inputData.firstName.label"
                  :placeholder="inputData.firstName.placeholder"
                  :v="v2.firstName"
                  v-model="quoteState.firstName"
            />

            <ContactInput
                  type="text"
                  :id="inputData.lastName.id"
                  :label="inputData.lastName.label"
                  :placeholder="inputData.lastName.placeholder"
                  :v="v2.lastName"
                  v-model="quoteState.lastName"
            />

            <ContactInput
                  type="email"
                  :id="inputData.email.id"
                  :label="inputData.email.label"
                  :placeholder="inputData.email.placeholder"
                  :v="v2.email"
                  v-model="quoteState.email"
            />

            <ContactInput
                  type="text"
                  :id="inputData.country.id"
                  :label="inputData.country.label"
                  :placeholder="inputData.country.placeholder"
                  :v="v2.country"
                  v-model="quoteState.country"
            />

            <ContactSelectInput
                  :id="inputData.supply.id"
                  :label="inputData.supply.label"
                  :placeholder="inputData.supply.placeholder"
                  :v="v2.modelSupply"
                  v-model="quoteState.modelSupply"
            />

            <ContactCheckboxInputs />

            <ContactTextArea
                  :id="inputData.message.id"
                  :label="inputData.message.label"
                  :placeholder="inputData.message.placeholder"
                  :v="v2.message"
                  v-model="quoteState.message"
            />

            <ButtonEl class="form__btn btn--medium btn--outline-black btn--slide-black"
                  >Submit</ButtonEl
            >
      </form>
</template>

<style lang="scss" scoped>
.form {
      @include form;

      .form__btn {
            justify-self: auto;
            align-self: auto;
      }
}
</style>
