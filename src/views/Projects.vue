<template>
  <div class="main">
    <ProjectMain class="project-main" />
  </div>
</template>

<script>
import ProjectMain from '../components/Projects/ProjectMain.vue'
export default {
  name: 'DashBoard',
  components: {
    ProjectMain,
  },
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
  background-color: gray;
}

.menu{
  background-color: #187f86;
  margin: 0;
  width: 20rem;
  opacity: 0.8;
}
</style>