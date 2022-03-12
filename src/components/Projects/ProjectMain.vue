<template>
  <div class="page">
    <div class="project-field border-2 border-black">
      <p class="project-title text-white font-semibold text-2xl tracking-wider">
        <i class="fas fa-poll-h"></i> YOUR PROJECTS
      </p>
      <div class="projects">
        <div class="project" v-for="project in projects" :key="project.id">
          <div class="flex">
            <div class="project-name flex-initial h-10 border-2 pl-2 pt-1">
              <button class="border-2 border-black pl-2 pr-2">
                {{ project.ProjectName }}
              </button>
            </div>
            <button class="flex-initial w-32 border-2 ml-4">
              Boards
            </button>
            <button class="flex-initial w-32 border-2 ml-4">
              Members
            </button>
            <button class="flex-initial w-32 border-2 ml-4">
              Settings
            </button>
          </div>
          <div>{{ project.ProjectDescription }}</div>
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
import { ref } from "vue";
export default {
  components: {},
  data() {
    return {
      newProject: {
        ProjectName: "",
        ProjectDescription: "",
        StartDate: "",
        EndDate: "",
      },
      projects: [
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
      boards: [
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
    };
  },
  setup() {
    const modalActive = ref(true);
    return { modalActive };
  },
  methods: {
    addProject() {
      this.projects.push(this.newProject);
    },
  },
};
</script>


<style scoped>
.project-field {
  margin-top: 8rem;
  margin-left: 10rem;
  width: 65vw;
}
.projects {
  height: 15rem;
  @apply grid grid-cols-1 ;
}
.project {
  @apply text-white p-4 border-2 border-black ;
  height: 100%;
}
.project-name{
  width: 40vw;
}
</style>
