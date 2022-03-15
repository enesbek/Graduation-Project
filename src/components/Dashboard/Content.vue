<template>
  <div class="">
    <div class="project-field">
      <router-link to="/projects" class="project-title no-underline"><i class="fas fa-poll-h"></i> PROJECTS</router-link>
      <router-link to="/projects" class="projects no-underline">
        <div class="project" v-for="project in projects" :key="project.id" >
          <p>{{ project.ProjectName }}</p>
          <p>{{ project.ProjectDescription }}</p>
          <p clas="project-dates">End: {{ project.EndDate }}</p>
        </div>
      </router-link>
    </div>
    <div class="board-field">
      <router-link to="/board" class="board-title no-underline"><i class="fas fa-clipboard"></i> BOARDS</router-link>
      <div class="boards">
        <div class="board" v-for="board in boards" :key="board.id">
          <p>{{ board.BoardName }}</p>
          <router-link to="/board" tag="button" class="router text-white m-1 no-underline">Go To Board</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MainPage',
  data() {
    return {
      projects:[],
      boards:[
        {
          BoardName: "Searching Team Board",
        },
        {
          BoardName: "Database Team",
        },
        {
          BoardName: "Security Team Board",
        },
      ],
    }
  },
  mounted(){
    this.$store.dispatch('loadProjects')
  },
  computed: mapState([
      'projects'
  ]),
  
}
</script>


<style scoped>
/*
*{
  margin: 0;
  padding: 0;
}
.dashboard-container{
  height: 100vh;
  margin-top: -8rem;
  background: url("https://images.wallpaperscraft.com/image/single/starry_sky_night_trees_121201_1920x1080.jpg");
  background-repeat: none;
  background-size: cover;
}
.project-field{
  margin: 12rem;
  margin-top: 8rem;
  margin-bottom: 0;
  height: 13rem;
  padding: 1rem;
}
.project-title{
  @apply text-xl text-black;
}
.projects{
  height: 8rem;
  @apply grid grid-cols-4 grid-rows-1 m-2 p-1;
}
.project{
  background-color: #034d5e;
  border-radius: 3px;
  @apply m-1 text-white p-2;
  height: 100%;
}
.project-dates{
  position: absolute;
  vertical-align: bottom;
}
.board-field{
  margin: 12rem;
  margin-top: 2rem;
  height: 13rem;
  padding: 1rem;
}
.board-title{
  @apply text-xl text-black;
}
.boards{
  height: 8rem;
  @apply grid grid-cols-4 grid-rows-1 m-2 p-1;
}
.board{
  background-color: #034d5e;
  border-radius: 3px;
  @apply m-1 text-white p-2; 
}*/
</style>
