<script setup></script>

<template>
  <article class="modal">
    <header class="modal__header">
      <!-- <h2 class="modal__heading"> -->
      <slot name="heading"></slot>
      <!-- </h2> -->
    </header>
    <section class="modal__description">
      <slot name="description"> </slot>
    </section>
    <slot name="button"></slot>
  </article>
</template>

<style lang="scss" scoped>
.modal {
  @include modal($min-width: 60rem);

  .modal__header {
    @include modal-header;
    gap: 5rem;
  }

  .modal__description {
    @include modal-description;
  }
}
</style>
