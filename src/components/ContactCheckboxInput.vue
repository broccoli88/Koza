<script setup>
import { storeToRefs } from 'pinia'
import { useContactStore } from '../stores/ContactStore'

const contactStore = useContactStore()
const { quoteState } = storeToRefs(contactStore)

defineProps({
      v: Object,
      modelValue: {
            type: Array
      },
      id: {
            type: String,
            default: 'text-area'
      },
      placeholder: {
            type: String,
            default: ''
      }
})
</script>

<template>
      <div class="form__checkbox">
            <input
                  class="checkbox"
                  type="checkbox"
                  :id="id"
                  :value="placeholder"
                  v-model="quoteState.service"
                  @blur="v.$touch"
            />
            <label class="form__label" :for="id">{{ placeholder }}</label>
      </div>
</template>

<style lang="scss" scoped>
.form__checkbox {
      input[type='checkbox'] {
            appearance: none;
            border: 1px solid $color-gray;
            padding: 0.4em;
            margin-right: 0.8em;
            transition: $transition-02;
      }

      input[type='checkbox']:focus {
            border: 1px solid $color-black;
            outline: none;
      }

      input[type='checkbox']:checked {
            border: 1px solid $color-black;
            box-shadow: inset 0 0 0 1px $color-white;
            background-color: $color-black;
      }

      input[type='checkbox']:checked + label,
      input[type='checkbox']:focus + label {
            color: $color-black;
      }
}
</style>
