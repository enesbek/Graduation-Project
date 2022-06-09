<template>
  <div class="boards">
    <p class="text-2xl font-semibold tracking-wide ml-4">
      <fa icon="clipboard"></fa> Boards
    </p>
    <div class="grid grid-cols-3">
      <div
        class="flex-iitial board create-board mb-4"
        @click="toggleCreateModal = !toggleCreateModal"
      >
        <div class="board-inner-create font-semibold text-xl">
          <div class="font-normal text-lg"><fa icon="plus" class=""></fa> New Board</div>
        </div>
      </div>
      <div class="flex-intial board" v-for="board in projectBoards" :key="board.id">
        <div
          class="board-inner font-semibold text-xl"
          @click="gotoBoard(board)"
        >
          <div class="p-2">{{ board.board_name }}</div>
          <div class="ml-2 mt-8 text-sm">Start: {{board.startDate}}</div>
          <div class="ml-2 text-sm">End: &nbsp;{{board.endDate}}</div>
        </div>
      </div>
    </div>
    <hr/>
    <div class="project-tasks">
      <div class="">
        <p class="text-2xl font-semibold tracking-wide ml-4 mt-2">
          <i class="fa-solid fa-laptop-code"></i> Tasks
        </p>
      </div>
      <div class="project-task-area">
        <div
          class="task create-task"
          @click="toggleCreateTaskModal = !toggleCreateTaskModal"
        >
          <div class="task-inner-create font-semibold text-xl">
            <div class="font-normal text-lg"><fa icon="plus" class="mr-2"></fa>New Task</div>
          </div>
        </div>
        <div class="task mb-4" v-for="task in projectTasks" :key="task.id">
          <div
            class="task-inner"
            @click="opentask(task)"
          >
            <div class="p-2 font-semibold">{{task.jobTitle}}</div>
            <div class="p-2 text-sm">End: {{task.endDate}}</div>
          </div>
        </div> 
      </div>
    </div>
    <Task v-if="taskStatus"/>
    <!--Board Modal Start-->
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
              >Start Date &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; End
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
          <p class="italic ml-6">*Dates are optional</p>
          <button
            class="modal-create-btn rounded bg-gray-300 px-6 py-2 w-3/12"
            @click="createNewProjectBoard"
          >
            Create
          </button>
        </div>
      </div>
    </div>

    <!-- Task Modal Start --> 

    <div
      v-if="toggleCreateTaskModal"
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
    >
      <div class="create-task-modal relative mx-auto w-auto max-w-4xl flex">
        <div class="bg-white w-full shadow-2xl max-w-2xl flex flex-col rounded">
          <div class="modal-title text-lg">
            Create Task
            <button class="modal-close-btn" @click="toggleCreateTaskModal = false">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <hr class="mt-1" />
          </div>
          <div class="ml-6">
            <span class="text-sm font-semibold">Task Title</span><br />
            <input
              class="modal-board-title border-2 border-gray-600 rounded pl-2 p-1 mr-6"
              v-model="newTask.jobTitle"
            /><br />
            <span class="text-sm">* Title is required</span><br />
          </div>
          <div class="ml-6 mb-2 mt-2">
            <span class="text-sm font-semibold">Task Description</span><br />
            <textarea
              class="modal-board-description border-2 border-gray-600 rounded w-64 h-24 pl-2 pt-1"
              v-model="newTask.jobDescription"
            ></textarea
            ><br />
            <span class="text-sm">* You can give details about the Task</span
            ><br />
          </div>
          <div class="ml-6 mb-2">
            <span class="text-sm font-semibold">Tags</span>
            <div class="flex mt-1">
              <div class="w-12 mr-2 bg-blue-600 rounded text-white px-2" v-for="tag in newTask.tags" :key="tag.id">
                {{ tag }}
              </div>
              <input class="w-16 border-2 border-black rounded px-1" v-model="tempTags"/>
              <div class="ml-2 rounded border-2 border-black bg-blue-600 text-white px-2"
                @click="addTag">Add
              </div>
            </div>
          </div>
          <div class="ml-6 mb-2 mt-2">
            <div class="text-sm font-semibold">
              Receiver User
            </div>
            <div v-for="users in routedProject.userAssignedProjects" :key="users.id">
              <div class="flex mt-1">
                <div class="check-box ml-0" @click="selectUser(users.id)"><i class="fa-solid fa-check" v-if="newTask.receiverUser == users.id"></i></div>
                {{users.firstName}} {{users.lastName}}
              </div>
            </div>
          </div>

          
          <button
            class="rounded bg-green-600 font-semibold text-white py-2 w-4/12 mx-auto mb-2"
            @click="createProjectTask"
          >
            CREATE
          </button>
        </div>
      </div>
    </div>

    <!-- modal ends-->
    <div
      v-if="toggleCreateModal"
      class="absolute z-40 inset-0 opacity-25 bg-black"
    ></div>
    <div
      v-if="toggleCreateTaskModal"
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
      toggleCreateTaskModal: false,
      toggleCreateModal: false,
      newBoard: {
        boardName: null,
        boardDescription: null,
        startDate: null,
        endDate: null,
        isFinished: false,
      },
      boards: [],
      newTask: {
        jobTitle: "",
        jobDescription: "",
        receiverUser: "",
        tags: [],
      },
      tempTags:[],
      taskStatus: false,
    };
  },
  methods: {
    opentask(task){
      this.$store.dispatch("routingTask", task.id);
      this.taskStatus = !this.taskStatus;
    },
    addTag() {
      this.newTask.tags.push(this.tempTags)
      this.tempTags = ""
    },
    createNewProjectBoard() {
      this.toggleCreateModal = false;
      this.$store.dispatch("createProjectBoard", this.newBoard);
    },
    gotoBoard(board){
      this.$store.state.routingBoard = board
      router.push('board')
    },
    selectUser(id) {
      if(this.newTask.receiverUser ==  id){
        this.newTask.receiverUser = ""
      }
      else {
        this.newTask.receiverUser = id
      }
    },
    createProjectTask() {
      this.$store.dispatch("createProjectTask", this.newTask)
      this.newTask = {
        jobTitle: "",
        jobDescription: "",
        receiverUser: "",
        tags: [],
      }
      this.toggleCreateTaskModal = false
    },
  },
  created() {
    this.$store.dispatch("loadProjectBoards");
    this.$store.dispatch("loadProjectTasks");
    this.$store.dispatch("loadUser");
    this.projectTasksArray = this.$store.state.projectTasks
  },
  computed: {
    projectBoards() {
      this.$store.state.projectBoards.forEach(board => {
        board.startDate = board.startDate.slice(0,10)
        board.endDate = board.endDate.slice(0,10)
      })
      return this.$store.state.projectBoards
    },
    projectTasks() {
      this.$store.state.projectTasks.forEach(task => {
        task.startDate = task.startDate.slice(0,10)
        task.endDate = task.endDate.slice(0,10)
      })
      return this.$store.state.projectTasks
    },
    routedProject() {
      return this.$store.state.project
    },
  }
};
</script>

<style scoped>
.boards {
  margin: auto;
  width: 80%;
  margin-top: 1em;
  height: 50vh;
}

.board {
  margin: 20px;
  margin-top: 0px;
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
  background-image: url("../../assets/board/board-background.png");
  background-repeat: no-repeat;
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
  height: 37rem;
}

.modal-title {
  width: 100%;
  text-align: center;
  margin-top: 6px;
  margin-bottom: 0;
  background-color: white;
}
.modal-close-btn {
  @apply text-xl;
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
