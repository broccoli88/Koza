import { defineStore } from 'pinia'
import { storageRef } from '../firebase/db'
import { ref as vref } from 'vue'
import { ref, getDownloadURL, listAll } from 'firebase/storage'

export const useFireBaseStore = defineStore('fbStore', () => {
  const currentSystems = vref([])
  const currentFractions = vref([])
  const currentModels = vref([])

  const imagesRef = ref(storageRef, 'images')

  async function getSystemsRef() {
    await listAll(imagesRef).then((res) => {
      res.prefixes.forEach((system) => {
        currentSystems.value.push(system.name)
      })
    })
  }

  async function getFractionsRef(systemsArr) {
    for (let system of systemsArr.value) {
      const systemRef = ref(imagesRef, system)
      await listAll(systemRef).then((res) => {
        res.prefixes.forEach((fraction) => {
          currentFractions.value.push({ name: fraction.name, path: fraction.fullPath })
        })
      })
    }
  }

  async function getModelsRef(fractionArr) {
    for (let fraction of fractionArr.value) {
      const fractionRef = ref(storage, fraction.path)
      await listAll(fractionRef).then((res) => {
        res.items.forEach((model) => {
          getUrl(model)
        })
      })
    }
  }

  async function getUrl(model) {
    const modelRef = ref(storage, model.fullPath)
    await getDownloadURL(modelRef).then((url) => {
      currentModels.value.push({ name: model.name, path: model.fullPath, url: url })
    })
  }

  async function getModels() {
    await getSystemsRef()
    await getFractionsRef(currentSystems)
    await getModelsRef(currentFractions)
  }

  return { getModels }
})
