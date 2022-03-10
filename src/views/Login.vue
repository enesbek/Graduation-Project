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
      user:{
        username: '',
        password: '',
      }
    }
  },
  methods:{
    login(){
      AuthService.login(this.user)
    }
  }
}
</script>

<style scoped>

</style>