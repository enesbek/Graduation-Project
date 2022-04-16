<template>
  <div class="board-container">
    <div class="my-container flex">
      <div v-for="sections in sectionData" :key="sections.id">
        <draggable class="sections" group="sections">
          <h3 class="text-base pt-1 px-3 rounded">{{ sections.name }}</h3>
          <draggable
            class="task"
            v-for="task in sections.tasks"
            :key="task.name"
            group="tasks"
          >
            <span v-for="tag in task.tags" :key="tag.name" class="tags">
              {{ tag }}
            </span>
            <div class="task-name">{{ task.taskName }}</div>
            <div>
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
            v-on:click="submitSectionName(sections)"
          >
            Add New Task
          </button>
          <!-- Add Task Modal Start -->
          
          <!-- Add Task Modal Finish -->
        </draggable>
      </div>
      <div class="sections">Add anotasdasher section
        <div class="w-48 p-3 m-3"></div>
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
          tasks: [
            {
              taskName: "Build Feature 1",
              tags: ["App", "Android"],
              date: "21.01.2022",
              attachment: 1,
            },
            {
              taskName: "Test the feature 1",
              tags: ["Web"],
              date: "15.01.2022",
              attachment: 2,
            },
          ],
        },
        {
          name: "In Progress",
          tasks: [
            {
              taskName: "Commit feature 1",
              tags: ["App", "Web"],
              date: "12.02.2022",
              attachment: 3,
            },
          ],
        },
        {
          name: "Test",
          tasks: [
            {
              taskName: "Put some sample data",
              tags: ["App", "IOS", "Android"],
              date: "14.03.2022",
              attachment: 2,
            },
            {
              taskName: "Send notification to users",
              tags: ["App", "Web", "Security"],
              date: "15.02.2022",
              attachment: 5,
            },
            {
              taskName: "Gather post project",
              tags: ["QA"],
              date: "12.03.2022",
              attachment: 1,
            },
            {
              taskName: "Set up landing page",
              tags: ["App", "Web"],
              date: "11.02.2022",
              attachment: 3,
            },
          ],
        },
        {
          name: "Done",
          tasks: [
            {
              taskName: "Deploy feature 1",
              tags: ["App", "QA", "DW"],
              date: "01.02.2022",
              attachment: 4,
            },
            {
              taskName: "Build the demo app",
              tags: ["Security", "Web"],
              date: "22.02.2022",
              attachment: 1,
            },
          ],
        },
        {
          name: "Deployment",
          tasks: [
            {
              taskName: "Update internal process",
              tags: ["Technical"],
              date: "21.01.2022",
              attachment: 2,
            },
          ],
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
  @apply text-xs p-1 mr-2 rounded text-white font-semibold;
}
.task-name{
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
