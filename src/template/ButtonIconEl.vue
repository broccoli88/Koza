<script setup></script>

<template>
  <button class="icon-btn">
    <slot name="text"></slot>
    <slot name="icon"></slot>
  </button>
</template>

<style lang="scss" scoped>
.icon-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  p {
    order: 2;
  }

  svg {
    order: 1;
    width: clamp(1.5rem, 0.7rem + 1vw, 1.8rem);
  }
}
</style>
