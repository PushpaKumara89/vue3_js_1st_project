<template>
  <app-header @open-login-modal="isLoginOpen = true" @open-sign-up-modal="isSignUpOpen= true"/>
  <div class="row justify-content-center">
    <router-view></router-view>
  </div>
  <login-modal v-if="isLoginOpen" @close-login="isLoginOpen = !isLoginOpen"/>
  <sign-up-modal v-if="isSignUpOpen" @close-sign-up="isSignUpOpen = !isSignUpOpen" @open-login-modal="isLoginOpen = true"/>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import LoginModal from './components/LoginModal.vue'
import SignUpModal from './components/SignUpModal.vue'

export default {
  components: { AppHeader, LoginModal, SignUpModal},
  data(){
        return {
          isLoginOpen : false,
          isSignUpOpen : false,
        }
    }

}
</script>

<style>

</style>