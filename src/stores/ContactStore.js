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
import { ref } from 'vue'

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

    const inputData = ref({
        firstName: { label: 'First Name', placeholder: 'Enter name...', id: 'name' },
        lastName: { label: 'Last Name', placeholder: 'Enter last name...', id: 'last-name' },
        email: { label: 'Email', placeholder: 'Enter email...', id: 'email' },
        subject: { label: 'Subject', placeholder: 'Enter subject...', id: 'subject' },
        message: { label: 'Message', placeholder: 'What is your question ugly human?', id: 'message' },
        country: { label: 'Country', placeholder: 'Where do you came from?', id: 'country' },
        supply: { label: 'How are you supplying us with models?', placeholder: '--select an option--', id: 'supply' },
        service: {
            label: 'We offer:',
            placeholder: { assemble: 'Assemble', painting: 'Painting', basing: 'Basing', cleaning: 'Cleaning' },
            id: { assemble: 'assemble', painting: 'aainting', basing: 'basing', cleaning: 'cleaning' },
        },

    })

    const rules1 = {
        firstName: {
            required: helpers.withMessage('Give me your name human!', required),
            minLength: minLength(3),
            maxLength: maxLength(15),
            $autoDirty: true,
            $lazy: true
        },
        lastName: {
            required: helpers.withMessage('Give me your last name human!', required),
            minLength: minLength(3),
            maxLength: maxLength(15),
            $autoDirty: true,
            $lazy: true
        },
        email: {
            required: helpers.withMessage('Forgot your email human...?', required),
            email,
            maxLength: maxLength(40),
            $autoDirty: true,
            $lazy: true
        },
        subject: {
            required: helpers.withMessage(
                'Enter what this message is about human...',
                required
            ),
            $lazy: true
        },

        message: {
            required: helpers.withMessage('State your business human...??', required),
            minLength: minLength(3),
            maxLength: maxLength(1000),
            $autoDirty: true,
            $lazy: true
        }
    }

    //   Question Form

    const questionState = ref({
        type: 'message',
        checked: false,
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    })

    const v1 = useVuelidate(rules1, questionState.value)

    async function handleQuestionForm() {
        const isFormCorrect = await v1.value.$validate()

        if (!isFormCorrect) return

        await createMessage(questionState.value)
        questionState.value.firstName = ''
        questionState.value.lastName = ''
        questionState.value.email = ''
        questionState.value.subject = ''
        questionState.value.message = ''

        v1.value.$reset()

        showModal.value = true
    }

    //   Quote Form


    const quoteState = ref({
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
            required: helpers.withMessage('Give me your name human!', required),
            minLength: minLength(3),
            maxLength: maxLength(15),
            $autoDirty: true,
            $lazy: true
        },
        lastName: {
            required: helpers.withMessage('Give me your last name human!', required),
            minLength: minLength(3),
            maxLength: maxLength(15),
            $autoDirty: true,
            $lazy: true
        },
        email: {
            required: helpers.withMessage('Forgot your email human...?', required),
            email,
            maxLength: maxLength(40),
            $autoDirty: true,
            $lazy: true
        },
        country: {
            required: helpers.withMessage(
                "You know where you came from, ain't ya, human?  ",
                required
            ),
            minLength: minLength(3),
            maxLength: maxLength(15),
            $autoDirty: true,
            $lazy: true
        },
        modelSupply: {
            required: helpers.withMessage('You must pick something human! ', required),
            $lazy: true
        },
        service: {
            required: helpers.withMessage('You know what you want , right human?', required),
            $lazy: true
        },
        message: {
            required: helpers.withMessage('State your business human...', required),
            minLength: minLength(3),
            maxLength: maxLength(1000),
            $autoDirty: true,
            $lazy: true
        }
    }

    const v2 = useVuelidate(rules2, quoteState.value)

    const handleQuoteForm = async () => {
        const isFormCorrect = await v2.value.$validate()

        if (!isFormCorrect) return

        await createMessage(quoteState.value)

        quoteState.value.firstName = ''
        quoteState.value.lastName = ''
        quoteState.value.email = ''
        quoteState.value.country = ''
        quoteState.value.modelSupply = ''
        quoteState.value.service = []
        quoteState.value.message = ''

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
        inputData,
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
