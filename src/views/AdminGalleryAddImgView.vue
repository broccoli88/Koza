<script setup>
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import ButtonEl from '../template/ButtonEl.vue'
import ModalAdminAddImg from '../components/ModalAdminAddImg.vue'
import { computed, reactive, ref } from 'vue'
import { useAdminStore } from '../stores/AdminStore'
import { storeToRefs } from 'pinia'

const adminStore = useAdminStore()
const { modelObj, systems, data, v } = storeToRefs(adminStore)

const systemSelect = ref()
const fractionSelect = ref()
const fileInput = ref()

const doesExists = reactive({
  system: true,
  fraction: true
})

// Add System

const chooseFromExisistngSystem = () => {
  doesExists.system = !doesExists.system
  modelObj.value.system = ''

  if (!systemSelect.value) return
  systemSelect.value.selectedIndex = 0
}
const systemBtnOption = computed(() => {
  return !doesExists.system ? 'Existing System' : 'Add new system'
})

// Add Fracation

const chooseFromExisistngFraction = () => {
  doesExists.fraction = !doesExists.fraction
  modelObj.value.fraction = ''

  if (!fractionSelect.value) return
  fractionSelect.value.selectedIndex = 0
}
const fractionBtnOption = computed(() => {
  return !doesExists.fraction ? 'Existing Fraction' : 'Add new fraction'
})

// Add file

const addFile = (e) => {
  if (!e.target.files[0]) {
    modelObj.value = ''
    return
  }
  modelObj.value.img = e.target.files[0].name
}

// Get existing fractions and systems
const uploadData = async () => {
  await adminStore.uploadData(fileInput)
}
adminStore.getSystems()
</script>

<template>
  <section class="container">
    <form action="" class="form" @submit.prevent="uploadData">
      <section class="form__section">
        <fieldset class="form__fieldset">
          <legend>Choose/Add System</legend>
          <span
            @click="chooseFromExisistngSystem"
            class="btn--small btn--outline-black btn--slide-black form__btn"
          >
            {{ systemBtnOption }}
          </span>
          <FadeTransition>
            <div v-if="doesExists.system" class="form__input-container">
              <label for="system">Choose system</label>
              <select
                id="system"
                name="system"
                class="form__input"
                v-model="modelObj.system"
                @blur="v.system.$touch"
                ref="systemSelect"
              >
                <option disabled selected value>-- Select an option --</option>
                <option :value="system" v-for="system in systems" :key="system">
                  {{ system }}
                </option>
              </select>
              <p v-if="v.system.$error" class="error">{{ v.system.$errors[0].$message }}</p>
            </div>
            <div v-else class="form__input-container">
              <label for="system">Add new system</label>
              <input
                type="text"
                id="system"
                name="system"
                placeholder="Enter new system name..."
                class="form__input"
                v-model.trim="modelObj.system"
                @blur="v.system.$touch"
              />
              <p v-if="v.system.$error" class="error">{{ v.system.$errors[0].$message }}</p>
            </div>
          </FadeTransition>
        </fieldset>
      </section>
      <section class="form__section">
        <fieldset class="form__fieldset">
          <legend>Choose/Add Fraction</legend>
          <span
            @click="chooseFromExisistngFraction"
            class="form__btn btn--small btn--outline-black btn--slide-black"
          >
            {{ fractionBtnOption }}
          </span>
          <FadeTransition>
            <div v-if="doesExists.fraction" class="form__input-container">
              <label for="fraction">Choose fraction</label>
              <select
                id="fraction"
                name="fraction"
                class="form__input"
                v-model="modelObj.fraction"
                @blur="v.fraction.$touch"
                ref="fractionSelect"
              >
                <option disabled selected value>-- Select an option --</option>
                <optgroup
                  :label="system.toUpperCase().split('-').join(' ')"
                  v-for="{ system, fractions } in data"
                  :key="system"
                >
                  <option :value="fraction.fraction" v-for="fraction in fractions" :key="fraction">
                    {{ fraction.fraction.split('-').join(' ') }}
                  </option>
                </optgroup>
              </select>
              <p v-if="v.fraction.$error" class="error">{{ v.fraction.$errors[0].$message }}</p>
            </div>
            <div v-else class="form__input-container">
              <label for="fraction">Add new fraction</label>
              <input
                type="text"
                id="fraction"
                name="fraction"
                placeholder="Enter new fraction name..."
                class="form__input"
                v-model.trim="modelObj.fraction"
                @blur="v.fraction.$touch"
              />
              <p v-if="v.fraction.$error" class="error">{{ v.fraction.$errors[0].$message }}</p>
            </div>
          </FadeTransition>
        </fieldset>
      </section>
      <section class="form__section">
        <fieldset class="form__fieldset">
          <legend>Add Model</legend>
          <div class="form__input-container">
            <label for="model">Enter model name</label>
            <input
              type="text"
              id="model"
              name="model"
              placeholder="Enter models name..."
              class="form__input"
              v-model.trim="modelObj.model"
              @blur="v.model.$touch"
            />
            <p v-if="v.model.$error" class="error">{{ v.model.$errors[0].$message }}</p>
          </div>
          <div class="form__input-container">
            <label for="file">Choose image to upload</label>
            <input
              type="file"
              id="file"
              name="file"
              placeholder="Enter models name..."
              class="form__input"
              ref="fileInput"
              @blur="v.img.$touch"
              @change="addFile"
            />
            <p v-if="v.img.$error" class="error">{{ v.img.$errors[0].$message }}</p>
          </div>
        </fieldset>
      </section>
      <ButtonEl class="btn--medium btn--outline-black btn--slide-black">Submit</ButtonEl>
    </form>
    <ModalAdminAddImg />
  </section>
</template>

<style lang="scss" scoped>
.container {
  margin: $margin-admin;
  display: grid;

  h3 {
    margin-bottom: 3rem;
  }

  .btns {
    display: flex;
    gap: 3rem;
    margin-bottom: 2rem;
  }

  .form {
    // max-width: 70ch;
    display: grid;
    gap: 3vw;
  }

  .form__section {
    padding-bottom: 2rem;
    border-bottom: $bw-05 solid $bc-grayopacity-05;
  }

  .form__fieldset {
    padding: 2rem;
    border-radius: 7px;
    border: $bw-1 solid $bc-grayopacity-05;

    justify-content: stretch;

    .form__btn {
      line-height: 1.2;
      padding: 0.4em 1em 0.2em;
    }
  }

  .form__input-container {
    margin-block: 2rem;
    display: grid;
    gap: 0.7rem;

    .form__input {
      @include form-input;
      order: initial;
    }

    .error {
      @include error;
    }
  }
}
</style>
