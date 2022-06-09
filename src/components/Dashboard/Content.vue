<template>

      <div class="section-title">
          <div class="project-title font-semibold text-2xl ml-16 tracking-wider mb-4">
            Due Jobs
          </div>
          
      </div>

     <div class="box-container">
          <div class="mt-4">
            <p class="text-2xl font-semibold tracking-wide ml-4 mt-2">
              <i class="fa-solid fa-laptop-code"></i> Tasks
            </p>
          </div>
          <div class="project-task-area">
              <div class="task mb-4" v-for="task in jobs" :key="task.id">
                  <div
                    class="task-inner"
                    @click="opentask(task)"
                  >
                    <div class="p-2">{{task.jobTitle}}</div>
                  </div>
              </div> 
          </div>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="timeSpanJob" @change="getDueJobs">
          <option disabled value="">Select a time frame</option>
          <option>month</option>
          <option>week</option>
          <option>day</option>
        </select>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="timeWindowJob" @change="getDueJobs">
          <option disabled value="">Select a time span</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
     </div>





    <div class="section-title">
      <div class="project-title font-semibold text-2xl ml-16 tracking-wider mb-4">
        Due Boards 
      </div>
    </div>
    <div class="box-container">
        <p class="text-2xl font-semibold tracking-wide ml-4">
          <fa icon="clipboard"></fa> Boards
        </p>
        <div class="grid grid-cols-3">
          <div class="flex-intial board" v-for="board in boards" :key="board.id">
            <div
              class="board-inner font-semibold text-xl"
              
              @click="gotoBoard(board)"
            >
              <div class="p-2 text-black text-sm">
                Board Name: {{ board.board_name }}
                
              </div>
            </div>
          </div>
        </div>
      <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="timeSpanBoard" @change="getDueBoards">
        <option disabled value="">Select a time frame</option>
        <option>month</option>
        <option>week</option>
        <option>day</option>
      </select>
      <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="timeWindowBoard" @change="getDueBoards">
        <option disabled value="">Select a time span</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>
    </div>





    <div class="section-title">
      <div class="project-title font-semibold text-2xl ml-16 tracking-wider mb-4">
        Due Projects 
      </div>
    </div>
    <div class="box-container">
        <div class="projects">
          <div class="project mb-2" v-for="project in projects" :key="project.id">
            <div class="flex">
              <div class="project-name" @click="gotoProject(project)">
                <span class="project-icon">{{ project.projectName[0] }}</span>
                {{ project.projectName }}
              </div>
            </div>
            <div class="boards-area flex">
              <div class="board" v-for="board in project.boards" :key="board.id">
                <div class="board-inner font-semibold text-xl"
                  >
                  <div class="p-2 text-lg">{{ board.board_name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="timeSpanProject" @change="getDueProjects">
        <option disabled value="">Select a time frame</option>
        <option>month</option>
        <option>week</option>
        <option>day</option>
      </select>
      <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="timeWindowProject" @change="getDueProjects">
        <option disabled value="">Select a time span</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>
    </div>

</template>

<script>
//import { mapState } from 'vuex';
import axios from 'axios'
import router from "../../router";

export default {
  name: 'MainPage',
  data() {
    return {
      jobs: [],
      boards: [],
      projects: [],
      timeSpanJob: 'month',
      timeWindowJob: 5,
      timeSpanBoard: 'month',
      timeWindowBoard: 5,
      timeSpanProject: 'month',
      timeWindowProject: 5,
      boardsimage:  "https://storage.pixteller.com/designs/designs-images/2019-03-27/05/simple-background-backgrounds-passion-simple-1-5c9b95bd34713.png",
    }
  },
  mounted(){
    this.getDueJobs();
    this.getDueBoards();
    this.getDueProjects();
  },
  methods: {
    opentask(task){
      this.$store.dispatch("routingTask", task.id);
      this.taskStatus = !this.taskStatus;
    },
    gotoProject(project) {
      this.$store.state.routingProject = project;
      router.push("project");
    },
    gotoBoard(board){
      this.$store.state.routingBoard = board
      router.push('board')
    },
    getDueJobs(){
      let user = JSON.parse(localStorage.getItem('user'));
      let url = process.env.VUE_APP_API_URL + `job/date?timeunit=${this.timeSpanJob}&span=${this.timeWindowJob}`;
      axios.get(url, {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
        this.jobs = response.data;
      })
      .catch(error => {
        console.log(error);
      })
    },
    getDueBoards(){
      let user = JSON.parse(localStorage.getItem('user'));
      let url = process.env.VUE_APP_API_URL + `board/date?timeunit=${this.timeSpanBoard}&span=${this.timeWindowBoard}`;
      axios.get(url, {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
        this.boards = response.data;
      })
      .catch(error => {
        console.log(error);
      })
    },
    getDueProjects(){
      let user = JSON.parse(localStorage.getItem('user'));
      let url = process.env.VUE_APP_API_URL + `project/date?timeunit=${this.timeSpanProject}&span=${this.timeWindowProject}`;
      axios.get(url, {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
        this.projects = response.data;
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  
}
</script>


<style scoped>

*{
  margin: 0;
  padding: 0;
}

.box-container{
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: center;
}
.section-title{ 
  width: 100%;
  height: 50px;
  background-color: rgb(200, 200, 200);
  flex: auto;
  flex-wrap: wrap;
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

.dashboard-container{
  height: 100vh;
  margin-top: -8rem;
  background: url("https://images.wallpaperscraft.com/image/single/starry_sky_night_trees_121201_1920x1080.jpg");
  background-repeat: none;
  background-size: cover;
}
.project-field{
  margin-top: 1rem;
  margin-bottom: 0;
  height: 13rem;
  padding: 1rem;
}
.project-title{
  @apply text-xl text-black;
}
.projects{
  height: 8rem;
  @apply grid grid-cols-4 grid-rows-1 m-2 p-1;
}
.project{
  background-color: #034d5e;
  border-radius: 3px;
  @apply m-1 text-white p-2;
  height: 100%;
}
.project-dates{
  position: absolute;
  vertical-align: bottom;
}
.board-field{
  margin: 12rem;
  margin-top: 2rem;
  height: 13rem;
  padding: 1rem;
}
.board-title{
  @apply text-xl text-black;
}
.boards{
  height: 8rem;
  @apply grid grid-cols-4 grid-rows-1 m-2 p-1;
}
.board{
  background-color: #034d5e;
  border-radius: 3px;
  @apply m-1 text-white p-2; 
}
.project-field {
  width: 20vw;
  margin-left: 10em;
  padding-top: 1em;
}

</style>
