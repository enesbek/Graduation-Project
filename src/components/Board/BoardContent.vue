<template>
  <div class="board-container">
    <div class="my-container flex">
      <div v-for="section in sections" :key="section.order_no">
        <div class="sections">
          <h3 class="text-base pt-1 px-3 rounded">{{ section.sectionName }} 
            <i class="fa-solid fa-trash-can section-settings" @click="deleteSection(section)"></i>
          </h3>
          <draggable v-if="!section.jobs.length" group="tasks"></draggable>
          <draggable animation="100" v-for="task in section.jobs" :key="task.name" group="tasks">
            <div @click="openTask(task.id)" class="task-container">
              <span v-for="tag in task.tags" :key="tag.name" class="tags">
              {{ task }}
              </span>
              <div class="task-name">
                {{ task.jobTitle }}
              </div>
              <div class="italic font-normal">
                {{task.startDate[8]}}{{task.startDate[9]}}{{task.startDate[7]}}{{task.startDate[5]}}{{task.startDate[6]}} /
                {{task.endDate[8]}}{{task.endDate[9]}}{{task.endDate[7]}}{{task.endDate[5]}}{{task.endDate[6]}}
              </div>
            </div>
          </draggable>
          <button
            class="addButton"
            v-on:click="createNewTask(section.id)"
          >
            Create New Task
          </button>
        </div>
      </div>
      <div class="sections h-32">
        <div class="text-center pt-2 font-semibold">
          New Section <br/>
          <input class="add-section-input" v-model="newSection"/>
          <div class="add-section-btn" @click="addNewSection">
            Add
          </div> 
        </div>
      </div>
    </div>
    <Task v-if="taskStatus"/>
    <TaskCreateModal v-if="createTaskStatus"/>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import Task from './Task.vue'
import TaskCreateModal from './TaskCreateModal.vue'
import _ from 'lodash';
export default {
  components: {
    draggable: VueDraggableNext,
    Task,
    TaskCreateModal,
  },
  data() {
    return {
      createTaskStatus: false,
      taskStatus: false,
      toggleTaskModal: false,
      newSection: "",
      deleteSectionId: null,
      newTask: {
        sectionName: "",
        taskName: "",
        tags: [],
        date: "",
        attachment: 0,
      },
    };
  },
  methods: {
    addNewSection() {
      this.$store.dispatch("createNewSection", this.newSection);
      this.newSection = ""  
    },
    deleteSection(section) {
      this.deleteSectionId = section.id
      this.$store.dispatch("deleteSection", this.deleteSectionId);
    },
    openTask(taskId) {
      this.$store.dispatch("routingTask", taskId);
      this.taskStatus = !this.taskStatus;
    },
    createNewTask(sectionId) {
      this.createTaskStatus = !this.createTaskStatus;
      this.$store.commit("SET_NEW_TASK_SECTION", sectionId)
    },
    changed(id, event){
      console.log(id)
      console.log(event)
    }
  },
  computed: {
    sections(){
      this.$store.dispatch("loadSections");
      return  _.orderBy(this.$store.state.sections, 'order_no')
    },
  }
};
</script>

<style scoped>
@import './Task.css';
.board-container {
  height: calc(100vh - 50px);
  background-image: url("https://storage.pixteller.com/designs/designs-images/2019-03-27/05/simple-background-backgrounds-passion-simple-1-5c9b95bd34713.png");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: auto;
}
.sections {
  border-top: 5px solid rgb(44, 184, 102);
  width: 270px;
  box-shadow: 1px 3px 2px 3px #888888;
  @apply mt-3 ml-3 text-sm bg-gray-200 rounded;
}
.addButton {
  background-color: rgb(68, 219, 131);
  @apply ml-12 mt-3 text-white rounded py-3 px-6 mb-2 font-semibold tracking-wide;
}
.tags {
  background-color: rgb(44, 89, 200);
  @apply px-1 pb-1 mr-1 rounded text-white font-bold;
  font-size: 13px;
  letter-spacing: 0.5px;
}
.task-name {
  @apply mt-2 mb-2;
}

</style>
