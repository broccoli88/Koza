<script setup></script>

<template>
  <transition name="fade" mode="out-in">
    <slot />
  </transition>
</template>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0.5;
  transform: scale(0.5);
}

.fade-enter-active,
.fade-leave-active {
  transition: $transition-03;
}
</style>
