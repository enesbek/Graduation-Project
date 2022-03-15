<template>
  <div class="projects">
    <div class="project mb-2" v-for="project in projects" :key="project.id">
      <div class="flex">
        <div class="project-name flex-initial h-10 pl-2 pt-1">
          <router-link
            to="/project"
            class="
              text-black
              no-underline
              pl-2
              pr-2
              text-xl
              tracking-wide
              font-semibold
            "
          >
            <span class="project-icon text-xl flex-initial">{{
              project.projectName[0]
            }}</span>
            {{ project.projectName }}
          </router-link>
        </div>
        <button
          class="flex-initial w-32 ml-4 project-btns"
          @click="printResult"
        >
          Boards(3)
        </button>
        <button class="flex-initial w-32 ml-4 project-btns">Members(8)</button>
        <button class="flex-initial w-32 ml-4 project-btns">
          <i class="fa-solid fa-gear"></i> Settings
        </button>
      </div>
      <div class="boards-area flex">
        <div class="flex-intial board" v-for="board in boards" :key="board.id">
          <div
            class="board-inner font-semibold text-xl"
            :style="{
              background: 'url(' + board.image + ')',
              'background-size': 'cover',
            }"
          >
            <div class="p-2">{{ board.name }}</div>
          </div>
        </div>
        <div class="flex-iitial board p-12 pl-14 create-board">
          <p>Create New Board</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      project: [],
      boards: [
        {
          name: "Listing",
          image:
            "https://mixkit.co/wp-content/uploads/2020/01/trello-backgournd-1024x512.jpg",
        },
        {
          name: "Homepage",
          image:
            "https://external-preview.redd.it/S3CqF19hBz9Yp9H-B7mTSBICv406vOYSSdah-B1dHzI.jpg?auto=webp&s=e5f5b18c31b87a04b9d9a59227e65e88ad245181",
        },
        {
          name: "Market Place",
          image:
            "https://embedwistia-a.akamaihd.net/deliveries/d5ae8190f0aa7dfbe0b01f336f29d44094b967b5.webp?image_crop_resized=1280x720",
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
};
</script>

<style scoped>
.projects {
  @apply grid grid-cols-1;
}
.project {
  height: 100%;
}
.project-name{
  width: 40vw;
}
.project-btns{
  background-color: rgb(225, 225, 225);
  border-radius: 5px;
}
.project-icon{
  background-color: #16858d;
  padding: 3px 8px;
}
.assigned-project{
  margin-top: 1rem;
  margin-left: 10rem;
  width: 65vw;
  background-color: rgb(200, 200, 200);
}
.bottomPage{
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
.boards-area {
}
.board{
  margin: 1rem;
  width: 270px;
  height: 130px;
}
.board-inner{
  height: 130px;
  background-repeat: none;
  background-size: cover;
  border-radius: 5px;
}
.create-board{
  background-color: rgb(225, 225, 225);
  border-radius: 5px;
}
</style>