<template>
  <div class="board-header">
    <!--<div class="header-btn"><button class="font-semibold">{{project.projectName}}</button></div><div class="text-3xl">I</div>-->
     
    <div class="header-btn"><button class="font-semibold">{{board.board_name}}</button></div><div class="text-3xl">I</div>
    <div class="header-btn"><button class="font-semibold">Users</button></div><div class="text-3xl">I</div>
    <div class="header-btn"><button class="font-semibold" @click="toggleAddBoardMemberModal = !toggleAddBoardMemberModal">Share</button></div><div class="text-3xl">I</div>
    <div class="header-btn"><button class="font-semibold" @click="openSettingsModal = !openSettingsModal">Settings</button></div>
  </div>
  {{board}}
  <div
      v-if="toggleAddBoardMemberModal"
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
    >
      <div class="add-new-member-modal relative mx-auto w-auto max-w-4xl flex text-center">
        <div class="bg-white w-full shadow-2xl max-w-2xl flex flex-col rounded">
          <div class="text-lg font-semibold">
            Add New Member
            <button class="add-new-member-modal-close-btn" @click="toggleAddBoardMemberModal = false">
              <i class="fa-solid fa-xmark" mr-2></i>
            </button>
            <hr class="mt-1" />
          </div>
          <div class="italic">Email</div>
          <input class="add-new-member-modal-input" v-model="addUser"/>
          <button
            class="add-new-member-modal-add-btn"
            @click="adduserToBoard"
          >
            Add
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="toggleAddBoardMemberModal"
      class="absolute z-40 inset-0 opacity-25 bg-black"
    ></div>
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
      toggleAddBoardMemberModal: false,
      addUser: "",
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
    adduserToBoard(){
      
    },
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

.add-new-member-modal {
  height: 13rem;
}
.add-new-member-modal-close-btn {
  @apply text-lg mr-2 ml-4;
  float: right;
}
.add-new-member-modal-input{
  border: 1px solid black;
  height: 30px;
  @apply rounded mx-8 px-1 mt-2;
}
.add-new-member-modal-add-btn{
  margin: auto;
  background-color: blue;
  margin-top: 0; 
  margin-bottom: 0; 
  @apply text-white font-semibold p-2 rounded px-4 my-4;
}
</style>
