<template>
  <div class="page">
    <div class="project-field mb-10">
      <div class="project-title font-semibold text-2xl tracking-wider mb-4">
        YOUR PROJECTS 
        <button class="create-project-btn text-2xl font-semibold ml-5"
                @click="toggleCreateModal = !toggleCreateModal"><i class="fa-solid fa-circle-plus"></i></button>
      </div>
      <!-- Create Modal -->
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
              <span class="text-sm font-semibold">Start Date &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; End Date</span><br>
              <input type="date" class="border-2 border-gray-600 rounded" v-model="newProject.startDate">
              <input type="date" class="border-2 border-gray-600 rounded ml-2" v-model="newProject.endDate">
            </div>
            <button class="rounded bg-gray-300 px-6 py-2 w-3/12 ml-28 mb-3 " @click="createNewProject">Create</button>  
          </div>
          <div class="create-modal-image rounded">
            <button class="close-modal-btn text-xl" @click="toggleCreateModal = false"><i class="fa-solid fa-xmark"></i></button>
            <img class="mt-10" src="https://www.unitektime.com/gallery/Project-Management-2-ts1616813781.png"/>
          </div>
          
        </div>
      </div>
      <!--  -->
      <div v-if="toggleCreateModal" 
          class="absolute z-40 inset-0 opacity-25 bg-black"
          >
      </div>


      <div class="projects">
        <div class="project mb-2" v-for="project in projects" :key="project.id">
          
          <div class="flex">
            <div class="project-name flex-initial h-10 pl-2 pt-1">
              <router-link to="/project" class="text-black no-underline pl-2 pr-2 text-xl tracking-wide font-semibold">
                <span class="project-icon text-xl flex-initial">{{ project.projectName[0]}}</span>
                {{ project.projectName }}
              </router-link>
            </div>
            <button class="flex-initial w-32 ml-4 project-btns" @click="printResult">
              Boards(3)
            </button>
            <button class="flex-initial w-32 ml-4 project-btns">
              Members(8)
            </button>
            <button class="flex-initial w-32 ml-4 project-btns">
              <i class="fa-solid fa-gear"></i> Settings
            </button>
          </div>
          <div class="boards-area flex">
            <div class="flex-intial board" v-for="board in boards" :key="board.id">
              <div class="board-inner font-semibold text-xl" :style="{'background': 'url(' + board.image + ')', 'background-size': 'cover'}" >
                <div class="p-2">{{ board.name }}</div>
              </div>
            </div>
            <div class="flex-iitial board p-12 pl-14 create-board">
              <p>Create New Board</p> 
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomPage">
      <div class="assigned-project">
        <p class="project-title font-semibold text-2xl tracking-wider">
          ASSIGNED PROJECTS
        </p>
        <div class="projects">
          <div class="project mb-2" v-for="project in assignedProjects" :key="project.id">
            <div class="flex">
              <div class="project-name flex-initial h-10 pl-2 pt-1">
                <router-link to="/project" class="text-black no-underline pl-2 pr-2 text-xl tracking-wide font-semibold">
                  <i class="fa-solid fa-m project-icon text-xl flex-initial project-icon"></i> {{ project.ProjectName }}
                </router-link>
              </div>
              <button class="flex-initial w-32 ml-4 project-btns">
                Boards(2)
              </button>
              <button class="flex-initial w-32 ml-4 project-btns">
                Members(16)
              </button>
              <button class="flex-initial w-32 ml-4 project-btns">
                <i class="fa-solid fa-gear"></i> Settings
              </button>
            </div>
            <div class="boards-area flex">
              <div class="flex-intial board" v-for="board in assignedBoards" :key="board.id">
                <div class="board-inner font-semibold text-xl" :style="{'background': 'url(' + board.image + ')', 'background-size': 'cover'}" >
                  <div class="p-2 text-white">{{ board.name }}</div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapState, mapActions } from 'vuex'
export default {
  components: {},
  data() {
    return {
      newProject:{
        projectName: null,
        projectDiscription: null,
        startDate: null,
        endDate: null,
        isFinished: false,
      },
      toggleCreateModal: false,
      projects2: [{
        projectName: "sadad"
      }],
      project: [],
      assignedProjects:[
        {
          ProjectName: "Mobile App",
          ProjectDescription: "Build Full Stack Project",
          StartDate: "2022-03-10",
          EndDate: "2022-03-30",
        },
      ],
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
      assignedBoards: [
        {
          name: "Android",
          image:
            "https://i.pinimg.com/originals/c0/f3/bc/c0f3bcefc6ea726308b54c559d8ad84e.jpg",
        },
        {
          name: "IOS",
          image:
            "https://wallpaperaccess.com/full/875004.jpg",
        },
        
      ],
    };
  },
  setup() {
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
  mounted(){
    this.$store.dispatch('loadProjects')
  },
  computed: mapState([
    'projects'
  ]),
  
};
</script>


<style scoped>
.project-field {
  margin-top: 8rem;
  margin-left: 10rem;
  width: 65vw;
}
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
.create-modal-image{
  width: 60rem;
  background-color: white;
}
.create-modal{
  height: 33rem;
}
.close-modal-btn{
  margin-left: 27rem;
  margin-top: .5rem;
}
</style>
