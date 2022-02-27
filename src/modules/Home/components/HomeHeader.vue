<template>
  <div class="home-header text-white">
    <div class="navbar mt-2 text-lg">
      <router-link to="/login" class="home-login text-white mr-10 mt-4" v-show="!authShow">
        <button><i class="fa fa-user"></i>&ensp;Login&ensp;&ensp;</button>
      </router-link>
      <router-link to="/register" class="home-signup text-white mr-10 mt-4" v-show="!authShow">
        <button><i class="fa fa-user-plus"></i> Register</button>
      </router-link>
      <router-link to="/dashboard" class="home-signup text-white mr-10 mt-4" v-show="authShow">
        <button><i class="fa fa-user"></i> Dashboard</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import store from '../../../store'
export default {
  name: 'HomeHeader',
  props: {
    msg: String
  },
  computed: {
    authShow() {
      return store.getters.isAuthenticated
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home-header{
  height: 7%;
  background: linear-gradient(to right, rgb(3, 109, 133) , rgb(1, 45, 54));
  
}
.home-login{
  text-decoration: none;
  position: absolute;
  right: 6rem;
}
.home-signup{
  text-decoration: none;
  position: absolute;
  right: 0px;
}
.btn-login{
  @apply text-white;
  width: 10rem;
}
</style>
