<template>
  <div class="board-header">
    <div class="header-btn"><button class="font-semibold">Project Name</button></div><div class="text-3xl">I</div> 
    <div class="header-btn"><button class="font-semibold">Board Name</button></div><div class="text-3xl">I</div>
    <div class="header-btn"><button class="font-semibold">Users</button></div><div class="text-3xl">I</div>
    <div class="header-btn"><button class="font-semibold">Share</button></div><div class="text-3xl">I</div>
    <div class="header-btn"><button class="font-semibold">Settings</button></div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  components: {
  }
}
</script>

<style scoped>
.board-header{
  width: 100%;
  height: 50px;
  background-color: rgb(213, 213, 213);
  align-items: center;
  @apply flex flex-nowrap text-sm font-semibold;
  margin: 0 auto;
  
}
.header-btn{
  @apply mx-4 font-semibold;
  margin: 0 auto;
}
.header-btn:hover{
  background-color: rgb(177, 177, 177);
  @apply rounded px-2 py-1;
}
</style>
