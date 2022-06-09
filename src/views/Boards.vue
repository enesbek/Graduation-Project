<template>
  <div class="h-screen">
    <ProjectsBoards class="projects-boards bg-gray-200 ml-10 mt-4 rounded"/>
    <YourBoards class="your-boards bg-gray-320 ml-10 mt-4 rounded"/>
    <AssignedBoards class="projects-boards bg-gray-200 ml-10 mt-4 rounded"/>
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
  width: 29%;
  float: left;
}
.your-boards{
  width: 29%;
  float: left;
}
.assigned-boards{
  width: 29%;
  float: left;
}
</style>
