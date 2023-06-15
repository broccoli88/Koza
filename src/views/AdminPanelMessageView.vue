<script setup>
import MessagesEl from '../template/MessagesEl.vue'
import ModalAdminDeleteMessages from '../components/ModalAdminDeleteMessages.vue'
import { useContactStore } from '../stores/ContactStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const contactStore = useContactStore()
const { messages } = storeToRefs(contactStore)

contactStore.getMessages()

const checkIfEmpty = computed(() => {
  return messages.value.length > 0
})

const newMessages = computed(() => {
  return messages.value
    .filter((message) => !message.checked)
    .sort((a, b) => {
      const date1 = new Date(
        a.date.split(',')[0].split('/').reverse().join('/') + ' ' + a.date.split(',')[1].trim()
      )
      const date2 = new Date(
        b.date.split(',')[0].split('/').reverse().join('/') + ' ' + b.date.split(',')[1].trim()
      )
      return date1 - date2
    })
    .reverse()
})

const checkedMessages = computed(() => {
  return messages.value
    .filter((message) => message.checked)
    .sort((a, b) => {
      const date1 = new Date(
        a.date.split(',')[0].split('/').reverse().join('/') + ' ' + a.date.split(',')[1].trim()
      )
      const date2 = new Date(
        b.date.split(',')[0].split('/').reverse().join('/') + ' ' + b.date.split(',')[1].trim()
      )
      return date1 - date2
    })
    .reverse()
})
</script>

<template>
  <div v-if="checkIfEmpty">
    <section class="admin-messages">
      <h3>New messages</h3>
      <transition-group tag="ul" name="slide" v-if="newMessages.length > 0">
        <MessagesEl v-for="message in newMessages" :key="message.id" :message="message" />
      </transition-group>
      <div v-else>
        <p>No New Messages...</p>
      </div>
    </section>
    <section class="admin-messages">
      <h3>Checked Messages</h3>
      <transition-group tag="ul" name="slide" v-if="checkedMessages.length > 0">
        <MessagesEl v-for="message in checkedMessages" :key="message.id" :message="message" />
      </transition-group>
      <div v-else>
        <p>No messages left...</p>
      </div>
      <ModalAdminDeleteMessages />
    </section>
  </div>
  <div class="empty" v-else>
    <h2>Messagebox is empty...</h2>
  </div>
</template>

<style lang="scss" scoped>
.admin-messages {
  display: grid;
  margin: 6vw 2vw;

  ul {
    position: relative;
  }

  h3 {
    margin-bottom: 3rem;
  }
}

.empty {
  display: grid;
  place-content: center;
  height: 50vh;
  margin: 4vw 2vw;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s ease;
  transition-delay: 0.5s;
}

.slide-leave-active {
  position: absolute;
}
</style>
