import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useModal } from '../utils/modules/useModal'
import team from '../data/team.json'

export const useMemberStore = defineStore('memberStore', () => {
  const members = ref(team.team)
  const member = ref({})

  const showModal = ref(false)

  const toggleModal = () => {
    showModal.value = !showModal.value
  }

  useModal(showModal)

  return { member, members, showModal, toggleModal }
})
