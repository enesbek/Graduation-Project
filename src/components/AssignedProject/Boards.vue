<template>
  <div class="boards">
    <div class="boards-title">
      <p class="text-2xl font-semibold tracking-wide ml-4 mt-2">
        <fa icon="clipboard"></fa> Boards
      </p>
    </div>
    <div class="grid grid-cols-3">
      <div
        class="board create-board"
        @click="toggleCreateModal = !toggleCreateModal"
      >
        <div class="board-inner font-semibold text-xl">
          <div class="font-normal text-lg">Create New Board</div>
        </div>
      </div>
      <div class="board" v-for="board in assignedBoards" :key="board.id">
        <div
          class="board-inner font-semibold text-xl"
          :style="{
            background: 'url(https://storage.pixteller.com/designs/designs-images/2019-03-27/05/simple-background-backgrounds-passion-simple-1-5c9b95bd34713.png)',
            'background-size': 'cover',
          }"
          @click="gotoBoard(board)"
        >
          <div class="p-2">{{ board.board_name }}</div>
          <div class="ml-2 mt-8 text-sm">Start: {{board.startDate}}</div>
          <div class="ml-2 text-sm">End: &nbsp;{{board.endDate}}</div>
        </div>
      </div>
      
    </div>
    <div class="mt-4">
      <p class="text-2xl font-semibold tracking-wide ml-4 mt-2">
        <i class="fa-solid fa-laptop-code"></i> Tasks
      </p>
    </div>
    <div class="project-task-area">
      <div v-for="task in projectTasks" :key="task.id">
        <div class="flex-intial task" v-if="this.user.id == task.receiverUserId">
          <div
            class="task-inner font-semibold text-xl"
            @click="opentask(task)"
          >
            <div class="p-2 font-semibold">{{task.jobTitle}}</div>
            <div class="p-2 text-sm">End: {{task.endDate}}</div>
          </div>
        </div>
      </div>
      
    </div>
    <Task v-if="taskStatus"/>
    <!-- Modal Start-->
    <div
      v-if="toggleCreateModal"
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
    >
      <div class="create-modal relative mx-auto w-auto max-w-4xl flex">
        <div class="bg-white w-full shadow-2xl max-w-2xl flex flex-col rounded">
          <div class="modal-title text-lg">
            Create Board
            <button class="modal-close-btn" @click="toggleCreateModal = false">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <hr class="mt-1" />
          </div>
          <img class="modal-img" src="../../assets/board/create-modal.png" />
          <div class="ml-6 mt-2">
            <span class="text-sm font-semibold">Board Title</span><br />
            <input
              class="modal-board-title border-2 border-gray-600 rounded pl-2 p-1"
              v-model="newBoard.boardName"
            /><br />
            <span class="text-sm">* Title is required</span><br />
          </div>
          <div class="ml-6 mb-2 mt-2">
            <span class="text-sm font-semibold">Board Description</span><br />
            <textarea
              class="modal-board-description border-2 border-gray-600 rounded w-64 h-24 pl-2 pt-1"
              v-model="newBoard.boardDescription"
            ></textarea
            ><br />
            <span class="text-sm">* You can give details about the Board</span
            ><br />
          </div>
          <div class="ml-6 mb-2">
            <span class="text-sm font-semibold"
              >Start Date &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; End
              Date</span
            ><br />
            <input
              type="date"
              class="dates border-2 border-gray-600 rounded"
              v-model="newBoard.startDate"
            />
            <input
              type="date"
              class="dates border-2 border-gray-600 rounded ml-4"
              v-model="newBoard.endDate"
            />
          </div>
          <div class="ml-6 mt-2">
            <span class="text-sm font-semibold">Add people to board</span><br />
            <input
              class="modal-board-title border-2 border-gray-600 rounded pl-2 p-1"
            /><br />
          </div>
          <button
            class="modal-create-btn rounded bg-gray-300 px-6 py-2 w-3/12"
            @click="createNewProjectBoard"
          >
            Create
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="toggleCreateModal"
      class="absolute z-40 inset-0 opacity-25 bg-black"
    ></div>

    <!-- Modal Finish-->
  </div>
</template>

<script>
import router from "../../router";
import Task from './Task.vue';
export default {
  components: {
    Task,
  },
  data() {
    return {
      toggleCreateModal: false,
      newBoard: {
        boardName: null,
        boardDescription: null,
        startDate: null,
        endDate: null,
        isFinished: false,
      },
      boards: [],
      taskStatus: false,
    };
  },
  methods: {
    opentask(task){
      this.$store.dispatch("routingTask", task.id);
      this.taskStatus = !this.taskStatus;
    },
    createNewProjectBoard() {
      this.toggleCreateModal = false;
      this.$store.dispatch("createProjectBoard", this.newBoard);
    },
    gotoBoard(board){
      this.$store.state.routingBoard = board
      router.push('board')
    }
  },
  created() {
    this.$store.dispatch("loadAssignedProjectBoards");
    this.$store.dispatch("loadAssignedProjectTasks")
    this.$store.dispatch("loadUser");
  },
  computed: {
    assignedBoards() {
      this.$store.state.assignedProjectBoards.forEach(board => {
        board.startDate = board.startDate.slice(0,10)
        board.endDate = board.endDate.slice(0,10)
      })
      return this.$store.state.assignedProjectBoards
    },
    assignedProject() {
      return this.$store.state.routingAssignedProject
    },
    projectTasks() {
      this.$store.state.projectTasks.forEach(task => {
        task.startDate = task.startDate.slice(0,10)
        task.endDate = task.endDate.slice(0,10)
      })
      return this.$store.state.projectTasks
    },
    user() {
      return this.$store.state.user
    },
  }
};
</script>

<style scoped>
.boards {
  margin: auto;
  width: 80%;
  margin-top: 2em;
  height: 50vh;
}

.board {
  margin: 1rem;
  width: 270px;
  height: 130px;
  box-shadow: 5px 10px 8px 10px #888888;
  cursor: pointer;
  @apply rounded;
}
.board:hover {
  box-shadow: 10px 20px 16px 20px #888888;
}
.board-inner {
  height: 130px;
  background-repeat: none;
  background-size: cover;
  @apply rounded;
}
.create-board {
  background-color: rgb(225, 225, 225);
  @apply text-center rounded;
  padding-top: 45px;
  cursor: pointer;
}

.project-task-area{
  @apply grid grid-cols-4;
}

.task {
  margin: 13px;
  margin-top: 0px;
  width: 200px;
  height: 70px;
  box-shadow: 3px 5px 4px 5px #888888;
  cursor: pointer;
  @apply rounded;
}

.task:hover {
  box-shadow: 6px 10px 8px 10px #888888;
}

.task-inner {
  height: 130px;
  @apply rounded;
}

.create-task {
  background-color: rgb(225, 225, 225);
  @apply text-center rounded;
  padding-top: 20px;
  cursor: pointer;
}

.create-modal {
  height: 40rem;
}
.modal-title {
  width: 100%;
  text-align: center;
  margin-top: 6px;
  margin-bottom: 0;
}
.modal-close-btn {
  @apply text-xl pr-3;
  float: right;
}
.modal-img {
  width: 350px;
  margin-top: -10px;
  @apply px-10;
}
.modal-board-description {
  width: 300px;
}
.modal-board-title {
  width: 300px;
}
.dates {
  width: 140px;
}
.modal-create-btn {
  margin: auto;
}
</style>
