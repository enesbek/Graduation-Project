<template>
  <div class="your-boards" >
    Your Boards
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
            <input class="modal-board-title border-2 border-gray-600 rounded pl-2 p-1" v-model="newProject.projectName"><br>
            <span class="text-sm">* Title is required</span><br>
          </div>
          <div class="ml-6 mb-2">
            <span class="text-sm font-semibold">Board Description</span><br>
            <textarea class="modal-board-description border-2 border-gray-600 rounded w-64 h-24 pl-2 pt-1" v-model="newProject.projectDescription"></textarea><br>
            <span class="text-sm">You can give details about the Board</span><br>
          </div>
          <div class="ml-6 mb-2">
            <span class="text-sm font-semibold">Start Date &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; End Date</span><br>
            <input type="date" class="dates border-2 border-gray-600 rounded" v-model="newProject.startDate">
            <input type="date" class="dates border-2 border-gray-600 rounded ml-4" v-model="newProject.endDate">
          </div>
          <div class="ml-6 mt-2">
            <span class="text-sm font-semibold">Add people to board</span><br>
            <input class="modal-board-title border-2 border-gray-600 rounded pl-2 p-1" v-model="newProject.projectName"><br>
          </div>
        </div>
      </div>
    </div>

    <div v-if="toggleCreateModal" class="absolute z-40 inset-0 opacity-25 bg-black"></div>


    <!-- Create Modal -->
    <!--
      <div v-if="toggleCreateModal"
          class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 ">
        <div
        class="create-modal relative mx-auto w-auto max-w-4xl flex ">
          <div class="bg-white w-full shadow-2xl max-w-2xl flex flex-col rounded">
            <div class="text-2xl font-bold mt-4 ml-6 mb-2">Let's Create Project</div>
            <p class="ml-6 text-gray-600">You can manage your project with this web site.</p>
            <div class="ml-6">
              <span class="text-sm font-semibold">Project Name</span><br>
              <input class="border-2 border-gray-600 rounded" v-model="newProject.projectName"><br>
              <span class="text-sm">This can be name of your company, team or organization</span><br>
            </div>
            <div class="ml-6 mt-4 mb-2">
              <span class="text-sm font-semibold">Project Description</span><br>
              <textarea class="border-2 border-gray-600 rounded w-64 h-24" v-model="newProject.projectDescription"></textarea><br>
              <span class="text-sm">You can give details about the Project</span><br>
            </div>
            <div class="ml-6 mb-10">
              <span class="text-sm font-semibold">Start Date &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; End Date</span><br>
              <input type="date" class="border-2 border-gray-600 rounded" v-model="newProject.startDate">
              <input type="date" class="border-2 border-gray-600 rounded ml-4" v-model="newProject.endDate">
            </div>
            <button class="rounded bg-gray-300 px-6 py-2 w-3/12 ml-28 mb-3 " @click="createNewProject">Create</button>  
          </div>
          <div class="create-modal-image rounded">
            <button class="close-modal-btn text-xl" @click="toggleCreateModal = false"><i class="fa-solid fa-xmark"></i></button>
            <img class="mt-10" src="https://res.cloudinary.com/monday-blogs/fl_lossy,f_auto,q_auto/wp-blog/2021/01/Kanban-flow.jpg"/>
          </div>
        </div>
      </div>
      <div v-if="toggleCreateModal" class="absolute z-40 inset-0 opacity-25 bg-black"></div>
      -->
      <!--  -->
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
      newProject:{
        projectName: null,
        projectDiscription: null,
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
    ...mapActions(['createProject']),
    createNewProject(){
      this.toggleCreateModal = false
      this.createProject(this.newProject);
    }
  },
}
</script>

<style scoped>
.your-boards{
  height: 90%;
}
.content{
  height: 75%;
}
.create-board{
  width: 80%;
  margin: auto;
  bottom: 0;
  height: 10rem;
  @apply bg-white text-center;
  text-align: center;
  padding-top: 7%;
}
.create-board:hover{
  background-color: #177c81;
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

.create-modal-image{
  width: 60rem;
  background-color: white;
}
.close-modal-btn{
  margin-left: 27rem;
  margin-top: .5rem;
}
</style>