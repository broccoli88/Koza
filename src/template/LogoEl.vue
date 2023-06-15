<script setup></script>
<template>
  <router-link to="/" class="logo">
    <img src="/svg/hg.svg" alt="Goat head with crossed brushes behind" class="logo__img" />
    <div class="logo__text">
      <p class="logo__brand">homey goat</p>
      <p class="logo__fluff">Miniature painting studio</p>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;

  &:focus {
    outline: $outline-purple;
  }

  .logo__img {
    width: clamp(3rem, 1rem + 4vw, 6rem);
    transition: $transition-04;
  }

  .logo__text {
    line-height: 1;

    .logo__brand {
      font-size: clamp(1.5rem, 1rem + 1.3vw, 2rem);
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: $color-black;
      transition: $transition-04;
    }

    .logo__fluff {
      font-size: clamp(1rem, 0.95vw, 1.4rem);
      color: $color-gray-darker;
      letter-spacing: 0;
      transition: $transition-04;
    }
  }
}
.shrink {
  .logo {
    .logo__img {
      width: clamp(3rem, 1rem + 3vw, 5rem);
    }

    .logo__brand {
      font-size: clamp(1rem, 1rem + 0.7vw, 1.8rem);
    }

    .logo__fluff {
      font-size: clamp(0.7rem, 0.75vw, 1.1rem);
    }
  }
}
</style>
