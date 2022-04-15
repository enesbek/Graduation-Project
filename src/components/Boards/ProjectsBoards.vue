<template>
  <div class="project-boards">
    <div class="title font-bold text-2xl mt-2 mb-2">Project's Boards</div>
    <div class="boards-content">
      <div class="boards-projects">
        <div class="project col-span-1"
          v-for="project in projects"
          :key="project.id"
        >
          <div>
            <div class="font-semibold pl-4 pt-2 text-xl">{{ project.projectName }}</div>
            <div class="boards-area col-span-1">
              <div class="board" v-for="board in boards" :key="board.id" @click="gotoBoard">
                <div
                  class="board-inner font-semibold text-lg"
                  :style="{
                    background: 'url(' + image2 + ')',
                    'background-size': 'cover',
                  }"
                >
                  <div class="p-2 text-white">Search</div>
                </div>
              </div>
              <div class="create-board text-xl font-semibold">
                Create New Board
                <br /><span class="text-4xl font-semibold">+</span>
              </div>
            </div>
          </div>
          <hr class="mx-4">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import router from "../../router";

export default {
  data() {
    return {
      project: [],
      image1: "https://mixkit.co/wp-content/uploads/2020/01/trello-backgournd-1024x512.jpg",
      image2: "https://external-preview.redd.it/S3CqF19hBz9Yp9H-B7mTSBICv406vOYSSdah-B1dHzI.jpg?auto=webp&s=e5f5b18c31b87a04b9d9a59227e65e88ad245181",
      boards: [
        {
          name: "Android",
          image:
            "https://i.pinimg.com/originals/c0/f3/bc/c0f3bcefc6ea726308b54c559d8ad84e.jpg",
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("loadProjects");
  },
  computed: mapState(["projects"]),
  methods: {
    gotoBoard() {
      router.push('board')
    },
  },
};
</script>

<style scoped>
.project-boards {
  height: 93%;
  width: 100;
}
.title {
  width: 100;
  text-align: center;
  margin-bottom:
  @apply font-semibold;
}
.boards-content {
  height: 95%;
  margin: 0;
  overflow: auto;
  margin-bottom: 20px;
}
.boards-projects {
}
.project {
  @apply mx-2 pb-4;
  background-color: white;
  margin-bottom: -1rem;
}
.boards {
  margin: auto;
  width: 70%;
  margin-top: 5em;
  height: 50vh;
}
.boards-area {
}
.board {
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 270px;
  height: 100px;
}
.board-inner {
  height: 100px;
  background-repeat: none;
  background-size: cover;
  border-radius: 5px;
}

.create-board {
  width: 80%;
  margin: auto;
  height: 100px;
  @apply bg-gray-300 text-center rounded;
  text-align: center;
  padding-top: 5%;
}

.create-board:hover {
  background-color: #034d5e;
  @apply text-white text-xl;
  cursor: pointer;
}
</style>
