<script setup>
import ButtonEl from './ButtonEl.vue'
import FadeScaleIconTransition from '../utils/transitions/FadeScaleIconTransition.vue'
import { useContactStore } from '../stores/ContactStore'
import { computed, ref } from 'vue'

const props = defineProps(['message'])
const contactStore = useContactStore()

const isMessage = computed(() => {
  return props.message.type === 'message'
})

const showMessage = ref(false)

const toggleMessage = () => {
  showMessage.value = !showMessage.value

  if (!showMessage.value) {
    contactStore.checkIfMessageWasRead(props.message.id, props.message.checked)
  }
}

const openDeleteMessgeModal = () => {
  showMessage.value = false
  contactStore.openDeleteMessgeModal(props.message.id)
}
</script>

<template>
  <li class="messages">
    <header
      class="messages__header"
      @click="toggleMessage"
      :class="{ 'header-active': showMessage }"
    >
      <p class="messages__header-heading">{{ message.firstName }} {{ message.lastName }}</p>

      <p class="message__side-info" :class="message.type === 'quote' ? 'quote' : 'not-quote'">
        {{ message.type }}
      </p>
      <p class="message__side-info">{{ message.date }}</p>

      <FadeScaleIconTransition>
        <svg
          class="messages__icon"
          v-if="!showMessage"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              fill="black"
              d="M9 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"
            />
            <path
              stroke="black"
              stroke-linecap="round"
              stroke-width="1.5"
              d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
            />
          </g>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="black"
            stroke-linecap="round"
            stroke-width="1.5"
            d="m14.5 9.5l-5 5m0-5l5 5M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
          />
        </svg>
      </FadeScaleIconTransition>
    </header>
    <article v-if="isMessage" class="messages__message" :class="{ active: showMessage }">
      <div class="content-wrapper">
        <p class="messages__content email">Email: {{ message.email }}</p>
        <p class="messages__content">Subject: {{ message.subject }}</p>
        <p class="messages__content font-size">
          {{ message.message }}
        </p>
        <ButtonEl
          @click="openDeleteMessgeModal"
          class="messages__btn btn--small btn--outline-black btn--slide-black"
        >
          Delete
        </ButtonEl>
      </div>
    </article>
    <article v-else class="messages__message" :class="{ active: showMessage }">
      <div class="content-wrapper">
        <p class="messages__content email">Email: {{ message.email }}</p>
        <p class="messages__content">Country: {{ message.country }}</p>
        <p class="messages__content">Model supply: {{ message.modelSupply }}</p>
        <p class="messages__content">Service: {{ message.service }}</p>
        <p class="messages__content font-size">{{ message.message }}</p>
        <ButtonEl
          @click="openDeleteMessgeModal"
          class="messages__btn btn--small btn--outline-black btn--slide-black"
        >
          Delete
        </ButtonEl>
      </div>
    </article>
  </li>
</template>

<style lang="scss" scoped>
.messages {
  display: grid;
  width: 100%;

  .messages__header {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;

    padding-block: 1rem;
    border-bottom: $bw-05 solid $bc-grayopacity-05;

    cursor: pointer;

    &:hover,
    &:focus {
      .messages__icon {
        path {
          stroke: $color-black;
        }
      }

      .messages__header-heading {
        color: $color-black;
      }
    }

    .messages__message,
    .messages__header,
    .messages__header-heading,
    .messages__icon {
      transition: $transition-04;
    }

    .messages__icon {
      path {
        stroke: $color-font-light;
      }
    }

    .message__side-info {
      font-size: 1.5rem;
    }

    .messages__header-heading {
      font-size: clamp(1.6rem, 1rem + 1.5vw, 2.3rem);
      font-weight: 700;
    }
  }

  .messages__message {
    display: grid;
    grid-template-rows: 0fr;
    transition: $transition-03;
    border-bottom: $bw-05 solid $bc-grayopacity-05;

    .content-wrapper {
      display: grid;
      gap: 1.5rem;
      overflow: hidden;

      .font-size {
        font-size: clamp(1.5rem, 0.8rem + 0.7vw, 1.9rem);
      }
      .email {
        font-weight: 600;
      }

      .messages__content {
        max-width: 70ch;
        word-wrap: break-word;
        word-break: break-all;
      }

      .messages__btn {
        justify-self: end;
        margin-top: 2rem;
      }
    }
  }

  .active {
    grid-template-rows: 1fr;
    margin-block: 1rem;
    padding-block: 2rem;
  }

  .header-active {
    color: $color-black;

    .messages__icon {
      path {
        stroke: $color-black;
      }
    }
  }

  .quote {
    color: $color-purple;
  }

  .not-quote {
    color: teal;
  }
}
</style>
