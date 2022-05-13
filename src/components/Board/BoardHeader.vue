<template>
  <div class="board-header">
    <!--<div class="header-btn"><button class="font-semibold">{{project.projectName}}</button></div><div class="text-3xl">I</div>--> 
    <div class="header-btn"><button class="font-semibold">{{board.board_name}}</button></div><div class="text-3xl">I</div>
    <div class="header-btn"><button class="font-semibold">Users</button></div><div class="text-3xl">I</div>
    <div class="header-btn"><button class="font-semibold">Share</button></div><div class="text-3xl">I</div>
    <div class="header-btn"><button class="font-semibold" @click="openSettingsModal = !openSettingsModal">Settings</button></div>
  </div>
  <div v-if="openSettingsModal" class="board-settings-modal">
    <div></div>
    <div class="board-settings-delete">DELETE</div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  data() {
    return {
      openSettingsModal: false,
    }
  },
  components: {
  },
  computed: {
    board(){
      return this.$store.state.routingBoard
    },
    project(){
      return this.$store.state.routingProject
    },
  },
  methods:{
    deleteBoard(){
      
    }
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
  @apply font-semibold rounded px-8 py-2;
  margin: 0 auto;
  cursor: pointer;
}
.header-btn:hover{
  background-color: rgb(177, 177, 177);
  @apply rounded px-8 py-1;
}
.board-settings-modal{
  background-color: white;
  width: 90px;
  height: 30px;
  margin-top: 50px;
  position: absolute;
  top: 0;
  right: 110px;
  z-index: 10;
  @apply rounded;
}
.board-settings-delete{
  background-color: red;
  width: 90px;
  height: 30px;
  position: absolute;
  cursor: pointer;
  @apply rounded text-white text-center font-bold tracking-wide;
}
.board-settings-delete:hover{
  @apply text-black
}
</style>
