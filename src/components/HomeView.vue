<template>
    <app-header :isLoggedIn="isLoggedIn" @open-login-modal="isLoginOpen = true" @open-sign-up-modal="isSignUpOpen = true"
        @logOut="isLoggedIn = !isLoggedIn" />
    <div class="row justify-content-center">
        <router-view></router-view>
    </div>
    <login-modal v-if="isLoginOpen" @close-login="isLoginOpen = !isLoginOpen" @login="logIn()" />
    <sign-up-modal v-if="isSignUpOpen" @close-sign-up="isSignUpOpen = !isSignUpOpen"
        @open-login-modal="isLoginOpen = !isLoginOpen" />
  
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import LoginModal from '../components/LoginModal.vue'
import SignUpModal from '../components/SignUpModal.vue'

export default {
    components: { AppHeader, LoginModal, SignUpModal },
    data() {
        return {
          url:'',
            isLoginOpen: false,
            isSignUpOpen: false,
            isLoggedIn: false
        }
    },
    methods: {
        logIn() {
            this.isLoggedIn = !this.isLoggedIn
            this.isLoginOpen = !this.isLoginOpen;
        }
    }
}
</script>

<style></style>
