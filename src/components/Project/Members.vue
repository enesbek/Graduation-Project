<template>
  <div class="members-container">
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
    <!-- Add new people modal -->
    <div
      v-if="toggleAddMemberModal"
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
    >
      <div class="add-new-member-modal relative mx-auto w-auto max-w-4xl flex">
        <div class="bg-white w-full shadow-2xl max-w-2xl flex flex-col rounded">
          <div class="text-lg">
            Add New Member
            <button class="add-new-member-modal-close-btn" @click="toggleAddMemberModal = false">
              <i class="fa-solid fa-xmark" mr-2></i>
            </button>
            <hr class="mt-1" />
          </div>
          <div>Email</div>
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
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      addUser: "",
      toggleAddMemberModal: false,
    }
  },
  methods: {
    adduserToProj(){
      this.$store.dispatch("addUserToProject", this.addUser);
      this.addUser = ""
      this.toggleAddMemberModal = false
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
  width: 1000px;
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
