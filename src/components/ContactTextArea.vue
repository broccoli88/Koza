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
            default: 'text-area'
      }
})

defineEmits(['update:modelValue'])
</script>

<template>
      <section class="form__section">
            <textarea
                  type="text"
                  autocomplete="on"
                  rows="10"
                  :id="id"
                  :value="modelValue"
                  v-bind="$attrs"
                  @input="$emit('update:modelValue', $event.target.value)"
                  class="form__input resize"
            />
            <label class="form__label" for="message">{{ label }}:</label>
            <p class="error" v-if="v.$error">{{ v.$errors[0].$message }}</p>
      </section>
</template>

<style lang="scss" scoped>
.resize {
      resize: vertical;
}
</style>
