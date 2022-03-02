<template>
  <div class="container">
    <div class="title mt-4 ml-5 mb-5">Project Tracking System</div>
    <div class="menu">
      <router-link to="/dashboard" class="items"><button><i class="fas fa-home"></i>&ensp;Dashboard</button></router-link><hr>
      <router-link to="/projects" class="items"><button><fa icon="poll-h" />&ensp;Projects</button></router-link><hr>
      <router-link to="/dashboard" class="items"><button><fa icon="plus" />&ensp;Create New Project</button></router-link><hr>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  data() {
    return{
      title: "Project",
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  margin: 0;
  @apply text-2xl text-white;
  background: linear-gradient(rgb(3, 109, 133) , rgb(1, 45, 54));
}
.menu{
  @apply m-2 p-2;
}
.items{
  display: block;
  @apply text-white text-xl m-2 p-2;
  
}
.items:hover {
  background-color: #023336;
}

</style>
