<template>
  <div class="page">
    <div class="project-field">
      <button class="create-btn text-white" 
              data-bs-toggle="modal" 
              data-bs-target="#addProjectModal">CREATE NEW PROJECTS <i class="fas fa-plus"></i></button>
      
      <!-- Modal -->
      <div class="modal fade" id="addProjectModal" tabindex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addProjectModalLabel">Create New Project</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label for="exampleInputEmail1" class="form-label">Project Name</label>
              <input type="text" class="form-control" v-model="newProject.ProjectName">
              <label for="exampleInputEmail1" class="form-label">Project Description</label>
              <input type="text" class="form-control" v-model="newProject.ProjectDescription">
              <label for="exampleInputEmail1" class="form-label">Start Date</label>
              <input type="date" class="form-control" v-model="newProject.StartDate">
              <label for="exampleInputEmail1" class="form-label">End Date</label>
              <input type="date" class="form-control" v-model="newProject.EndDate">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-on:click="addProject">Create Project</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <p class="project-title text-white"><i class="fas fa-poll-h"></i> ALL PROJECTS</p>
      <div class="projects">
        <div class="project" v-for="project in projects" :key="project.id" data-bs-toggle="modal" 
              data-bs-target="#ProjectModal">
          <p class="text-center text-xl">{{ project.ProjectName }}</p>
          <div>{{ project.ProjectDescription }}</div>
          <div class="project-dates">
            <p class="start-date">Start: {{ project.StartDate }}</p>
            <p class="end-date">End: {{ project.EndDate }}</p>
          </div>
          <!-- -->
          <div class="modal fade text-black" id="ProjectModal" tabindex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="ProjectModalLabel">{{ project.ProjectName }}</h5>
                  <button type="button" class="btn" data-bs-dismiss="modal" aria-label="Close">Add User <fa icon="plus"/></button>
                </div>
                <div class="modal-body">
                  <label for="exampleInputEmail1" class="label text-black">{{ project.ProjectDescription }}</label>
                  <hr/>
                  <label for="exampleInputEmail1" class="label text-black">Start: {{ project.StartDate }}</label><hr>
                  <label for="exampleInputEmail1" class="label text-black">End: {{ project.EndDate }}</label>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          <!-- -->
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
      newProject:{
        ProjectName: "",
        ProjectDescription: "",
        StartDate: "", 
        EndDate: "",
      },
      projects:[
        {
          ProjectName: "Web Project",
          ProjectDescription: "Build Full Stack Project",
          StartDate: "2022-03-10", 
          EndDate: "2022-03-30",
        },
        {
          ProjectName: "IOS Project",
          ProjectDescription: "Build Mobile App for IOS",
          StartDate: "2022-01-02", 
          EndDate: "2022-04-01",
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

  methods:{
    addProject() {
      this.projects.push(this.newProject)
    }
  }
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
  .create-btn{
    margin-bottom: 2em;
    @apply text-xl;
  }
</style>
