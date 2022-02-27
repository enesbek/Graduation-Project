<template>
  <div class="my-container m-0 flex">
    <div v-for="sections in sectionData" :key="sections.id">
      <draggable class="section mt-5 ml-7 mb-10 p-3 text-sm bg-gray-200 w-80 rounded" group="sections">
        <h3 class="text-xl p-2 rounded">{{sections.name}}</h3>
        <draggable class="h-32 bg-white m-2 p-3 rounded-md" 
             v-for="task in sections.tasks" :key="task.name"
             group="tasks"
        >
        
        <span v-for="tag in task.tags" :key="tag.name" class="tags p-1 mr-2 rounded text-white">{{ tag }}</span><br><br>
          {{task.taskName}}<br><br>
          <span class="">Date: {{task.date}} &emsp;<i class="fas fa-paperclip ml-10 mr-1"></i>{{task.attachment}}</span>
         
        </draggable>
        &emsp;<button class="addButton ml-10 mt-3 text-white rounded pt-3 pb-3 pl-10 pr-10" data-bs-toggle="modal" data-bs-target="#addTaskModal" v-on:click="submitSectionName(sections)">Add New Task</button>
        <!-- Add Task Modal Start -->
        <div class="modal fade" id="addTaskModal" tabindex="-1" aria-labelledby="addTaskModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addTaskModalLabel">Add New Task</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <label for="exampleInputEmail1" class="form-label">New Task</label>
                <input type="text" class="form-control" v-model="newTask.taskName">
                <label for="exampleInputEmail1" class="form-label">Date</label>
                <input type="text" class="form-control" v-model="newTask.date">
                <label for="exampleInputEmail1" class="form-label">Tag</label>
                <input type="text" class="form-control" v-model="newTask.tags[0]">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Add Task</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Add Task Modal Finish -->
      </draggable>
    </div>

    
  </div>
</template>
<script>
import { VueDraggableNext } from 'vue-draggable-next'

export default {
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      newTask:{sectionName: "",taskName: "", tags: [], date: "", attachment: 0},
      isModalVisible: false,
      enabled: true,
      sectionData: [
        {name: "Backlog", 
          tasks: [
            {taskName: "Build Feature 1", tags: ["App", "Android"], date: "21.01.2022", attachment: 1},
            {taskName: "Test the feature 1", tags: ["Web"], date: "15.01.2022", attachment: 2}
          ]
        },
        { name: "In Progress", 
          tasks: [
            {taskName: "Commit feature 1", tags: ["App", "Web"], date: "12.02.2022", attachment: 3},
          ]
        },
        {name: "Test", 
          tasks: [
            {taskName: "Put some sample data", tags: ["App", "IOS", "Android"], date: "14.03.2022", attachment: 2},
            {taskName: "Send notification to users", tags: ["App", "Web", "Security"], date: "15.02.2022", attachment: 5},
            {taskName: "Gather post project", tags: ["QA"], date: "12.03.2022", attachment: 1},
            {taskName: "Set up landing page", tags: ["App", "Web"], date: "11.02.2022", attachment: 3}
          ]
        },
        {name: "Done", 
          tasks: [
            {taskName: "Deploy feature 1", tags: ["App", "QA", "DW"], date: "01.02.2022", attachment: 4},
            {taskName: "Build the demo app", tags: ["Security", "Web"], date: "22.02.2022", attachment: 1}
          ]
        },
        {name: "Deployment", 
          tasks: [
            {taskName: "Update internal process", tags: ["Technical"], date: "21.01.2022", attachment: 2}
          ]
        },
      ],
      
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    submitSectionName(sections){
      this.newTask.sectionName = sections.name
      sections.tasks.push(this.newTask)
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.my-container{
  height: 94vh;
  background: url("https://wallpaperaccess.com/full/84303.jpg");
  background-repeat: none;
  background-size: cover;
}

.section{
  border-top: 5px solid rgb(44, 184, 102);
}

.addButton{
  background-color: rgb(68, 219, 131);
}

.tags{
  background-color: rgb(49, 196, 98);
}
</style>