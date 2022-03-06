<template>
  <div class="page">
    <div class="project-field">
      <p class="project-title text-black"><i class="fas fa-poll-h"></i> PROJECTS</p>
      <div class="projects">
        <div class="project" v-for="project in projects" :key="project.id">
          <p class="text-center text-xl">{{ project.ProjectName }}</p>
          <p>{{ project.ProjectDescription }}</p>
          <div class="project-dates">
            <p class="start-date">Start: {{ project.StartDate }}</p>
            <p class="end-date">End: {{ project.EndDate }}</p>
          </div>
        </div>
      </div>
    </div>
    
  </div>

</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      projects:[
        {
          ProjectName: "Project 2",
          ProjectDescription: "This is a sample Project",
          StartDate: "03.01.2021", 
          EndDate: "05.02.2021",
        },
        {
          ProjectName: "Project 3",
          ProjectDescription: "This is a sample Project",
          StartDate: "03.01.2021", 
          EndDate: "20.02.2021",
        },

      ],
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
}
</script>


<style lang="postcss">
  .project-field{
    margin: 12rem;
    margin-top: 8rem;
    margin-bottom: 0;
    height: 80%;
    padding: 1rem;
  }
  .project-title{
    @apply text-xl text-black;
  }
  .projects{
    height: 15rem;
    @apply grid grid-cols-3 grid-rows-1 m-2 p-1;
  }
  .project{
    background-color: #034d5e;
    border-radius: 3px;
    @apply m-5 text-white p-4;
    height: 100%;
    
  }
  .project-dates{
    position: absolute;
    vertical-align: bottom;
    margin-top: 5rem;
  }
  .end-date{
    margin-top: -1rem;
    margin-bottom: 0;
  }
</style>
