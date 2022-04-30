<template>
  <div class="delete-area">
    <div class="delete-btn" @click="toggleDeleteModal = !toggleDeleteModal">
      Delete Project
    </div>
    <!-- Modal -->
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
          <button class="modal-btn" @click="deleteProject1">Delete</button>
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

    <div
      v-if="toggleConfirmModal"
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
    >
      <div class="confirm-modal relative relative mx-auto max-w-4xl">
        <div class="loader"></div>
      </div>
    </div>
    <div
      v-if="toggleConfirmModal"
      class="absolute z-40 inset-0 opacity-25 bg-black"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleDeleteModal: false,
      toggleConfirmModal: false,
      deleteText: null,
    };
  },
  methods: {
    deleteProject1() {
      if (this.deleteText == "delete") {
        this.toggleDeleteModal = false;
        this.toggleConfirmModal = true;
        this.$store.dispatch("deleteProject");
      }
    },
  },
};
</script>

<style scoped>
.delete-area {
  margin-top: 50px;
  height: 60px;
  display: flex;
  justify-content: center;
}
.delete-btn {
  width: 200px;
  height: 40px;
  cursor: pointer;
  background-color: red;
  display: flex;
  justify-content: center;
  @apply text-white font-semibold text-lg rounded;
  line-height: 40px;
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
  @apply p-2 font-semibold pl-4;
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
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
