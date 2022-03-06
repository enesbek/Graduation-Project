<template>
  <div class="main">
    <Menu class="menu"/>
    <ProjectMain class="project-main"/>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue'
import ProjectMain from '../components/ProjectMain.vue'

export default {
  name: 'DashBoard',
  components: {
    Menu,
    ProjectMain,
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
  background: url("https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
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