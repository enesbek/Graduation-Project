<template>
  <div class="board-header">
    <!--<div class="header-btn"><button class="font-semibold">{{project.projectName}}</button></div><div class="text-3xl">I</div>-->
     
    <div class="header-btn"><button class="font-semibold">{{board.board_name}}</button></div><div class="text-3xl">I</div>
    <div class="header-btn"><button class="font-semibold" @click="toggleBoardMembersModal = !toggleBoardMembersModal">Users</button></div><div class="text-3xl">I</div>
    <div class="header-btn"><button class="font-semibold" @click="toggleAddBoardMemberModal = !toggleAddBoardMemberModal">Share</button></div><div class="text-3xl">I</div>
    <div class="header-btn"><button class="font-semibold" @click="openSettingsModal = !openSettingsModal">Settings</button></div>
  </div>
  <!-- Add Board Members Modal-->
  <div v-if="toggleAddBoardMemberModal" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50">
    <div class="board-members-modal relative mx-auto w-auto max-w-4xl flex text-center">
      <div class="bg-white w-full shadow-2xl max-w-2xl flex flex-col rounded">
        <div class="text-lg font-semibold">
          Users List From Project
          <button class="board-members-modal-close-btn" @click="toggleAddBoardMemberModal = false">
            <i class="fa-solid fa-xmark" mr-2></i>
          </button>
          <hr class="mt-1" />
        </div>
        <div v-for="user in project.userAssignedProjects" :key="user.id">
          <table id="addTeamMemberTable">
            <tr v-bind:style="boardUsersArray.includes(user.id) ? {'background-color': '#04AA6D'} : {} ">
              <td class="w-24">{{user.firstName}}</td>
              <td class="w-24">{{user.lastName}}</td>
              <td class="w-36">{{user.email}}</td>
              <td class="addTeamMemberTable-add-btn" @click="addUserToArray(user.id)">
                <div class="text-center">Add</div>
              </td>
            </tr>
          </table>
        </div>
        <button
            class="add-new-member-modal-add-btn"
            @click="addUsersToBoard"
          >
            Add to Board
          </button>
      </div>
    </div>
  </div>
  <div v-if="toggleAddBoardMemberModal" class="absolute z-40 inset-0 opacity-25 bg-black">

  </div>

  <!-- Board Members Modal-->
  <div v-if="toggleBoardMembersModal" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50">
    <div class="board-members-modal relative mx-auto w-auto max-w-4xl flex text-center">
      <div class="bg-white w-full shadow-2xl max-w-2xl flex flex-col rounded">
        <div class="text-lg font-semibold">
          Members
          <button class="board-members-modal-close-btn" @click="toggleBoardMembersModal = false">
            <i class="fa-solid fa-xmark" mr-2></i>
          </button>
          <hr class="mt-1" />
        </div>
        <table id="board-members-table">
          <tr>
            <th>User Name</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
          </tr>
          <tr v-for="user in board.boardHasUsers" :key="user.id">
            <td>{{user.userName}}</td>
            <td>{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.email}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <div v-if="toggleBoardMembersModal" class="absolute z-40 inset-0 opacity-25 bg-black">
    
  </div>



  <!-- Settings Modal --> 
  <div
    v-if="openSettingsModal"
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
  >
    <div class="board-settings-modal relative mx-auto w-auto max-w-4xl flex text-center">
      <div class="bg-white w-full shadow-2xl max-w-2xl flex flex-col rounded">
        <div class="text-lg font-semibold">
          Settings
          <button class="board-settings-modal-close-btn" @click="openSettingsModal = false">
            <i class="fa-solid fa-xmark" mr-2></i>
          </button>
          <hr class="mt-1" />
        </div>
        
        <button
          class="board-settings-modal-delete-btn"
          @click="deleteBoard(board.id)"
        >
          DELETE BOARD
        </button>
      </div>
    </div>
  </div>
  <div v-if="openSettingsModal" class="absolute z-40 inset-0 opacity-25 bg-black">
  </div>
  <div
      v-if="toggleBoardConfirmModal"
      class="fixed inset-0 flex justify-center items-center z-50"
    >
      <div class="delete-modal relative mx-auto max-w-4xl">
        <div class="bg-white w-full shadow-2xl max-w-2xl rounded">
          <div class="modal-title ml-10">Are you sure?</div>
          <p class="modal-type">
            Please type <span class="font-semibold italic">delete</span> to
            confirm.
          </p>
          <input class="modal-input" v-model="deleteBoardText" /><br />
          <button class="modal-btn" @click="deleteBoardConfirm">Delete</button>
          <button class="modal-btn-close" @click="toggleBoardConfirmModal = false">
            Close
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="toggleBoardConfirmModal"
      class="absolute z-40 inset-0 opacity-25 bg-black"
    ></div>
</template>

<script>
export default {
  name: 'Board',
  data() {
    return {
      openSettingsModal: false,
      toggleAddBoardMemberModal: false,
      addUser: "",
      toggleBoardMembersModal: false,
      toggleBoardConfirmModal: false,
      deleteBoardId: null,
      deleteBoardText: null,
      boardUsersArray: [], 
    }
  },
  computed: {
    board(){
      return this.$store.state.routingBoard
    },
    project(){
      return this.$store.state.project
    },
  },
  methods:{
    adduserToBoard(){
      this.$store.dispatch("addUserToBoard", this.addUser)
    },
    deleteBoard(id){
      this.deleteBoardId = id
      this.openSettingsModal = false
      this.toggleBoardConfirmModal = true
    },
    deleteBoardConfirm() {
      if(this.deleteBoardText == 'delete'){
        this.$store.dispatch("deleteBoard", this.deleteBoardId)
      }
      else{
        this.deleteBoardText = ""
      }
    },
    addUserToArray(id) {
      if(this.boardUsersArray.includes(id)){
        let index = this.boardUsersArray.indexOf(id)
        this.boardUsersArray.splice(index, 1)
      }
      else {
        this.boardUsersArray.push(id)
      }
    },
    addUsersToBoard() {
      this.$store.dispatch("addUsersToBoard", this.boardUsersArray)
      this.boardUsersArray = []
      this.toggleAddBoardMemberModal = false
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
}

.board-settings-modal-update{
  border: 1px solid black;
}

.board-settings-modal-dates{
  align-items: left;
  border: 1px solid black;
  @apply w-32 rounded px-1 mb-2;
}

.board-settings-modal-board-name{
  border: 1px solid black;
  width: 210px;
  @apply rounded px-1 mx-8 my-2;
}

.board-settings-modal-close-btn {
  @apply text-lg mr-2 ml-4;
  float: right;
}

.board-settings-modal-delete-btn{
  margin: auto;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: red;
  cursor: pointer;
  @apply px-6 py-2 text-white text-xl font-semibold rounded;
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

.board-members-modal-close-btn {
  @apply text-lg mr-2 ml-4;
  float: right;
}

#board-members-table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 500px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

#board-members-table td, #board-members-table th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

#board-members-table tr:nth-child(even){background-color: #f2f2f2;}

#board-members-table tr:hover {background-color: #ddd;}

#board-members-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}

</style>
