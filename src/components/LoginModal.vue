<template>
    <section class="fed z-2" @click="$emit('close-login')"></section>
    <div class="main-wrf">
        <div class="m-auto bg-white p-3 rounded shadow z-3 w-25">
            <div class="p-3 border rounded">
                <h2 class="text-center pb-3">Login</h2>
                <form>
                   <!-- Email input -->
                    <div class="form-outline mb-4">
                        <input v-model="loginFrom.email" type="email" id="form3Example3" class="form-control" />
                        <label class="form-label" for="form3Example3">Email address</label>
                    </div>

                    <!-- Password input -->
                    <div class="form-outline mb-4">
                        <input v-model="loginFrom.password" type="password" id="form3Example4" class="form-control" />
                        <label class="form-label" for="form3Example4">Password</label>
                    </div>
                    <!-- Checkbox -->
                    <div class="form-check d-flex justify-content-center mb-4">
                        <input class="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                        <label class="form-check-label" for="form2Example33">
                            Subscribe to our newsletter
                        </label>
                    </div>

                    <!-- Submit button -->
                    <button @click="login()" type="button" class="btn btn-primary btn-block mb-4">Login</button>

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
  data(){
    return{
      loginFrom: {
        email: '',
        password:''
      },
    }
  },
  methods:{
    login(){
      console.log(this.loginFrom)
      this.$emit('close-login')
    },
  }

}
</script>

<style>
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
</style>