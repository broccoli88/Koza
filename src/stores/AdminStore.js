import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { ref as vref } from 'vue'
import { db } from '../firebase/db'
import {
  collection,
  query,
  onSnapshot,
  doc,
  arrayUnion,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { storageRef } from '../firebase/db'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useModal } from '../utils/modules/useModal'

// Add Img validation

export const useAdminStore = defineStore('adminStore', () => {
  const modelObj = reactive({
    system: '',
    fraction: '',
    model: '',
    img: '',
    url: ''
  })

  const rules = {
    system: {
      required: helpers.withMessage('Choose existing system or enter new one', required),
      $autoDirty: true
    },
    fraction: {
      required: helpers.withMessage('Choose existing fraction or enter new one', required),
      $autoDirty: true
    },
    model: { required: helpers.withMessage('Enter models name', required), $autoDirty: true },
    img: {
      required: helpers.withMessage('Choose file to upload', required),
      $autoDirty: true
    }
  }

  const v = useVuelidate(rules, modelObj)

  // Disabling NavBar and Footer

  const isMobileView = vref(false)

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      isMobileView.value = false
    } else {
      isMobileView.value = true
    }
  })

  window.addEventListener('load', () => {
    if (window.innerWidth >= 768) {
      isMobileView.value = false
    } else {
      isMobileView.value = true
    }
  })

  // ...::: [ ADMIN PANEL - GALLERY] :::...

  // Add img form validation

  //   Getting data

  const data = vref([])
  const systems = vref([])
  const fractions = vref([])

  const systemBtns = computed(() => {
    return systems.value ? ['all models', ...systems.value] : []
  })

  const currentSystem = vref('all models')
  const switchGallery = vref(true)

  // Filtereing system

  function chooseSystem(system) {
    switchGallery.value = !switchGallery.value
    if (system === systemBtns.value[0]) {
      currentSystem.value = system
    } else {
      currentSystem.value = system
    }
  }

  // Getting saved systems and fractions

  function getSystems() {
    const systemQuery = query(collection(db, 'systems'))
    onSnapshot(systemQuery, (querySnapshot) => {
      data.value = []

      systems.value = []
      fractions.value = []

      querySnapshot.forEach((doc) => {
        data.value.push(doc.data())
      })

      if (data.value.length !== 0) {
        data.value.forEach((system) => {
          systems.value.push(system.system)
        })
      } else return

      if (systems.value.length !== 0) {
        systems.value.forEach((fraction) => {
          fractions.value.push(fraction)
        })
      }
    })
  }

  // Image upload functions

  async function uploadImg(fileInputRef) {
    //   Storage refs

    const galleryStorageRef = ref(storageRef, 'gallery')
    const modelStorageRef = ref(
      galleryStorageRef,
      `${modelObj.system}/${modelObj.fraction}/${modelObj.model}`
    )

    //   Image upload to storage

    try {
      await uploadBytes(modelStorageRef, fileInputRef.value.files[0])
      await getDownloadURL(modelStorageRef).then((url) => {
        modelObj.url = url
      })
    } catch (err) {
      console.error(err)
    }
  }

  //   Delete Image

  async function deleteImg(systemId, fracationName, modelName) {
    const docRef = ref(storageRef, `gallery/${systemId}/${fracationName}/${modelName}`)

    await deleteObject(docRef).catch((err) => console.error(err))
  }

  // Data upload to firestore

  async function uploadDataToFireStore() {
    // Model tree

    const newModel = reactive({
      img: modelObj.url,
      model: modelObj.model
    })

    const newFraction = reactive({
      fraction: modelObj.fraction,
      images: [newModel]
    })

    const newSystem = reactive({
      system: modelObj.system,
      id: modelObj.system,
      fractions: [newFraction]
    })

    // Firestore Refs

    const fractionFbRef = doc(db, 'systems', newSystem.id)

    const fractionSnap = await getDoc(fractionFbRef)

    if (fractionSnap.exists()) {
      const fractionData = fractionSnap.data()
      const existingFraction = fractionData.fractions

      // Check if  the specific fraction exists
      const existingFractionIndex = existingFraction.findIndex(
        (fraction) => fraction.fraction === newFraction.fraction
      )
      if (existingFractionIndex !== -1) {
        existingFraction[existingFractionIndex].images.push(newModel)

        //   Update the document with the modified fraction array
        await updateDoc(fractionFbRef, { fractions: existingFraction })
      } else {
        await updateDoc(fractionFbRef, {
          fractions: arrayUnion(newFraction)
        })
      }
    } else {
      await setDoc(fractionFbRef, newSystem)
    }
  }

  //   Upload compete data

  async function uploadData(fileInputRef) {
    const onFormSubmit = await v.value.$validate()

    if (!onFormSubmit) return

    await uploadImg(fileInputRef)
    await uploadDataToFireStore()

    openModal()

    modelObj.system = ''
    modelObj.fraction = ''
    modelObj.model = ''
    modelObj.img = ''

    v.value.$reset()
  }

  //   Show modal after upload

  const showModal = vref(false)

  function openModal() {
    showModal.value = true
  }

  function closeModal() {
    modelObj.system = ''
    modelObj.fraction = ''
    modelObj.model = ''
    modelObj.url = ''
    showModal.value = false
  }

  useModal(showModal)

  return {
    isMobileView,

    modelObj,
    showModal,
    systems,
    fractions,
    systemBtns,
    currentSystem,
    switchGallery,
    data,
    v,
    uploadData,
    closeModal,
    getSystems,
    deleteImg,
    chooseSystem
  }
})
