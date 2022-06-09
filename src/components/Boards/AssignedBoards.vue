<template>
  <div class="project-boards">
    <div class="title font-bold text-2xl mt-2 mb-2">Assigned Project's Boards</div>
    <div class="boards-content rounded">
      <div class="boards-projects rounded">
        <div class="project col-span-1 rounded"
          v-for="project in assignedProjects"
          :key="project.id"
        >
          <div>
            <div class="font-semibold py-2 text-xl text-center">{{ project.projectName }}</div>
            <div class="boards-area col-span-1 ml-4">
              <div class="board" v-for="board in project.boards" :key="board.id" @click="gotoBoard">
                <div class="board-inner font-semibold text-lg mt-2" @click="gotoBoard(board)">
                  <div class="p-2">{{ board.board_name }}</div>
                  <div class="ml-2 mt-3 text-sm">Start: {{board.startDate}}</div>
                  <div class="ml-2 text-sm">End: &nbsp;{{board.endDate}}</div>
                </div>
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
import router from '../../router';
export default {
  data() {
    return {
      toggleCreateModal: false,
      newBoard: {
        boardName: null,
        boardDiscription: null,
        startDate: null,
        endDate: null,
        isFinished: false,
      },
    };
  },
  methods: {
    gotoBoard(board) {
      this.$store.state.routingBoard = board
      router.push('board')
    }
  },
  created() {
    this.$store.dispatch("loadAssignedProjects");
  },
  computed: {
    assignedProjects() {
      this.$store.state.assignedProjects.forEach(project => {
        project.boards.forEach(board => {
          board.startDate = board.startDate.slice(0,10)
          board.endDate = board.endDate.slice(0,10)
          if(board.endDate == "9999-12-31") {
            board.endDate = "---"
          }
        })
      })
      return this.$store.state.assignedProjects
    }
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
  @apply font-semibold;
}
.boards-content {
  height: 95%;
  margin: 0;
  overflow: auto;
  margin-bottom: 20px;
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

.board {
  margin: 20px;
  margin-top: 0px;
  width: 270px;
  height: 100px;
  box-shadow: 3px 5px 4px 5px #888888;
  cursor: pointer;
  @apply rounded;
}

.board:hover {
  box-shadow: 5px 10px 8px 10px #888888;
}

.board-inner {
  height: 100px;
  background-image: url("../../assets/board/board-background.png");
  background-repeat: no-repeat;
  background-size: cover;
  @apply rounded;
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
