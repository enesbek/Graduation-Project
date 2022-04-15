<template>
  <div class="assigned-project">
    <p class="project-title">ASSIGNED PROJECTS</p>
    <div class="projects">
      <div
        class="project"
        v-for="project in assignedProjects"
        :key="project.id"
      >
        <div class="flex">
          <div class="project-name">
            <router-link to="/project" class="project-routing">
              <span class="project-icon">{{ project.ProjectName[0] }}</span>
              {{ project.ProjectName }}
            </router-link>
          </div>
          <button class="flex-initial w-32 ml-4 project-btns">Boards(2)</button>
          <button class="flex-initial w-32 ml-4 project-btns">
            Members(16)
          </button>
          <button class="flex-initial w-32 ml-4 project-btns">
            <i class="fa-solid fa-gear"></i> Settings
          </button>
        </div>
        <div class="boards-area flex">
          <div
            class="board flex-intial"
            v-for="board in assignedBoards"
            :key="board.id"
          >
            <div
              class="board-inner font-semibold text-xl"
              :style="{
                background: 'url(' + board.image + ')',
                'background-size': 'cover',
              }"
            >
              <div class="p-2 text-white">{{ board.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assignedProjects: [
        {
          ProjectName: "Mobile App",
          ProjectDescription: "Build Full Stack Project",
          StartDate: "2022-03-10",
          EndDate: "2022-03-30",
        },
      ],
      assignedBoards: [
        {
          name: "Android",
          image:
            "https://i.pinimg.com/originals/c0/f3/bc/c0f3bcefc6ea726308b54c559d8ad84e.jpg",
        },
        {
          name: "IOS",
          image: "https://wallpaperaccess.com/full/875004.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.assigned-project {
  width: calc(100vw - 300px);
  padding-left: 80px;
  background-color: rgb(200, 200, 200);
}
.project-title {
  @apply font-semibold text-2xl tracking-wider;
}
.projects {
  @apply grid grid-cols-1;
}
.project {
  height: 100%;
  @apply mb-2;
}
.project-name {
  width: 40vw;
  @apply flex-initial h-10 pl-2 pt-1;
}
.project-routing {
  @apply text-black no-underline pl-2 pr-2 text-xl tracking-wide font-semibold;
}

.project-btns {
  background-color: rgb(225, 225, 225);
  border-radius: 5px;
}
.project-icon {
  background-color: #16858d;
  padding: 3px 8px;
  @apply text-xl flex-initial;
}
.board {
  margin: 1rem;
  width: 270px;
  height: 130px;
}
.board-inner {
  height: 130px;
  background-repeat: none;
  background-size: cover;
  border-radius: 5px;
}
</style>