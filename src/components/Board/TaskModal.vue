<template>
  <div
    v-if="toggleTaskModal"
    class="modal fixed overflow-x-hidden overflow-y-auto inset-0 justify-center items-center z-50"
  >
    <div class="task-modal relative mx-auto">
      <div class="bg-gray-100 w-full shadow-2xl flex flex-col rounded p-2">
        <div class="modal-top text-lg">
          <i class="fa-solid fa-laptop-code mx-2"></i>
          <span contenteditable="true" class="modal-title">
						Sample Task
					</span>
          <button class="modal-close-btn" @click="toggleTaskModal = false">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <p class="tag-title">Labels</p>
        <div class="modal-tag-area">
          <div v-for="tag in task.tags" :key="tag.name" class="modal-tags">
            {{ tag }}
          </div>
          <div class="modal-add-tag">+</div>
        </div>
        <div class="modal-description-area">
          <i class="fa-solid fa-align-justify mx-2 mt-2"></i>
          <div class="modal-description">Description</div>
        </div>
        <div class="modal-description-text" contenteditable="true">
          MOBIL 1 SATIR - 11 KARAKTER (ARAP EMIRLIKLERINDE MECBUR 2 SATIR OLUYOR) 2 SATIR - 22 (YINE MOBIL) 11 KARAKTER VE FIYAT YINE METIN
          SIGMAZ (ARAP EMIRLIKLERI) ARAP EMIRLIKLERI EN YUKSEK FIYAT 18 KARAKTER (NOKTA VIRGUL DAHIL) **Mobil** 2 Satır olacak, 22 karakter fiyat ve
          metin dahil **Web** 1 satır olacak, 16 karakter fiyat ve metin dahil **Not:** Web'de milyonlu fiyatlar olduğu takdir de sığabilecek
          karakter sayısı 25 oluyor, 6 karakter metin + 19 karakter fiyat
        </div>
        <div class="modal-attachment-area">
          <i class="fas fa-paperclip mx-2 mt-2"></i>
          <div class="modal-description">Attachments</div>
        </div>
        <div class="modal-attachments">
          <img
            class="attachment-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONLf6CMkLnDZDUKldxxujdeba43yKLQtjbfbHvolj1qeqmWRXMVnltBkYUZRswxwnDRg&usqp=CAU"
          />
          <div class="attachment-title">
            Launch.jpeg
            <div class="attachment-btns">
              <button class="attachment-btn">Edit</button>
              <button class="attachment-btn">Delete</button>
            </div>
          </div>
        </div>
        <div class="add-attachment">Add an attachment</div>
        <div class="modal-activity-area">
          <i class="fa-solid fa-chalkboard-user ml-2 mr-1 mt-2"></i>
          <div class="modal-description">Activity</div>
        </div>
        <div class="activities">
          <div class="activity-avatar">E</div>
          <div class="activity-area" contenteditable="true">
            <div>
              <div class="activity-user">Enes Bek</div>
              <div class="activity-time">27 Feb 2022 at 12:55</div>
            </div>
            <div class="acitivity">Moved task to In Analysis section</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="toggleTaskModal"
    class="absolute z-40 inset-0 opacity-25 bg-black"
  ></div>
  <!-- Modal -->
</template>

<script>
export default {
	props: {
    toggleTaskModal: Boolean
  }
};
</script>

<style scoped>

.task-container {
  @apply bg-white m-2 p-1 rounded-md;
}

.addButton {
  background-color: rgb(68, 219, 131);
  @apply ml-10 mt-3 text-white rounded pt-3 pb-3 pl-10 pr-10 mb-2;
}

.tags {
  background-color: rgb(44, 89, 200);
  @apply px-1 pb-1 mr-1 rounded text-white font-bold;
  font-size: 13px;
  letter-spacing: 0.5px;
}

.task-name {
  @apply mt-2 mb-2;
}

.task-modal {
  width: 600px;
  margin-top: 3%;
  margin-top: 3%;
  height: 90vh;
}

.modal-top {
  width: 100%;
  margin-top: 6px;
  margin-bottom: 0;
}

.modal-title {
  display: inline-block;
  @apply p-1 font-semibold text-2xl;
  width: 470px;
}

.modal-close-btn {
  width: 40px;
  height: 40px;
  @apply text-xl text-center rounded-full;
  background-color: rgb(220, 220, 220);

  float: right;
}

.modal-tag-area {
  @apply flex mb-2;
  margin-left: 45px;
}

.tag-title {
  @apply text-xs font-bold mt-4 mr-1 mb-1 pb-0 opacity-75;
  margin-left: 45px;
  text-decoration: underline;
}

.modal-tags {
  @apply m-0 p-0 text-white mr-2 font-semibold rounded px-2 mb-4 pb-7 text-lg;
  background-color: rgb(44, 89, 200);
  height: 20px;
  cursor: pointer;
}

.modal-add-tag {
  height: 30px;
  padding: 0;
  font-size: 25px;
  @apply rounded border-2 border-gray-500 px-2 font-bold;
  cursor: pointer;
}

.modal-add-tag:hover {
  @apply bg-gray-500 text-white;
}

.modal-description-area {
  @apply flex;
}

.modal-description {
  @apply font-semibold text-xl;
  margin-left: 15px;
}

.modal-description-text {
  margin-left: 38px;
  width: 500px;
  @apply mt-2 p-2 mb-8;
}

.modal-attachment-area {
  @apply flex;
}

.modal-attachments {
  margin-left: 45px;
  width: 500px;
  @apply mb-4 flex mt-4;
  background-color: rgb(230, 230, 230);
}

.attachment-img {
  width: 100px;
  height: 80px;
}

.attachment-title {
  margin-left: 20px;
  @apply text-base font-semibold pt-2;
}

.attachment-btns {
  @apply mt-4 mb-0 text-base;
}

.attachment-btn {
  text-decoration: underline;
  margin-left: 0;
  @apply mr-4 opacity-75;
}

.add-attachment {
  margin-left: 45px;
  width: 160px;
  background-color: rgb(220, 220, 220);
  @apply px-4 py-2 mb-8;
  cursor: pointer;
}

.modal-activity-area {
  @apply flex mb-6;
}

.activities {
  @apply mb-16 flex;
}

.activity-avatar {
  background-color: orange;
  width: 30px;
  height: 30px;
  @apply rounded-full text-xl text-center text-white font-bold ml-1;
}

.activity-area {
  @apply px-1 ml-2;
}

.activity-user {
  @apply font-semibold mr-2 text-base;
  float: left;
  line-height: 0.9;
}

.activity-time {
  @apply text-xs opacity-75 font-semibold;
  text-align: bottom;
}

.acitivity {
  width: 500px;
  @apply bg-white p-2 mt-1;
}
</style>
