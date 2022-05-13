<template>
  <div
    v-if="toggleTaskModal"
    class="fixed overflow-x-hidden overflow-y-auto inset-0 justify-center items-center z-50"
    >
    <div class="task-modal relative mx-auto">
      <div class="bg-gray-100 w-full shadow-2xl flex flex-col rounded p-2">
        <div class="modal-top text-lg">
          <i class="fa-solid fa-laptop-code mx-2"></i>
          <span contenteditable="true" class="modal-title" @input="onInputTaskTitle">{{ task.jobTitle }}</span>
          <button class="modal-close-btn" @click="toggleTaskModal = false">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <!--
        <div>
          <p class="tag-title">Members</p>
          <div class="activity-avatar ml-11 float-left">S</div>
          <div class="activity-avatar float-left">E</div>
          <div class="activity-avatar float-left">V</div>
        </div>-->
        <p class="tag-title">Labels</p>
        <div class="modal-tag-area">
          <div class="modal-tags" v-for="tag in task.tags" :key="tag.id">{{ tag.tagName }}</div>
          <input class="modal-add-tag-input" v-if="openAddTagInput" v-model="newTag"/> 
          <div class="modal-add-tag" @click="addNewTag"><i class="fa-solid fa-plus"></i></div>
        </div>
        <div class="modal-description-area">
          <i class="fa-solid fa-align-justify mx-2 mt-2"></i>
          <div class="modal-description">Description</div>
        </div>
        <div class="modal-description-text" contenteditable="true" @input="onInputTaskDescription">
          {{ task.jobDescription }}
        </div>
        <!--
        <div class="modal-attachment-area">
          <i class="fas fa-paperclip mx-2 mt-2"></i>
          <div class="modal-description">Attachments</div>
        </div>
        <div class="modal-attachments">
          <img
            class="attachment-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONLf6CMkLnDZDUKldxxujdeba43yKLQtjbfbHvolj1qeqmWRXMVnltBkYUZRswxwnDRg&usqp=CAU"
          />
          <div class="attachment-title">
            Launch.jpeg
            <div class="attachment-btns">
              <button class="attachment-btn">Edit</button>
              <button class="attachment-btn">Delete</button>
            </div>
          </div>
        </div>
        <div class="add-attachment">Add an attachment</div>-->
        <div class="flex mb-4">
          <i class="fa-solid fa-list-check ml-2 mr-1 mt-2"></i>
          <div class="modal-description">Check List</div>
        </div>
        <div class="mb-4">
          <div class="flex" v-for="checkItem in task.checkLists" :key="checkItem.id">
            <div class="check-box" @click="checkChange"><i class="fa-solid fa-check " v-if="check"></i></div>
            <div>{{ checkItem.text }}</div>
          </div>
          <div class="add-new-check-area">
            <input v-if="newCheck" placeholder="Add an item" class="add-new-check-input" v-model="checkText"/>
            <div class="add-new-check-btn" @click="addNewCheck">Add</div>
          </div>
        </div>
        <div class="modal-activity-area">
          <i class="fa-solid fa-chalkboard-user ml-2 mr-1 mt-2"></i>
          <div class="modal-description">Activity</div>
        </div>
        <div class="activities" v-for="activity in task.activityHistories" :key="activity.id">
          <div class="activity-area">
            <div>
              <span class="activity-time">
                {{activity.date[0]}}{{activity.date[1]}}{{activity.date[2]}}{{activity.date[3]}}{{activity.date[4]}}{{activity.date[5]}}{{activity.date[6]}}{{activity.date[7]}}{{activity.date[8]}}{{activity.date[9]}} in 
                {{activity.date[11]}}{{activity.date[12]}}{{activity.date[13]}}{{activity.date[14]}}{{activity.date[15]}}
              </span>
            </div>
            <div class="acitivity">
              {{ activity.detail }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="toggleTaskModal"
    class="absolute z-40 inset-0 opacity-25 bg-black"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      toggleTaskModal: true,
      openAddTagInput: false,
      newTag: "",
      check: false,
      newCheck: false,
      checkText: "",
    };
  },
  methods: {
    addNewTag() {
      if(this.openAddTagInput){
        this.openAddTagInput = !this.openAddTagInput
        this.$store.dispatch("addNewTagToTask", this.newTag)
      }
      else{
        this.openAddTagInput = !this.openAddTagInput
        this.newTag = ""
      }
    },
    onInputTaskTitle(e) {
      this.$store.dispatch("updateTask", ["jobTitle", e.target.innerText])
    },
    onInputTaskDescription(e) {
      this.$store.dispatch("updateTask", ["jobDescription", e.target.innerText])
    },
    checkChange() {
      this.check = !this.check
    },
    addNewCheck(){
      if(!this.newCheck){
        this.newCheck = !this.newCheck
      }
      else{
        this.newCheck = !this.newCheck
        this.$store.dispatch("addNewCheckToTask", this.checkText)
        this.checkText = ""
      }
      
    }, 
  },
  computed: {
    task() {
      this.$store.dispatch("loadRoutingTask");
      return this.$store.state.routingTask
    },
  },
};
</script>

<style scoped>
@import "./Task.css";
</style>
