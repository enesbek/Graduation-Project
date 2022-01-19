<template>
  <div class="menu">
    <div class="title mt-4 ml-5 mb-5">Project Tracking System</div>
    <div class="buttons">
      <div class="button"><button><i class="fas fa-home"></i>&ensp;Dashboard</button></div><hr>
      <div class="button"><button><i class="fas fa-bell"></i>&ensp;Notifications</button></div><hr>
      <div class="button"><button><i class="fas fa-calendar-week"></i>&ensp;Agenda</button></div><hr>
      <div class="button"><button> <i class="fas fa-tasks"></i>&ensp;My Tasks</button></div>
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
<style>
.menu{
  margin: 0;
  @apply text-2xl text-white;
  background: linear-gradient(rgb(3, 109, 133) , rgb(1, 45, 54));
}
.buttons{
  @apply text-xl m-2 p-2;
}

.button{
  @apply text-xl m-2 p-2;
}

.button:hover {
  background-color: #023336;
}

</style>
