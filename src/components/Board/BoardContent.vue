<template>
  <div class="board-container">
    <div class="my-container flex">
      <div v-for="section in sections" :key="section.id">
        <draggable class="sections" group="sections">
          <h3 class="text-base pt-1 px-3 rounded">{{ section.sectionName }} 
            <i class="fa-solid fa-trash-can section-settings" @click="deleteSection(section)"></i>
          </h3>
          <draggable class="task-container" v-for="task in tasks" :key="task.name" group="tasks" >
            
            <span v-for="tag in task.tags" :key="tag.name" class="tags" @click="toggleTaskModal = !toggleTaskModal">
              {{ tag }}
            </span>
            <div class="task-name" @click="toggleTaskModal = !toggleTaskModal">
              {{ task.taskName }}
            </div>
            <div @click="toggleTaskModal = !toggleTaskModal">
              <i class="fa-solid fa-align-justify ml-2 mr-4"></i>
              <i class="fas fa-paperclip mr-4"></i>
              <i class="fa-solid fa-list-check"></i>
            </div>
          </draggable>
            &emsp;
          <button
            class="addButton"
            data-bs-toggle="modal"
            data-bs-target="#addTaskModal"
            v-on:click="submitSectionName(section)"
          >
            Add New Task
          </button>
          <!-- Add Task Modal Start -->
          <div
            v-if="toggleTaskModal"
            class="fixed overflow-x-hidden overflow-y-auto inset-0 justify-center items-center z-50"
          >
        <div class="task-modal relative mx-auto">
          <div class="bg-gray-100 w-full shadow-2xl flex flex-col rounded p-2">
            <div class="modal-top text-lg">
              <i class="fa-solid fa-laptop-code mx-2"></i>
              <span contenteditable="true" class="modal-title">{{
                task.taskName
              }}</span>
              <button class="modal-close-btn" @click="toggleTaskModal = false">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div>
              <p class="tag-title">Members</p>
              <div class="activity-avatar ml-11 float-left">S</div>
              <div class="activity-avatar float-left">E</div>
              <div class="activity-avatar float-left">V</div>
            </div>
            <p class="tag-title">Labels</p>
            <div class="modal-tag-area">
              <div v-for="tag in task.tags" :key="tag.name" class="modal-tags">
                {{ tag }}
              </div>
              <div class="modal-add-tag">+</div>
            </div>
            <div class="modal-description-area">
              <i class="fa-solid fa-align-justify mx-2 mt-2"></i>
              <div class="modal-description">Description</div>
            </div>
            <div class="modal-description-text" contenteditable="true">
              MOBIL 1 SATIR - 11 KARAKTER (ARAP EMIRLIKLERINDE MECBUR 2 SATIR
              OLUYOR) 2 SATIR - 22 (YINE MOBIL) 11 KARAKTER VE FIYAT YINE METIN
              SIGMAZ (ARAP EMIRLIKLERI) ARAP EMIRLIKLERI EN YUKSEK FIYAT 18
              KARAKTER (NOKTA VIRGUL DAHIL) **Mobil** 2 Satır olacak, 22
              karakter fiyat ve metin dahil **Web** 1 satır olacak, 16 karakter
              fiyat ve metin dahil **Not:** Web'de milyonlu fiyatlar olduğu
              takdir de sığabilecek karakter sayısı 25 oluyor, 6 karakter metin
              + 19 karakter fiyat
            </div>
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
            <div class="add-attachment">Add an attachment</div>
            <div class="modal-activity-area">
              <i class="fa-solid fa-chalkboard-user ml-2 mr-1 mt-2"></i>
              <div class="modal-description">Activity</div>
            </div>
            <div class="activities">
              <div class="activity-avatar">E</div>
              <div class="activity-area">
                <div>
                  <div class="activity-user">Enes Bek</div>
                  <div class="activity-time">27 Feb 2022 at 12:55</div>
                </div>
                <div class="acitivity" contenteditable="true">Moved task to In Analysis section</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="toggleTaskModal"
        class="absolute z-40 inset-0 opacity-25 bg-black"
      ></div>
          <!-- Add Task Modal Finish -->
        </draggable>
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
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
export default {
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
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
      isModalVisible: false,
      enabled: true,
      tasks: [
        {
          taskName: "Build Feature 1",
          tags: ["App", "Android"],
          date: "21.01.2022",
          attachment: 1,
        },
        {
          taskName: "Test the feature 1",
          tags: ["Web", "App", "Bug/Defect"],
          date: "15.01.2022",
          attachment: 2,
        },
        {
          taskName: "Test the feature 1",
          tags: ["Web", "App", "Bug/Defect"],
          date: "15.01.2022",
          attachment: 2,
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
    addNewSection() {
      this.$store.dispatch("createNewSection", this.newSection);
      this.newSection = ""  
    },
    deleteSection(section) {
      this.deleteSectionId = section.id
      this.$store.dispatch("deleteSection", this.deleteSectionId);
    }
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
@import './Task.css';
.board-container {
  height: calc(100vh - 50px);
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgb(255, 230, 198);
  overflow: auto;
}
.sections {
  border-top: 5px solid rgb(44, 184, 102);
  width: 270px;
  @apply mt-3 ml-3 text-sm bg-gray-200 rounded;
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
