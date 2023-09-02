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
</script>

<template>
      <section class="form__section form__section-select">
            <div class="select-wrapper">
                  <select
                        :id="id"
                        :value="modelValue"
                        @input="$emit('update:modelValue', $event.target.value)"
                        @blur="v.$touch"
                        class="form__select"
                  >
                        <option disabled selected value>-- select an option --</option>
                        <option value="Other">Other - describe in message</option>
                        <option value="Shop">Shop Supply</option>
                        <option value="Customer">Client Supply</option>
                  </select>
                  <label class="form__select-label" :for="id">{{ label }}</label>
                  <p class="error" v-if="v.$error">
                        {{ v.$errors[0].$message }}
                  </p>
            </div>
      </section>
</template>

<style lang="scss" scoped>
.select-wrapper {
      width: 100%;
      max-width: 70ch;
      position: relative;
      display: grid;
      align-items: center;
      grid-template-areas:
            'label'
            'select';

      &::after {
            content: '';
            width: 0.8em;
            height: 0.5em;
            background-color: $color-gray;
            clip-path: polygon(100% 0%, 0 0%, 50% 100%);
            justify-self: end;
            margin-right: 2rem;
      }

      &:after,
      .form__select {
            grid-area: select;
      }

      &.form__select:focus &::after {
            background-color: black;
      }

      .form__select {
            @include form-input;
            width: 100%;
            max-width: 70ch;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            background-color: transparent;
            display: grid;
            grid-template-areas: 'select';
      }

      .form__select-label {
            grid-area: label;
      }
}
</style>
