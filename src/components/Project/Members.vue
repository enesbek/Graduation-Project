<template>
  <div class="members-container">
    <h5 class="mt-6 text-lg">Add New People To The Project</h5>
    <div>
      <input class="input-area" v-model="addUser" /><br/>
      <button class="add-btn" @click="adduserToProj">Add People</button
      ><br />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      addUser: "",
    }
  },
  methods: {
    adduserToProj(){
      this.$store.dispatch("addUserToProject", this.addUser);
    }
  },
  computed: mapState(["routingProject"]),
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
</style>
