<template>
  <div class="assigned-boards">
    <div class="title">
      Assigned Boards
    </div>
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
.assigned-boards{
  height: 90%;
}
.title{
  width: 100;
  text-align: center;
}
.content{
  height: 75%;
}
.create-board{
  width: 80%;
  margin: auto;
  bottom: 0;
  height: 8rem;
  @apply bg-white text-center;
  text-align: center;
  padding-top: 7%;
}
.create-board:hover{
  background-color: #034d5e;
  @apply text-white text-xl;
  cursor: pointer;
}
</style>