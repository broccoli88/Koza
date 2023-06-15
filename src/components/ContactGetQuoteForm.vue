<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import { useContactStore } from '../stores/ContactStore'
import { storeToRefs } from 'pinia'

const contactStore = useContactStore()
const { quoteState, v2 } = storeToRefs(contactStore)
</script>

<template>
  <form class="form" @submit.prevent="contactStore.handleQuoteForm">
    <section class="form__section">
      <input
        class="form__input"
        type="text"
        id="name"
        placeholder="Enter name..."
        @blur="v2.firstName.$touch"
        v-model.trim="quoteState.firstName"
      />
      <label class="form__label" for="name">First Name:</label>
      <p class="error" v-if="v2.firstName.$error">{{ v2.firstName.$errors[0].$message }}</p>
    </section>

    <section class="form__section">
      <input
        class="form__input"
        type="text"
        id="last-name"
        placeholder="Enter last name..."
        @blur="v2.lastName.$touch"
        v-model.trim="quoteState.lastName"
      />
      <label class="form__label" for="last-name">Last Name:</label>
      <p class="error" v-if="v2.lastName.$error">{{ v2.lastName.$errors[0].$message }}</p>
    </section>

    <section class="form__section">
      <input
        class="form__input"
        type="email"
        id="email"
        placeholder="Enter email..."
        @blur="v2.email.$touch"
        v-model.trim="quoteState.email"
      />
      <label class="form__label" for="email">Email address:</label>
      <p class="error" v-if="v2.email.$error">{{ v2.email.$errors[0].$message }}</p>
    </section>

    <section class="form__section">
      <input
        class="form__input"
        type="text"
        id="country"
        placeholder="Enter country..."
        @blur="v2.country.$touch"
        v-model.trim="quoteState.country"
      />
      <label class="form__label" for="country">Country:</label>
      <p class="error" v-if="v2.country.$error">{{ v2.country.$errors[0].$message }}</p>
    </section>

    <section class="form__section form__section-select">
      <div class="select-wrapper">
        <select
          id="supply"
          class="form__select"
          v-model="quoteState.modelSupply"
          @blur="v2.modelSupply.$touch"
        >
          <option disabled selected value>-- select an option --</option>
          <option value="Other">Other - describe in message</option>
          <option value="Shop">Shop Supply</option>
          <option value="Customer">Client Supply</option>
        </select>
        <label class="form__select-label" for="supply">How are you supplying us with models?</label>
        <p class="error" v-if="v2.modelSupply.$error">{{ v2.modelSupply.$errors[0].$message }}</p>
      </div>
    </section>

    <section class="form__checkboxes">
      <p class="form__checkboxes-heading">We offer:</p>
      <div class="form__checkbox">
        <input
          class="checkbox"
          type="checkbox"
          value="assemble"
          id="assemble"
          v-model="quoteState.service"
          @blur="v2.service.$touch"
        />
        <label class="form__label" for="assemble">Assemble</label>
      </div>
      <div class="form__checkbox">
        <input
          type="checkbox"
          value="basing"
          id="basing"
          v-model="quoteState.service"
          @blur="v2.service.$touch"
        />
        <label class="form__label" for="basing">Basing</label>
      </div>
      <div class="form__checkbox">
        <input
          type="checkbox"
          value="painting"
          id="painting"
          v-model="quoteState.service"
          @blur="v2.service.$touch"
        />
        <label class="form__label" for="painting">Painting</label>
      </div>
      <div class="form__checkbox">
        <input
          type="checkbox"
          value="cleaning"
          id="cleaning"
          v-model="quoteState.service"
          @blur="v2.service.$touch"
        />
        <label class="form__label" for="cleaning">Cleaning</label>
      </div>
      <p class="error" v-if="v2.service.$error">{{ v2.service.$errors[0].$message }}</p>
    </section>

    <section class="form__section">
      <textarea
        class="form__input resize"
        type="text"
        id="message"
        placeholder="Message"
        rows="10"
        @blur="v2.message.$touch"
        v-model.trim="quoteState.message"
      />
      <label class="form__label" for="message">Message:</label>
      <p class="error" v-if="v2.message.$error">{{ v2.message.$errors[0].$message }}</p>
    </section>
    <ButtonEl class="form__btn btn--medium btn--outline-black btn--slide-black">Submit</ButtonEl>
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
  }

  .resize {
    resize: vertical;
  }
  .error {
    @include error;
  }
}
</style>
