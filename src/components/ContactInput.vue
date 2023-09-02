<script setup>
defineProps({
      v: Object,
      modelValue: {
            type: String,
            default: ''
      },
      label: {
            type: String,
            default: ''
      },
      id: {
            type: String,
            default: 'input'
      }
})

defineEmits(['update:modelValue'])
</script>

<template>
      <section class="form__section">
            <input
                  autocomplete="on"
                  :id="id"
                  :value="modelValue"
                  v-bind="$attrs"
                  @input="$emit('update:modelValue', $event.target.value)"
                  @blur="v.$touch"
                  class="form__input"
            />
            <label class="form__label" :for="id"> {{ label }}:</label>
            <p class="error" v-if="v.$error">{{ v.$errors[0].$message }}</p>
      </section>
</template>

<style lang="scss">
.form__section {
      @include form-section;

      .form__input {
            @include form-input;
      }
}
</style>
