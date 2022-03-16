<template>
  <div>
    <div class="project-top">
      <div class="project-info flex">
        <span class="project-icon text-4xl flex-initial m-2">{{ project.projectName[0] }}</span>
        <div class="flex-initial ml-2">
          <div class="text-xl font-semibold mt-2 mb-2">{{ project.projectName }}</div>
          <div> {{ project.projectDescription }}</div>
          <button class="edit-btn mt-3 pl-2 pr-2"> <i class="fa-solid fa-pen"></i>  Edit Project</button>
        </div>
      </div>
      <div class="tabs flex">
        <button class="flex-initial pl-4 pr-4 pt-2 pb-2 mx-1 mt-1 tabs-btn" 
          v-on:click="changeTab(0)"><fa icon="clipboard"></fa> Boards(3)</button>
        <button class="flex-initial pl-4 pr-4 pt-2 pb-2 mx-1 mt-1 tabs-btn"
          v-on:click="changeTab(1)"><i class="fa-solid fa-users"></i> Members(8)</button>
        <button class="flex-initial pl-4 pr-4 pt-2 pb-2 mx-1 mt-1 tabs-btn"
          v-on:click="changeTab(2)"><i class="fa-solid fa-gear"></i> Settings</button>
      </div>
    </div>
    <div>
      <Boards v-show="selectedTab[0]"/>
      <Members v-show="selectedTab[1]"/>
      <Settings v-show="selectedTab[2]"/>
    </div>
  </div>
</template>

<script>
import Boards from '../components/Project/Boards.vue'
import Members from '../components/Project/Members.vue'
import Settings from '../components/Project/Settings.vue'

export default {
  data(){
    return {
      selectedTab: [true, false, false],
    }
  },
  components:{
    Boards,
    Members,
    Settings
  },
  methods:{
    changeTab(index) {
      console.log(this.$store.state.routingProject)
      this.selectedTab = [false, false, false]
      this.selectedTab[index] = true
    }
  },
  computed: {
    project(){
      return this.$store.state.routingProject
    } 
  }
};
</script>

<style scoped>
.project-top {
  background-color: rgb(225, 225, 225);
  height: 30vh;
  margin-top: 0;
  padding-top: 4rem;
  position: relative;
}
.project-info {
  margin-left: 35%;
  width: 0%;
  margin-bottom: 7vh;
}
.project-icon{
  padding: 2rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: #16858d;
}
.tabs{
  margin-left: 35%;
  margin-bottom: 0;
  width: 30%;
  position: absolute;
  bottom: 0;

}
.tabs-btn{
  background-color: rgb(201, 201, 201);
}
.tabs-btn:hover{
  background-color: white;
}
.edit-btn{
  background-color: rgb(201, 201, 201);
  border-radius: 3px;
  height: 30px;
  width: 140px;
}
.edit-btn:hover{
  background-color: white;
}
</style>