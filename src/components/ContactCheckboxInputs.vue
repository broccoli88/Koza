<script setup>
import ContactCheckboxInput from './ContactCheckboxInput.vue'
import { useContactStore } from '../stores/ContactStore'
import { storeToRefs } from 'pinia'

const contactStore = useContactStore()
const { v2, inputData } = storeToRefs(contactStore)
</script>

<template>
      <section class="form__checkboxes">
            <p class="form__checkboxes-heading">{{ inputData.service.label }}</p>
            <ContactCheckboxInput
                  :id="inputData.service.id.assemble"
                  :placeholder="inputData.service.placeholder.assemble"
                  :v="v2.service"
            />

            <ContactCheckboxInput
                  :id="inputData.service.id.painting"
                  :placeholder="inputData.service.placeholder.painting"
                  :v="v2.service"
            />

            <ContactCheckboxInput
                  :id="inputData.service.id.basing"
                  :placeholder="inputData.service.placeholder.basing"
                  :v="v2.service"
            />

            <ContactCheckboxInput
                  :id="inputData.service.id.cleaning"
                  :placeholder="inputData.service.placeholder.cleaning"
                  :v="v2.service"
            />
            <p class="error" v-if="v2.service.$error">{{ v2.service.$errors[0].$message }}</p>
      </section>
</template>

<style lang="scss" scoped>
.form__checkboxes {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      & > label {
            transition: $transition-02;
      }

      .form__checkboxes-heading {
            grid-column: 1 / -1;
            margin-bottom: 1rem;
      }
}
</style>
