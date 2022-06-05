<template>
  <div
    v-if="toggleTaskCreateModal"
    class="fixed overflow-x-hidden overflow-y-auto inset-0 justify-center items-center z-50"
  >
    <div class="task-create-modal">
      <div class="task-create-modal-inner">
        <div class="create-modal-top">
          Create New Task
          <button
            class="create-modal-close-btn"
            @click="toggleTaskCreateModal = false"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="create-modal-task-title-area">
          Task Title: 
          <input class="create-modal-task-title-input" v-model="newTask.jobTitle"/>
        </div>
        <div class="italic">
          Description: <br />
          <textarea class="border-2 border-gray-600 rounded w-72 h-24 p-1 mb-2" v-model="newTask.jobDescription"></textarea>
        </div>
        <div class="flex">
          Tags: 
          <div class="create-modal-tags ml-2 bg-blue-600 rounded text-white px-2" v-for="tag in newTask.tags" :key="tag.id">
            {{ tag }}
          </div>
          <input class="w-16 border-2 border-black rounded ml-2 px-1" v-model="tempTags"/>
          <div class="ml-2 rounded border-2 border-black bg-blue-600 text-white px-2"
            @click="addTag">Add
          </div>
        </div>
        <div class="my-2 bg-green-500 text-white font-semibold text-lg p-2 w-32 text-center rounded mt-4 content-center ml-24 cursor-pointer"
          @click="createNewTask">
          Create Task
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="toggleTaskCreateModal"
    class="absolute z-40 inset-0 opacity-25 bg-black"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      toggleTaskCreateModal: true,
      newTag: null,
      tempTags:[],
      newTask: {
        jobTitle: "",
        jobDescription: "",
        tags: [],
      },
    };
  },
  methods: {
    addTag() {
      this.newTask.tags.push(this.tempTags)
      this.tempTags = ""
    },
    createNewTask() {
      this.$store.dispatch('createNewTask', this.newTask)
      this.toggleTaskCreateModal = false
    }
  }
};
</script>

<style scoped>
@import "./TaskCreateModal.css";
</style>
