<script setup></script>

<template>
  <transition name="slide" mode="out-in">
    <slot />
  </transition>
</template>

<style lang="scss" scoped>
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: $transition-03;
}
</style>
