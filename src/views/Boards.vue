<template>
  <div class="h-screen">
    <ProjectsBoards class="projects-boards bg-gray-300 ml-10 mt-5"/>
    <YourBoards class="your-boards bg-gray-300 ml-10 mt-5"/>
    <AssignedBoards class="assigned-boards bg-gray-300 ml-10 mt-5"/>
  </div>
</template>

<script>
import ProjectsBoards from '@/components/Boards/ProjectsBoards.vue'
import YourBoards from '@/components/Boards/YourBoards.vue'
import AssignedBoards from '@/components/Boards/AssignedBoards.vue'
export default {
  name: 'Boards',
  components: {
    ProjectsBoards,
    YourBoards,
    AssignedBoards
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.projects-boards{
  width: 30%;
  height: 90vh;
  float: left;
}
.your-boards{
  width: 30%;
  height: 90vh;
  float: left;
}
.assigned-boards{
  width: 30%;
  height: 90vh;
  float: left;
}
</style>
