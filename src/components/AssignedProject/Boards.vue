<template>
  <div class="boards">
    <div class="boards-title">
      <p class="text-2xl font-semibold tracking-wide ml-4 mt-2">
        <fa icon="clipboard"></fa> Boards(1)
      </p>
    </div>
    <div class="boards-area flex">
      <div class="flex-intial board" v-for="board in assignedBoards" :key="board.id">
        <div
          class="board-inner font-semibold text-xl"
          :style="{
            background: 'url(https://storage.pixteller.com/designs/designs-images/2019-03-27/05/simple-background-backgrounds-passion-simple-1-5c9b95bd34713.png)',
            'background-size': 'cover',
          }"
          @click="gotoBoard(board)"
        >
          <div class="p-2">{{ board.board_name }}</div>
        </div>
      </div>
      <div
        class="flex-iitial board create-board"
        @click="toggleCreateModal = !toggleCreateModal"
      >
        <div class="board-inner font-semibold text-xl">
          <div class="font-normal text-lg">Create New Board</div>
        </div>
      </div>
    </div>
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
export default {
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
    };
  },
  methods: {
    createNewProjectBoard() {
      this.toggleCreateModal = false;
      this.$store.dispatch("createProjectBoard", this.newBoard);
    },
    gotoBoard(board){
      this.$store.state.routingBoard = board
      console.log(board)
      router.push('board')
    }
  },
  computed: {
    assignedBoards() {
      this.$store.dispatch("loadAssignedProjectBoards");
      return this.$store.state.assignedProjectBoards
    }
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
.boards-area {
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
