<template>
  <auth>
    <form class="form-signin">
      <h1 class="h3 mb-3 fw-normal">Register</h1>
      <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name">
      <label for="floatingInput">Full Name</label>
      </div>
      <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Email Address</label>
      </div>
      <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
      </div>
      <div class="form-floating">
      <input type="password" class="form-control" id="floatingPasswordConfirmation" placeholder="Password">
      <label for="floatingPasswordConfirmation">Confirm Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
      <p class="mt-5 mb-3 text-muted">&copy; Tüm hakları saklıdır.</p>
    </form>
  </auth>
</template>

<script>
import Auth from '../components/Auth.vue'
export default {
  name: 'Register',
  components: {Auth}
}
</script>

<style scoped>

</style>