<script setup></script>

<template>
  <button class="btn--icon-white">
    <div class="btn--icon-content">
      <p>
        <slot name="text"></slot>
      </p>
      <slot name="icon"></slot>
    </div>
  </button>
</template>

<style lang="scss" scoped></style>

<style lang="scss">
.btn--icon-black {
  @include btn-icon-black;
}

.btn--icon-white {
  @include btn-icon-white;
}
.btn--icon-content {
  @include btn-icon-content;
}
</style>
