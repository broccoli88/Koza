import { defineStore } from 'pinia'
import { useModal } from '../utils/modules/useModal'
import { ref, computed } from 'vue'

export const useGalleryStore = defineStore('galleryStore', () => {
  // ...::: [GALLERY]:::..

  //   Modal
  const currentIndex = ref()
  const currentModel = ref('')
  const currentFraction = ref([])
  const orderedCurrentFraction = ref([])

  const showImgTransition = ref(false)
  const transitionName = ref({
    left: {
      active: false,
      title: 'left'
    },
    right: {
      active: false,
      title: 'right'
    },
    remove: {
      active: true,
      title: 'remove'
    }
  })

  const currentTransition = computed(() => {
    return Object.values(transitionName.value).filter((t) => t.active)[0].title
  })

  const showCarouselModal = ref(false)

  function useImageTransition() {
    showImgTransition.value = !showImgTransition.value
  }

  function checkIndex(model) {
    return currentFraction.value.findIndex((i) => {
      return i.img === model
    })
  }

  function putInOrder() {
    const fraction = JSON.parse(JSON.stringify(currentFraction.value))
    orderedCurrentFraction.value = fraction.splice(currentIndex.value).concat(fraction)
  }

  function toggleModal() {
    showCarouselModal.value = !showCarouselModal.value
    currentIndex.value = checkIndex(currentModel.value)
    putInOrder()
  }

  function switchImg(model) {
    transitionName.value.right.active = false
    transitionName.value.left.active = false
    transitionName.value.remove.active = true

    // checkTransition()

    currentIndex.value = checkIndex(model)
    currentModel.value = model
    useImageTransition()
    putInOrder()
  }

  function moveRight() {
    if (orderedCurrentFraction.value.length <= 1) return

    transitionName.value.remove.active = false
    transitionName.value.left.active = false
    transitionName.value.right.active = true

    // checkTransition()

    currentIndex.value++
    if (currentIndex.value >= orderedCurrentFraction.value.length) {
      currentIndex.value = 0
    }
    const firstEl = orderedCurrentFraction.value.shift()
    useImageTransition()
    currentModel.value = currentFraction.value[currentIndex.value].img
    setTimeout(() => {
      orderedCurrentFraction.value.push(firstEl)
    }, 100)
  }

  function moveLeft() {
    if (orderedCurrentFraction.value.length <= 1) return

    transitionName.value.right.active = false
    transitionName.value.remove.active = false
    transitionName.value.left.active = true

    // checkTransition()

    currentIndex.value--
    if (currentIndex.value < 0) {
      currentIndex.value = currentFraction.value.length - 1
    }
    const lastEl = orderedCurrentFraction.value.pop()
    useImageTransition()
    currentModel.value = currentFraction.value[currentIndex.value].img
    setTimeout(() => {
      orderedCurrentFraction.value.unshift(lastEl)
    }, 100)
  }

  useModal(showCarouselModal)

  return {
    showCarouselModal,
    currentModel,
    currentFraction,
    orderedCurrentFraction,
    showImgTransition,
    currentTransition,
    toggleModal,
    switchImg,
    moveRight,
    moveLeft
  }
})
