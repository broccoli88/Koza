<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import LogoEl from '../template/LogoEl.vue'
import { useLoginStore } from '../stores/LoginStore'
import { storeToRefs } from 'pinia'

const loginStore = useLoginStore()
const { v, loginState } = storeToRefs(loginStore)
</script>

<template>
      <main>
            <section class="login" ref="login">
                  <LogoEl class="login__logo" />
                  <h1 class="login__heading">Admin Login</h1>
                  <article class="login__panel">
                        <form class="login__form" @submit.prevent="loginStore.logIn">
                              <section class="login__section">
                                    <input
                                          v-model="loginState.email"
                                          @blur="v.email.$touch"
                                          class="login__input"
                                          placeholder="Email..."
                                          type="email"
                                          id="email"
                                    />
                                    <label for="email">Email</label>
                                    <p v-if="v.email.$error" class="error">
                                          {{ v.email.$errors[0].$message }}
                                    </p>
                              </section>
                              <section class="login__section">
                                    <input
                                          v-model="loginState.password"
                                          @blur="v.password.$touch"
                                          class="login__input"
                                          placeholder="Password..."
                                          type="password"
                                          id="password"
                                    />
                                    <label for="password">Password</label>
                                    <p v-if="v.password.$error" class="error">
                                          {{ v.password.$errors[0].$message }}
                                    </p>
                              </section>
                              <div class="login-info">
                                    <p>Login: admin@test.com</p>
                                    <p>Password: admin123</p>
                              </div>

                              <ButtonEl
                                    class="form__btn btn--medium btn--outline-black btn--slide-black"
                              >
                                    Log In
                              </ButtonEl>
                        </form>
                        <ButtonEl
                              @click="loginStore.goBack"
                              class="btn-back btn--medium btn--outline-black btn--slide-black"
                              >Go Back</ButtonEl
                        >
                  </article>
            </section>
      </main>
</template>

<style lang="scss" scoped>
.login {
      @include container;
      margin-bottom: 0;

      height: 100vh;
      display: grid;
      grid-auto-rows: min-content;
      align-content: center;

      .login__logo {
            justify-self: center;
      }

      .login__heading {
            text-align: center;
            margin-block: 1rem 4rem;
      }

      .login-info {
            display: flex;
            justify-content: space-around;
      }

      .login__panel {
            margin-inline: auto;
            width: min(50ch, 80%);
            display: grid;

            .login__form {
                  @include form;

                  .login__section {
                        @include form-section;

                        .login__input {
                              @include form-input;
                        }
                  }

                  .form__btn {
                        justify-self: auto;
                        align-self: auto;
                        margin-top: 3rem;
                  }
            }
      }

      .btn-back {
            justify-self: stretch;
            margin-top: 1rem;
      }
}
</style>
