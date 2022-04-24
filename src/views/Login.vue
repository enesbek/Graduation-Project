<template>
  <auth>
    <div class="form-signin">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name" v-model="user.username">
      <label for="floatingInput">Username</label>
      </div>
      <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="user.password">
      <label for="floatingPassword">Password</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" v-on:click="login">Login</button>
      <p class="mt-5 mb-3 text-muted">&copy; Tüm hakları saklıdır.</p>
    </div>
    <div
      v-if="toggleOpenModal"
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
    >
      <div class="confirm-modal relative relative mx-auto max-w-4xl">
        <div class="loader"></div>
      </div>
    </div>
    <div
      v-if="toggleOpenModal"
      class="absolute z-40 inset-0 opacity-25 bg-black"
    ></div>
  </auth>
</template>

<script>
import Auth from '../components/Home/Auth.vue'
import AuthService from '../services/auth.service'

export default {
  name: "Login",
  components: {Auth},
  data() {
    return {
      toggleOpenModal: false,
      user:{
        username: '',
        password: '',
      }
    }
  },
  methods:{
    login(){
      this.toggleOpenModal = true;
      AuthService.login(this.user)
    }
  }
}
</script>

<style scoped>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>