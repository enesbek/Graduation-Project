<template>
  <div class="your-boards">
    <div class="title font-bold text-2xl mt-2">Your Boards</div>
      <div class="boards-area col-span-1 ml-4">
        <div class="create-your-board font-semibold" @click="toggleCreateModal = !toggleCreateModal">
          Create New Board
          <br /><span class="text-xl font-semibold">+</span>
        </div>
        <div class="board" v-for="board in yourTempBoards" :key="board.id">
          <div class="board-inner font-semibold text-lg mt-2" @click="gotoBoard(board)">
              <div class="p-2">{{ board.board_name }}</div>
              <div class="ml-2 mt-3 text-sm">Start: {{board.startDate}}</div>
              <div class="ml-2 text-sm">End: &nbsp;{{board.endDate}}</div>
            </div>
        </div>
      </div>
    
    <!-- Create Modal -->
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
          <img
            class="modal-img"
            src="../../assets/board/create-modal.png"
          />
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
          <button
            class="modal-create-btn rounded bg-gray-300 px-6 py-2 w-3/12 mb-4 mt-2"
            @click="createNewBoard"
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
    <!-- Create Modal -->
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
        boardDescription: null,
        startDate: null,
        endDate: null
      },
    };
  },
  methods: {
    gotoBoard(board) {
      this.$store.state.routingBoard = board
      router.push('board')
    },
    createNewBoard() {
      this.$store.dispatch("createNewYourBoard", this.newBoard)
      this.newBoard = {
        boardName: null,
        boardDescription: null,
        startDate: null,
        endDate: null,
      }
      this.toggleCreateModal = false
    }
  },
  created() {
    this.$store.commit("changeSidebarState");
    this.$store.dispatch("loadYourBoards");
  },
  computed: {
    yourTempBoards() {
      this.$store.state.yourBoards.forEach(board => {
        board.startDate = board.startDate.slice(0,10)
        board.endDate = board.endDate.slice(0,10)
        if(board.endDate == "9999-12-31") {
          board.endDate = "---"
        }
      })
      return this.$store.state.yourBoards
    }
  }
};
</script>

<style scoped>

.your-boards {
  height: 93%;
  @apply bg-gray-200;
}
.title {
  width: 100;
  text-align: center;
  @apply font-semibold;
}
.board {
  margin: 20px;
  margin-left: 35px;
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
.board-settings{
  cursor: pointer;
}
.create-your-board {
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 270px;
  height: 80px;
  @apply bg-gray-300 text-center rounded;
  text-align: center;
  padding-top: 5%;

}

.create-your-board:hover {
  background-color: #034d5e;
  @apply text-white;
  cursor: pointer;
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

.create-modal-image {
  width: 60rem;
  background-color: white;
}
.close-modal-btn {
  margin-left: 27rem;
  margin-top: 0.5rem;
}
</style>
