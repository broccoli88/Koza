<script setup></script>

<template>
  <Transition name="scale">
    <slot></slot>
  </Transition>
</template>

<style lang="scss" scoped>
.scale-enter-active,
.scale-leave-active {
  transition: $transition-04;
}

.scale-leave-active {
  transition-delay: 0.25s;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
}

.scale-enter-active.modal-container.modal,
.scale-leave-active.modal-container.modal {
  transition: $transition-04;
}

.scale-enter-active.modal-container.modal {
  transition-delay: 0.25s;
}

.scale-enter-from.modal-container.modal,
.scale-leave-to.modal-container.modal {
  //   opacity: 0;
  -webkit-transform: scale(1.1);
  transform: translateY(-30px) scale(1.1);
}
</style>
