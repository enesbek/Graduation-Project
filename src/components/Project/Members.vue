<template>
  <div class="members-container flex">
    {{project.team}}
    <table id="membersTable">
      <tr>
        <th>User Name</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>E-mail</th>
      </tr>
      <tr v-for="user in project.userAssignedProjects" :key="user.id">
        <td>{{user.userName}}</td>
        <td>{{user.firstName}}</td>
        <td>{{user.lastName}}</td>
        <td>{{user.email}}</td>
      </tr>
      <tfoot>
        <tr>
          <td colspan="4" class="text-center cursor-pointer" @click="toggleAddMemberModal = !toggleAddMemberModal">
            <i class="fa-solid fa-plus"></i>
          </td>
        </tr>
      </tfoot>
    </table>
    <div>
      <div class="mr-20">
        <table id="teamsTable">
          <tr v-for="team in project.teams" :key="team.id">
            <td>{{team.teamName}}</td>
            <td class="project-team-delete-btn" @click="openConfirmModal(team.id)">Delete</td>
          </tr>
          <tfoot>
            <tr>
              <td colspan="4" class="text-center cursor-pointer" @click="toggleAddTeamModal = !toggleAddTeamModal">
                <i class="fa-solid fa-plus"></i>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    
    
    <!-- Add new people modal -->
    <div
      v-if="toggleAddMemberModal"
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
    >
      <div class="add-new-member-modal relative mx-auto w-auto max-w-4xl flex">
        <div class="bg-white w-full shadow-2xl max-w-2xl flex flex-col rounded">
          <div class="text-lg font-semibold">
            Add New Member
            <button class="add-new-member-modal-close-btn" @click="toggleAddMemberModal = false">
              <i class="fa-solid fa-xmark" mr-2></i>
            </button>
            <hr class="mt-1" />
          </div>
          <div class="italic">Email</div>
          <input class="add-new-member-modal-input" v-model="addUser"/>
          <button
            class="add-new-member-modal-add-btn"
            @click="adduserToProj"
          >
            Add
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="toggleAddMemberModal"
      class="absolute z-40 inset-0 opacity-25 bg-black"
    ></div>
    
    <!-- Add new team modal -->
    <div
      v-if="toggleAddTeamModal"
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
    >
      <div class="add-new-member-modal relative mx-auto w-auto max-w-4xl flex">
        <div class="bg-white w-full shadow-2xl max-w-2xl flex flex-col rounded">
          <div class="text-lg font-semibold">
            Create New Team
            <button class="add-new-member-modal-close-btn" @click="toggleAddTeamModal = false">
              <i class="fa-solid fa-xmark" mr-2></i>
            </button>
            <hr class="mt-1" />
          </div>
          <input placeholder="Enter Team Name" class="enter-team-name-input" v-model="newTeamName"/>
          <div v-for="user in project.userAssignedProjects" :key="user.id">
            <table id="addTeamMemberTable">
              <tr v-bind:style="teamsUsers.includes(user.id) ? {'background-color': '#04AA6D'} : {} ">
                <td class="w-24">{{user.firstName}}</td>
                <td class="w-24">{{user.lastName}}</td>
                <td class="w-36">{{user.email}}</td>
                <td class="addTeamMemberTable-add-btn" @click="addUserToTeam(user.id)">
                  <div class="text-center">Add</div>
                </td>
              </tr>
            </table>
          </div>
          <button
            class="add-new-member-modal-add-btn"
            @click="addTeamToProject"
          >
            Create
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="toggleAddTeamModal"
      class="absolute z-40 inset-0 opacity-25 bg-black"
    ></div>

    <!-- Delete team confirm modal -->
    <div
      v-if="toggleDeleteModal"
      class="fixed inset-0 flex justify-center items-center z-50"
    >
      <div class="delete-modal relative mx-auto max-w-4xl">
        <div class="bg-white w-full shadow-2xl max-w-2xl rounded">
          <div class="modal-title">Are you absolutely sure?</div>
          <p class="modal-type">
            Please type <span class="font-semibold italic">delete</span> to
            confirm.
          </p>
          <input class="modal-input" v-model="deleteText" /><br />
          <button class="modal-btn" @click="deleteTeamFromProject">Delete</button>
          <button class="modal-btn-close" @click="toggleDeleteModal = false">
            Close
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="toggleDeleteModal"
      class="absolute z-40 inset-0 opacity-25 bg-black"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addUser: "",
      toggleAddMemberModal: false,
      toggleAddTeamModal: false,
      toggleDeleteModal: false,
      teamsUsers: [],
      newTeamName: "",
      deleteTeamId: null,
      deleteText: "",
    }
  },
  methods: {
    adduserToProj(){
      this.$store.dispatch("addUserToProject", this.addUser);
      this.addUser = ""
      this.toggleAddMemberModal = false
    },
    addUserToTeam(id) {
      if(this.teamsUsers.includes(id)){
        let index = this.teamsUsers.indexOf(id)
        this.teamsUsers.splice(index, 1)
      }
      else {
        this.teamsUsers.push(id)
      }
    },
    addTeamToProject() {
      this.$store.dispatch("addTeamToProject", [this.newTeamName, this.teamsUsers])
      this.teamsUsers = [],
      this.newTeamName = ""
    },
    openConfirmModal(id) {
      this.toggleDeleteModal = !this.toggleDeleteModal
      this.deleteTeamId = id
    },
    deleteTeamFromProject() {
      if(this.deleteText == "delete") {
        this.deleteText = ""
        // Delete Team From Backend
        this.toggleDeleteModal = !this.toggleDeleteModal
      }
      else{
        this.deleteText = ""
      }
    }
  },
  computed: {
    project() {
      return this.$store.state.project
    }
  },
};
</script>

