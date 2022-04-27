<template>
  <div class="board-container">
    <div class="my-container flex">
      <div v-for="section in sections" :key="section.id">
        <draggable class="sections" group="sections">
          <h3 class="text-base pt-1 px-3 rounded">{{section.sectionName}}</h3>
          <Task />
          &emsp;
          <button
            class="addButton"
            data-bs-toggle="modal"
            data-bs-target="#addTaskModal"
            v-on:click="submitSectionName(sections)"
          >
            Add New Task
          </button>
          <!-- Add Task Modal Start -->

          <!-- Add Task Modal Finish -->
        </draggable>
      </div>
      <div class="sections">
        Add anotasdasher section
        <div class="w-48 p-3 m-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import Task from "./Task.vue";
export default {
  components: {
    draggable: VueDraggableNext,
    Task,
  },
  data() {
    return {
      newTask: {
        sectionName: "",
        taskName: "",
        tags: [],
        date: "",
        attachment: 0,
      },
      isModalVisible: false,
      enabled: true,
      sectionData: [
        {
          name: "Backlog",
        },
        {
          name: "In Progress",
        },
        {
          name: "Test",
        },
        {
          name: "Done",
        },
        {
          name: "Deployment",
        },
      ],
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    submitSectionName(sections) {
      this.newTask.sectionName = sections.name;
      sections.tasks.push(this.newTask);
    },
  },
  computed: {
    sections(){
      this.$store.dispatch("loadSections");
      return this.$store.state.sections
    }
  }
};
</script>

<style scoped>
.board-container {
  height: calc(100vh - 50px);
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgb(255, 230, 198);
  overflow: auto;
}
.sections {
  border-top: 5px solid rgb(44, 184, 102);
  @apply mt-3 ml-3 text-sm bg-gray-200 w-64 rounded;
}
.task {
  @apply bg-white m-2 p-1 rounded-md;
}
.addButton {
  background-color: rgb(68, 219, 131);
  @apply ml-10 mt-3 text-white rounded pt-3 pb-3 pl-10 pr-10 mb-2;
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

/* SCROLLBAR */
::-webkit-scrollbar {
  width: 10px;
  @apply mb-2;
  opacity: 0.5;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  opacity: 0.2;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  opacity: 0.2;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  opacity: 0.2;
}
</style>
