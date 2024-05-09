<template>
    <section class="fed z-2" @click="$emit('close-sign-up')"></section>
    <div class="main-wrf">
        <div class="m-auto bg-white p-3 rounded shadow z-3 d-with">
            <div class="p-3 border rounded">
                <h2 class="text-center pb-3">Sign Up</h2>
                <form>
                    <!-- 2 column grid layout with text inputs for the first and last names -->
                    <div class="row mb-4">
                        <div class="col">
                            <div class="form-outline">
                                <input v-model="formUser.first_name" type="text" id="form3Example1" class="form-control" />
                                <label class="form-label" for="form3Example1">First name</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-outline">
                                <input v-model="formUser.last_name" type="text" id="form3Example2" class="form-control" />
                                <label class="form-label" for="form3Example2">Last name</label>
                            </div>
                        </div>
                    </div>

                    <!-- Email input -->
                    <div class="form-outline mb-4">
                        <input v-model="formUser.username" type="email" id="form3Example3" class="form-control" />
                        <label class="form-label" for="form3Example3">Email address</label>
                    </div>

                    <!-- Password input -->
                    <div class="form-outline mb-4">
                        <input v-model="formUser.password" type="password" id="form3Example4" class="form-control"
                               :class="passwordField ? 'bg-color-error':passwordField==null ?'':'bg-color-fill'" />
                        <label class="form-label" for="form3Example4">Password</label>
                    </div>

                    <!-- confirm Password input -->
                    <div class="form-outline mb-4">
                        <input v-model="formUser.confirm_password" type="password" id="form3Example5" class="form-control"
                               :class="passwordField===true ? 'bg-color-error':passwordField===null ?'':'bg-color-fill'" />
                        <label class="form-label" for="form3Example5">Confirm Password</label>
                    </div>

                    <!-- Checkbox -->
                    <div class="form-check d-flex justify-content-center mb-4">
                        <input class="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                        <label class="form-check-label" for="form2Example33">
                            Subscribe to our newsletter
                        </label>
                    </div>

                    <!-- Submit button -->
                    <button :disabled="formValidation" @click="signUp()" type="button" class="btn btn-primary btn-block mb-4">Sign up</button>

                    <!-- Register buttons -->
                    <div class="text-center">
                        <p>or sign up with:</p>
                        <button type="button" class="btn btn-secondary btn-floating mx-1">
                            <i class="fab fa-facebook-f"></i>
                        </button>

                        <button type="button" class="btn btn-secondary btn-floating mx-1">
                            <i class="fab fa-google"></i>
                        </button>

                        <button type="button" class="btn btn-secondary btn-floating mx-1">
                            <i class="fab fa-twitter"></i>
                        </button>

                        <button type="button" class="btn btn-secondary btn-floating mx-1">
                            <i class="fab fa-github"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  computed:{
    passwordField(){
      if (this.formUser.confirm_password ==="" || this.formUser.password ===""){
        return null
      }
      return !(this.formUser.confirm_password === this.formUser.password)
    },
    formValidation(){
      if (
          !(this.formUser.confirm_password === this.formUser.password) ||
          this.formUser.confirm_password ==="" ||
          this.formUser.password ==="" ||
          this.formUser.first_name==="" ||
          this.formUser.last_name==="" ||
          this.formUser.username===""
      )return true
      return false
    }
  },
  data(){
    return {
      formUser :{
        first_name:'',
        last_name:'',
        username:'',
        password:'',
        confirm_password:''
      }
    }
  },
  methods:{
    signUp(){
      console.log(this.formUser)
      this.$emit('open-login-modal');
      this.$emit('close-sign-up');
    }
  }
}
</script>

<style>
.d-with{
  width: auto;
}
.fed {
    position: fixed;
    top: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.349);
}

.main-wrf {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.inner {
    width: 100px;
    height: 100px;
    background-color: blueviolet;
}
.bg-color-error{
  background-color: rgba(255, 0, 0, 0.49);
}
.bg-color-fill{
  background-color: rgba(0, 128, 0, 0.49);
}
</style>