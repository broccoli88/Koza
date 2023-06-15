<script setup></script>

<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style lang="scss">
.btn--link {
  a {
    color: inherit;
  }
}

// Sizes

.btn--small {
  @include btn--small;
}

.btn--medium {
  @include btn--medium;
}

.btn--large {
  @include btn--large;
}

// Styles

.btn--gray {
  @include btn--gray;
}

.btn--white {
  @include btn--white;
}

.btn--black {
  @include btn--black;
}

.btn--outline-white {
  @include btn--outline-white;
}

.btn--outline-black {
  @include btn--outline-black;
}

.btn--outline-green {
  @include btn--outline-green;
}

.btn--outline-red {
  @include btn--outline-red;
}

// Effects

.btn--slide-black {
  @include btn--slide-black;
}

.btn--slide-white {
  @include btn--slide-white;
}

.btn--slide-green {
  @include btn--slide-green;
}

.btn--slide-red {
  @include btn--slide-red;
}
</style>
