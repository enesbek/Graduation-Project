<template>
  <div class="projects">
    <div class="project mb-2" v-for="project in assignedProjects" :key="project.id">
      <div class="flex">
        <div class="project-name" @click="gotoProject(project)">
          <span class="project-icon text-xl flex-initial">{{ project.projectName[0] }}</span>
          {{ project.projectName }}
        </div>
        
      </div>
      <div class="boards-area flex">
        <div class="flex-intial board" v-for="board in project.boards" :key="board.id">
          <div
            class="board-inner font-semibold text-xl"
            :style="{
              background: 'url(' + boardsimage[1].image + ')',
              'background-size': 'cover',
            }"
          >
            <div class="p-2">{{ board.board_name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import router from '../../router';
export default {
  data() {
    return {
      boardsimage: [
        {image: "https://storage.pixteller.com/designs/designs-images/2019-03-27/05/funny-background-drawing-backgrounds-cartoon-1-5c9b97d1c4d88.png",},
        {image: "https://storage.pixteller.com/designs/designs-images/2019-03-27/05/simple-background-backgrounds-passion-simple-1-5c9b95bd34713.png",},
        {image: "https://storage.pixteller.com/designs/designs-images/2019-03-27/04/business-background-backgrounds-business-1-5c9b8f72752bc.png",},
      ],
    };
  },
  mounted() {
    this.$store.dispatch("loadAssignedProjects");
  },
  computed: mapState(["assignedProjects"]),
  methods: {
    gotoProject(project) {
      this.$store.state.routingAssignedProject = project
      router.push('assignedproject')
    },
  },
};
</script>

<style scoped>
.projects {
  @apply grid grid-cols-1;
}
.project {
  height: 100%;
  @apply p-2 m-2;
}
.project-name {
  width: 40vw;
  cursor: pointer;
  @apply flex-initial h-10 pl-2 pt-1 text-xl tracking-wide font-semibold;
}
.project-btns {
  background-color: rgb(225, 225, 225);
  border-radius: 5px;
}
.project-icon {
  background-color: #16858d;
  padding: 3px 8px;
}
.assigned-project {
  margin-top: 1rem;
  margin-left: 10rem;
  width: 65vw;
  background-color: rgb(200, 200, 200);
}
.bottomPage {
  width: 100vw;
  height: 100%;
  background-color: rgb(200, 200, 200);
  padding-top: 1rem;
}
.boards {
  margin: auto;
  width: 70%;
  margin-top: 5em;
  height: 50vh;
}
.board {
  margin-right: 10px;
  margin-top: 15px;
  width: 200px;
  height: 90px;
}
.board-inner {
  height: 90px;
  background-repeat: none;
  background-size: cover;
  border-radius: 5px;
}
.create-board {
  height: 90px;
  border-radius: 5px;
  background-color: rgb(225, 225, 225);
  border-radius: 5px;
  @apply font-semibold text-xl;
}
</style>