<style>
.members-container {
  margin: auto;
  text-align: center;
}
.input-area {
  @apply border-2 border-black rounded p-1 mb-2 mt-4 ml-1;
}
.add-btn {
  @apply bg-blue-600 text-white py-2 rounded ml-2 w-48;
}
#membersTable {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}

#membersTable td, #membersTable th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

#membersTable tr:nth-child(even){background-color: #f2f2f2;}

#membersTable tr:hover {background-color: #ddd;}

#membersTable th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}

#teamsTable {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 400px;
  margin-left: 20px;
  margin-right: auto;
  margin-top: 20px;
}

#teamsTable td, #teamsTable th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

#teamsTable tr:nth-child(even){background-color: #f2f2f2;}

#teamsTable tr:hover {background-color: #ddd;}

#teamsTable th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}

.project-team-delete-btn{
  color: red;
  cursor: pointer;
  @apply text-center font-semibold w-12;
}

.project-team-delete-btn:hover{
  color: white;
  background-color: red;
}


.enter-team-name-input{
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  @apply mb-2 w-48 rounded px-1;
}

#addTeamMemberTable {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 500px;
  margin-left: 12px;
  margin-right: 12px;
}

#addTeamMemberTable td, #addTeamMemberTable th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.addTeamMemberTable-add-btn{
  text-align: center;
  cursor: pointer;
  @apply w-8 pl-2 font-semibold;
}

.addTeamMemberTable-add-btn:hover{
  color: #078e5c;
}

.addTeamMemberTable-add-btn:active{
  background-color: #078e5c;
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

.delete-modal {
  display: flex;
  justify-content: center;
  width: 240px;
}
.confirm-modal {
  display: flex;
  justify-content: center;
  width: 250px;
}
.modal-title {
  background-color: rgb(146, 169, 189);
  @apply p-2 font-semibold pl-4 text-lg;
  width: 240px;
}
.modal-type {
  @apply pt-2 pl-4;
}
.modal-input {
  border: 2px solid black;
  height: 30px;
  @apply border-black mx-4 px-1 text-center;
  margin-bottom: 0;
}
.modal-btn {
  background-color: red;
  @apply mb-2 p-2 rounded mt-0 place-content-center  ml-3 mt-4;
  width: 100px;
}
.modal-btn-close {
  background-color: rgb(180, 180, 180);
  @apply mb-2 p-2 rounded mt-0 place-content-center ml-3 mt-4;
  width: 100px;
}
</style>
