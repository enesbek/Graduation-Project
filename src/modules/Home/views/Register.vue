<template>
  <auth>
    <form class="form-signin">
      <h1 class="h3 mb-3 fw-normal">Register</h1>
      <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name" 
              v-model="v$.user.fullName.$model">
      <label for="floatingInput">Full Name</label>
      <small v-if="v$.user.fullName.required.$invalid && v$.user.fullName.$error" class="text-red-500">Please Enter Full Name<br></small>
      </div>
      <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" 
              v-model="v$.user.email.$model">
      <label for="floatingInput">Email Address</label>
      <small v-if="v$.user.email.required.$invalid && v$.user.email.$error" class="text-red-500">Please Enter Emaill Address <br></small>
      <small v-if="v$.user.email.email.$invalid && v$.user.email.$error" class="text-red-500">Please Enter Valid Emaill Address</small>
      </div>
      <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" 
              v-model="v$.user.password.$model">
      <label for="floatingPassword">Password</label>
      <small v-if="v$.user.password.required.$invalid && v$.user.password.$error" class="text-red-500">Please Enter Password <br></small>
      <small v-if="v$.user.password.valid.$invalid && v$.user.password.$error" class="text-red-500">Password Must Contain Uppercase, Lowercase and Numeric Number!</small>
      </div>
      <div class="form-floating">
      <input type="password" class="form-control" id="floatingPasswordConfirmation" placeholder="Password" 
              v-model="v$.user.passwordConfirmation.$model">
      <label for="floatingPasswordConfirmation">Confirm Password</label>
      <small v-if="v$.user.passwordConfirmation.required.$invalid && v$.user.passwordConfirmation.$error" class="text-red-500">Please Confirm Password<br></small>
      <small v-if="v$.user.passwordConfirmation.sameAs.$invalid && v$.user.passwordConfirmation.$error" class="text-red-500">Password Are NOT Same!<br></small>
      </div>

      <router-link to="/login" class="text-white no-underline">
        <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
      </router-link>
      
      <p class="mt-5 mb-3 text-muted">&copy; Tüm hakları saklıdır.</p>
    </form>
  </auth>
</template>

<script>
import Auth from '../components/Auth.vue'
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'

export default {
  name: 'Register',
  components: {Auth},
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return{
      user: {
        fullName: null,
        email: null,
        password: null,
        passwordConfirmation: null,
      }
    }
  },
  validations() {
    return {
      user: {
        fullName: { required },
        email: { required, email},
        password: { required, 
                    valid: function(value) {
                      const containsUpperCase = /[A-Z]/.test(value)
                      const containsLowerCase = /[a-z]/.test(value)
                      const containsNumeric = /[0-9]/.test(value)

                      return containsUpperCase && containsLowerCase && containsNumeric
                    }           
        },
        passwordConfirmation: { required,
                                sameAs: sameAs(this.user.password)
        }, 
      }
    }
  }
}
</script>

<style scoped>

</style>