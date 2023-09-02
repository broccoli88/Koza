import { defineStore } from 'pinia'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, email, helpers } from '@vuelidate/validators'
import { auth } from '../firebase/db'
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence
} from 'firebase/auth'
import { ref } from 'vue'
import router from '../router'

export const useLoginStore = defineStore('loginStore', () => {

    // ...::: [LOGIN VALIDATION ] :::...

    const loginState = ref({
        email: null,
        password: null,
        id: null
    })

    const rules = {
        email: {
            required: helpers.withMessage('State your email human!', required),
            minLength: minLength(3),
            maxLength: maxLength(30),
            email: helpers.withMessage('Wrong email human!', email),
            $autoDirty: true
        },
        password: {
            required: helpers.withMessage('State your password human!', required),
            minLength: minLength(6),
            maxLength: maxLength(20),
            $autoDirty: true
        }
    }

    const v = useVuelidate(rules, loginState.value)

    const clearInput = () => {
        loginState.value.email = ''
        loginState.value.password = ''
        v.value.$reset()
    }

    async function logIn() {
        const isLoginCorrect = await v.value.$validate()
        if (!isLoginCorrect) return


        try {
            await setPersistence(auth, browserSessionPersistence)
            await signInWithEmailAndPassword(auth, loginState.value.email, loginState.value.password)

            fetchUser()

            router.push('/admin-panel')

            clearInput()

        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('User not found')
                    break
                case 'auth/wrong-password':
                    alert('Wrong password')
                    break
                default:
                    console.log(error.message)
                    alert('Something went wrong')
            }

            return
        }
    }

    async function logOut() {
        await signOut(auth)
        loginState.value.email = null
        loginState.value.password = null
        router.push('/')
    }

    const userData = ref(null)

    function fetchUser() {
        onAuthStateChanged(auth, (user) => {
            if (user === null) {
                userData.value = null
            } else {
                userData.value = user.email
            }
        })
    }

    function goBack() {
        router.push('/')
    }

    return { loginState, v, userData, logIn, logOut, goBack, fetchUser, clearInput }
})
