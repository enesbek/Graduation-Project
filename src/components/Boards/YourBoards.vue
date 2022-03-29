<template>
  <div class="your-boards" >
    <div class="title">Your Boards</div> 
    <div class="content"></div>
    <div class="create-board text-xl font-semibold" @click="toggleCreateModal = !toggleCreateModal">
      Create New Board
      <br><span class="text-4xl font-semibold">+</span>
    </div>

    <div v-if="toggleCreateModal" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 ">
      <div class="create-modal relative mx-auto w-auto max-w-4xl flex ">
        <div class="bg-white w-full shadow-2xl max-w-2xl flex flex-col rounded">
          <div class="modal-title text-lg">Create Board 
            <button class="modal-close-btn" @click="toggleCreateModal = false"><i class="fa-solid fa-xmark"></i></button>
            <hr class="mt-1">
          </div>
          <img class="modal-img" src="https://res.cloudinary.com/monday-blogs/fl_lossy,f_auto,q_auto/wp-blog/2021/01/Kanban-flow.jpg"/>
          <div class="ml-6 mt-2">
            <span class="text-sm font-semibold">Board Title</span><br>
            <input class="modal-board-title border-2 border-gray-600 rounded pl-2 p-1" v-model="newBoard.boardName"><br>
            <span class="text-sm">* Title is required</span><br>
          </div>
          <div class="ml-6 mb-2 mt-2">
            <span class="text-sm font-semibold">Board Description</span><br>
            <textarea class="modal-board-description border-2 border-gray-600 rounded w-64 h-24 pl-2 pt-1" v-model="newBoard.boardDescription"></textarea><br>
            <span class="text-sm">* You can give details about the Board</span><br>
          </div>
          <div class="ml-6 mb-2">
            <span class="text-sm font-semibold">Start Date &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; End Date</span><br>
            <input type="date" class="dates border-2 border-gray-600 rounded" v-model="newBoard.startDate">
            <input type="date" class="dates border-2 border-gray-600 rounded ml-4" v-model="newBoard.endDate">
          </div>
          <div class="ml-6 mt-2">
            <span class="text-sm font-semibold">Add people to board</span><br>
            <input class="modal-board-title border-2 border-gray-600 rounded pl-2 p-1"><br>
          </div>
          <button class="modal-create-btn rounded bg-gray-300 px-6 py-2 w-3/12" @click="createNewBoard">Create</button>
        </div>
      </div>
    </div>
    <div v-if="toggleCreateModal" class="absolute z-40 inset-0 opacity-25 bg-black"></div>
  </div>
</template>

<script>
import { ref } from "vue";
import store from '../../store'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      toggleCreateModal: false,
      newBoard:{
        boardName: null,
        boardDiscription: null,
        startDate: null,
        endDate: null,
        isFinished: false,
      },
    }
  },
  setup() {
    store.commit('changeSidebarState');
    const modalActive = ref(true);
    return { modalActive };
  },
  methods: {
    ...mapActions(['createBoard']),
    createNewBoard(){
      this.toggleCreateModal = false
      this.createBoard(this.newBoard);
    }
  },
}
</script>

<style scoped>
.your-boards{
  height: 90%;
}
.title{
  width: 100;
  text-align: center;
}
.content{
  height: 75%;
}
.create-board{
  width: 80%;
  margin: auto;
  bottom: 0;
  height: 8rem;
  @apply bg-white text-center;
  text-align: center;
  padding-top: 7%;
}
.create-board:hover{
  background-color: #034d5e;
  @apply text-white text-xl;
  cursor: pointer;
}
.create-modal{
  height: 40rem;
}
.modal-title{
  width: 100%;
  text-align: center;
  margin-top: 6px;
  margin-bottom: 0;
}
.modal-close-btn{
  @apply text-xl pr-3;
  float: right;
}
.modal-img{
  width: 350px;
  margin-top: -10px;
  @apply px-10;
}
.modal-board-description{
  width: 300px;
}
.modal-board-title{
  width: 300px;
}
.dates{
  width: 140px;
}
.modal-create-btn{
  margin: auto;
}

.create-modal-image{
  width: 60rem;
  background-color: white;
}
.close-modal-btn{
  margin-left: 27rem;
  margin-top: .5rem;
}
</style>