<script setup></script>

<template>
  <Transition name="fade" mode="out-in">
    <slot></slot>
  </Transition>
</template>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: $transition-03;
}
</style>
