<template>
  <div class="home-header text-white">
    <div class="navbar mt-2 text-lg">
      <router-link to="/dashboard" tag="button" class="home-login text-white mr-10 mt-4">Login</router-link>
      <div class="home-signup mr-10 mt-4">Sign-up</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  props: {
    msg: String
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
  right: 5rem;
}
.home-signup{
  text-decoration: none;
  position: absolute;
  right: 0px;
}
</style>
