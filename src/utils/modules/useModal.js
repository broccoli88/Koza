import { watch } from 'vue'

export const useModal = (modalValue) => {
  const body = document.body
  watch(modalValue, () => {
    modalValue.value ? (body.style.overflow = 'hidden') : (body.style.overflow = 'initial')
  })
}
