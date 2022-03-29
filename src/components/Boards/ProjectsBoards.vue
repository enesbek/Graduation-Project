<template>
  <div class="project-boards">
    Project Boards
    <div class="content"></div>
    <div class="create-board text-xl font-semibold">
      Create New Board
      <br><span class="text-4xl font-semibold">+</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.project-boards{
  height: 90%;
}
.content{
  height: 75%;
}
.create-board{
  width: 80%;
  margin: auto;
  bottom: 0;
  height: 10rem;
  @apply bg-white text-center;
  text-align: center;
  padding-top: 7%;
}
.create-board:hover{
  background-color: #177c81;
  @apply text-white text-xl;
  cursor: pointer;
}
</style>