import { defineStore } from 'pinia'
import { useModal } from '../utils/modules/useModal.js'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'
import { db } from '../firebase/db'
import {
      collection,
      addDoc,
      onSnapshot,
      deleteDoc,
      doc,
      query,
      updateDoc
} from 'firebase/firestore'
import { ref, reactive } from 'vue'

export const useContactStore = defineStore('contactStore', () => {
      const questionForm = ref(true)

      // Form Card switch

      const switchToQuestionForm = () => {
            questionForm.value = true
      }

      const switchToQuoteForm = () => {
            questionForm.value = false
      }

      //   ...::: [ MODAL ] :::...

      const showModal = ref(false)

      function closeModal() {
            showModal.value = false
      }

      useModal(showModal)

      //   ...::: [ FORMS ] :::...

      async function createMessage(data) {
            const colRef = collection(db, 'messages')
            data.date = new Date().toLocaleString()
            await addDoc(colRef, data)
      }

      //   Validation Rules

      const rules1 = {
            firstName: {
                  required,
                  minLength: minLength(3),
                  maxLength: maxLength(15),
                  $autoDirty: true,
                  $lazy: true
            },
            lastName: {
                  required,
                  minLength: minLength(3),
                  maxLength: maxLength(15),
                  $autoDirty: true,
                  $lazy: true
            },
            email: {
                  required: helpers.withMessage('Enter email', required),
                  email,
                  maxLength: maxLength(40),
                  $autoDirty: true,
                  $lazy: true
            },
            subject: {
                  required: helpers.withMessage('Enter what this message is about...', required),
                  $lazy: true
            },

            message: {
                  required,
                  minLength: minLength(3),
                  maxLength: maxLength(1000),
                  $autoDirty: true,
                  $lazy: true
            }
      }

      //   Question Form

      const questionState = reactive({
            type: 'message',
            checked: false,
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: ''
      })

      const v1 = useVuelidate(rules1, questionState)

      async function handleQuestionForm() {
            const isFormCorrect = await v1.value.$validate()

            if (!isFormCorrect) return

            await createMessage(questionState)
            questionState.firstName = ''
            questionState.lastName = ''
            questionState.email = ''
            questionState.subject = ''
            questionState.message = ''

            v1.value.$reset()

            showModal.value = true
      }

      //   Quote Form

      const quoteState = reactive({
            type: 'quote',
            checked: false,
            firstName: '',
            lastName: '',
            email: '',
            country: '',
            modelSupply: '',
            service: [],
            message: ''
      })

      const rules2 = {
            firstName: {
                  required,
                  minLength: minLength(3),
                  maxLength: maxLength(15),
                  $autoDirty: true,
                  $lazy: true
            },
            lastName: {
                  required,
                  minLength: minLength(3),
                  maxLength: maxLength(15),
                  $autoDirty: true,
                  $lazy: true
            },
            email: {
                  required: helpers.withMessage('Enter email', required),
                  email,
                  maxLength: maxLength(40),
                  $autoDirty: true,
                  $lazy: true
            },
            country: {
                  required,
                  minLength: minLength(3),
                  maxLength: maxLength(15),
                  $autoDirty: true,
                  $lazy: true
            },
            modelSupply: {
                  required: helpers.withMessage('Select an option', required),
                  $lazy: true
            },
            service: {
                  required: helpers.withMessage('At least one option must be selected', required),
                  $lazy: true
            },
            message: {
                  required,
                  minLength: minLength(3),
                  maxLength: maxLength(1000),
                  $autoDirty: true,
                  $lazy: true
            }
      }

      const v2 = useVuelidate(rules2, quoteState)

      const handleQuoteForm = async () => {
            const isFormCorrect = await v2.value.$validate()

            if (!isFormCorrect) return

            await createMessage(quoteState)

            quoteState.firstName = ''
            quoteState.lastName = ''
            quoteState.email = ''
            quoteState.country = ''
            quoteState.modelSupply = ''
            quoteState.service = []
            quoteState.message = ''

            v2.value.$reset()

            showModal.value = true
      }

      // ...::: [ ADMIN PANEL - MESSAGES] :::...

      const messages = ref([])
      const messageId = ref('')
      const showDeleteMessageModal = ref(false)

      async function getMessages() {
            const m = query(collection(db, 'messages'))
            onSnapshot(m, (snap) => {
                  messages.value = []
                  snap.forEach((doc) => {
                        messages.value.push({ ...doc.data(), id: doc.id })
                  })
            })
      }

      function openDeleteMessgeModal(id) {
            messageId.value = id
            showDeleteMessageModal.value = true
      }

      function closeDeleteMessageModal() {
            showDeleteMessageModal.value = false
            messageId.value = ''
      }

      async function deleteMessage() {
            const docRef = doc(db, 'messages', messageId.value)
            await deleteDoc(docRef)

            closeDeleteMessageModal()
      }

      //   Check if message was read

      async function checkIfMessageWasRead(id, checked) {
            const messageRef = doc(db, 'messages', id)

            try {
                  if (!checked) {
                        setTimeout(async () => {
                              await updateDoc(messageRef, { checked: true })
                        }, 800)
                  } else return
            } catch (err) {
                  console.error(err)
            }
      }

      useModal(showDeleteMessageModal)

      return {
            questionForm,
            questionState,
            quoteState,
            v1,
            v2,
            showModal,
            messages,
            showDeleteMessageModal,

            switchToQuestionForm,
            switchToQuoteForm,
            handleQuestionForm,
            handleQuoteForm,
            closeModal,
            checkIfMessageWasRead,
            getMessages,
            deleteMessage,
            openDeleteMessgeModal,
            closeDeleteMessageModal
      }
})
