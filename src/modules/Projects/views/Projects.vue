<template>
  <div class="main">
    <Menu class="menu"/>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue'

export default {
  name: 'DashBoard',
  components: {
    Menu,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  margin: 0;
  padding: 0;
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  background: url("https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80");
  background-repeat: none;
  background-size: cover;
}

.menu{
  background-color: #187f86;
  margin: 0;
  width: 20rem;
  opacity: 0.8;
}
</style>