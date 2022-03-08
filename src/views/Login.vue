<template>
  <auth>
    <form class="form-signin">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name">
      <label for="floatingInput">Username</label>
      </div>
      <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
      </div>

      <router-link to="/dashboard"><button class="w-100 btn btn-lg btn-primary" type="submit"
        v-on:click="$store.commit('changeSidebarState')">Login</button></router-link>
      <p class="mt-5 mb-3 text-muted">&copy; Tüm hakları saklıdır.</p>
    </form>
  </auth>
</template>

<script>
import Auth from '../components/Home/Auth.vue'
export default {
  name: "Login",
  components: {Auth}
}
</script>

<style scoped>

</style>