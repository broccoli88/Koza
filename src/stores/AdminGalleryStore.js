import { defineStore } from 'pinia'
import { db } from '../firebase/db'
import { doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore'
import { reactive, ref } from 'vue'
import { useAdminStore } from './AdminStore'
import { useModal } from '../utils/modules/useModal'

export const useAdminGalleryStore = defineStore('adminGalleryStore', () => {
  const adminStore = useAdminStore()

  //   ...::: [ ADMIN PANEL ] :::...

  const isInAdminPanel = ref(false)

  // --- DELETE operations ---

  const fieldInfo = reactive({
    system: {
      title: '',
      id: '',
      toChange: false
    },
    fraction: {
      title: '',
      toChange: false
    },
    model: {
      title: '',
      url: '',
      toChange: false
    }
  })
  //   Delete system

  const showDeleteModal = ref(false)

  // Modal confirmation

  function openDeleteModal(systemName, systemId, fractionName = '', modelName = '') {
    showDeleteModal.value = true

    fieldInfo.system.title = systemName
    fieldInfo.system.id = systemId
    fieldInfo.fraction.title = fractionName
    fieldInfo.model.title = modelName

    if (fractionName === '' && modelName === '') {
      fieldInfo.system.toChange = true
      fieldInfo.fraction.toChange = false
      fieldInfo.model.toChange = false
    } else if (fractionName !== '' && modelName === '') {
      fieldInfo.system.toChange = false
      fieldInfo.fraction.toChange = true
      fieldInfo.model.toChange = false
    } else if (fractionName !== '' && modelName !== '') {
      fieldInfo.system.toChange = false
      fieldInfo.fraction.toChange = false
      fieldInfo.model.toChange = true
    }
  }

  async function submitDelete() {
    if (fieldInfo.system.toChange) {
      await deleteSystem()
    } else if (fieldInfo.fraction.toChange) {
      await deleteFraction()
    } else if (fieldInfo.model.toChange) {
      await deleteModel()
    }
    closeDeleteModal()
  }

  function closeDeleteModal() {
    showDeleteModal.value = false

    fieldInfo.system.title = ''
    fieldInfo.system.id = ''
    fieldInfo.fraction.title = ''
    fieldInfo.model.title = ''
    fieldInfo.system.toChange = false
    fieldInfo.fraction.toChange = false
    fieldInfo.model.toChange = false
  }

  async function deleteSystem() {
    const systemRef = doc(db, 'systems', fieldInfo.system.id)

    try {
      await deleteDoc(systemRef)
    } catch (err) {
      console.error(err)
    }
  }

  //   Delete fraction

  async function deleteFraction() {
    const docRef = doc(db, 'systems', fieldInfo.system.id)

    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        const fractionsData = data.fractions
        const index = fractionsData.findIndex(
          (fraction) => fraction.fraction === fieldInfo.fraction.title
        )

        if (index !== -1) {
          fractionsData.splice(index, 1)
          await updateDoc(docRef, { fractions: fractionsData })
        }
      } else {
        console.log('Document does not exist')
      }
    } catch (err) {
      console.error(err)
    }
  }

  //   Delete model

  async function deleteModel() {
    const docRef = doc(db, 'systems', fieldInfo.system.id)
    try {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        const fractionsData = [...data.fractions]
        const fractionIndex = fractionsData.findIndex(
          (fraction) => fraction.fraction === fieldInfo.fraction.title
        )

        if (fractionIndex !== -1) {
          const modelIndex = fractionsData[fractionIndex].images.findIndex(
            (model) => model.model === fieldInfo.model.title
          )

          if (modelIndex !== -1) {
            fractionsData[fractionIndex].images.splice(modelIndex, 1)

            if (fractionsData[fractionIndex].images.length === 0) {
              fieldInfo.system.toChange = false
              fieldInfo.fraction.toChange = true
              fieldInfo.model.toChange = false
              await deleteFraction()
            } else {
              await updateDoc(docRef, { fractions: fractionsData })
            }
          } else {
            console.log('Model does not exist')
          }
        } else {
          console.log('Fraction does not exist')
        }

        const newDocSnap = await getDoc(docRef)

        if (newDocSnap.exists()) {
          const newData = newDocSnap.data().fractions

          if (newData.length <= 0) {
            fieldInfo.system.toChange = true
            fieldInfo.fraction.toChange = false
            fieldInfo.model.toChange = false
            await deleteSystem(fieldInfo.model.title)
          }
        }
      } else {
        console.log('Document does not exist')
      }

      await adminStore.deleteImg(
        fieldInfo.system.id,
        fieldInfo.fraction.title,
        fieldInfo.model.title
      )
    } catch (err) {
      console.error(err)
    }
  }

  useModal(showDeleteModal)

  return {
    // Modal
    isInAdminPanel,

    // Delete
    showDeleteModal,
    fieldInfo,
    deleteSystem,
    deleteFraction,
    deleteModel,
    openDeleteModal,
    closeDeleteModal,
    submitDelete
  }
})
