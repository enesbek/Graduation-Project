<template>
  <auth>
    <div class="form-signin">
      <div class="flex">
        <router-link to="/" class="home-route-btn">Home</router-link>
       <router-link to="/login"  class="home-route-btn">Login</router-link>
      </div>
      <h1 class="h3 mb-3 fw-normal">Register</h1>
      <div class="form-floating">
      <input type="text" class="form-control" placeholder="First Name" 
              v-model="v$.user.firstName.$model">
      <label for="floatingInput">First Name</label>
      <small v-if="v$.user.firstName.required.$invalid && v$.user.firstName.$error" class="text-red-500">Please Enter First Name<br></small>
      </div>
      <div class="form-floating">
      <input type="text" class="form-control" placeholder="Last Name" 
              v-model="v$.user.lastName.$model">
      <label for="floatingInput">Last Name</label>
      <small v-if="v$.user.lastName.required.$invalid && v$.user.lastName.$error" class="text-red-500">Please Enter Last Name<br></small>
      </div>
      <div class="form-floating">
      <input type="text" class="form-control" placeholder="Username" 
              v-model="v$.user.username.$model">
      <label for="floatingInput">User Name</label>
      <small v-if="v$.user.username.required.$invalid && v$.user.username.$error" class="text-red-500">Please Enter Username<br></small>
      </div>
      <div class="form-floating">
      <input type="email" class="form-control" placeholder="name@example.com" 
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

      <!--<router-link to="/login" class="text-white no-underline">-->
        <button class="w-100 btn btn-lg btn-primary" v-on:click="postRegister">Register</button>
      <!--</router-link>-->
      
      <p class="mt-5 mb-3 text-muted">&copy; Tüm hakları saklıdır.</p>
    </div>
  </auth>
</template>

<script>
import Auth from '../components/Home/Auth.vue'
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'
import AuthService from '../services/auth.service'
export default {
  name: 'Register',
  components: {
    Auth,
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return{
      user: {
        firstName: null,
        lastName: null,
        username: null,
        email: null,
        password: null,
        passwordConfirmation: null,
      }
    }
  },
  validations() {
    return {
      user: {
        firstName: { required },
        lastName: { required },
        username: { required }, 
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
  },
  methods: {
    postRegister() {
      AuthService.register(this.user)
    }
  }
}
</script>

<style scoped>
.home-route-btn{
  width: 150px;
  height: 30px;
  cursor: pointer;
  border: 2px solid rgb(79, 79, 79);
  @apply rounded font-semibold mb-4 mr-4 ml-4 text-black;
  text-decoration: none;
}
.home-route-btn:hover{
  @apply text-white;
  background-color: rgb(79, 79, 79);
}
</style>