<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <div class="text-base mt-3">
      <span v-if="collapsed">
        <div>PMS</div>
      </span>
      <span v-else>PROJECT MANAGEMENT SYSTEM</span>
    </div>

    <hr>
    <SidebarLink to="/dashboard" icon="fas fa-home" class="text-xl m-1">DASHBOARD</SidebarLink><hr>
    <SidebarLink to="/projects" icon="fas fa-poll-h" class="text-xl m-2">PROJECTS</SidebarLink><hr>
    <SidebarLink to="/boards" icon="fas fa-clipboard" class="text-xl m-2">BOARDS</SidebarLink><hr>
    <SidebarLink to="/dashboard" icon="fas fa-calendar-week" class="text-xl m-2">AGENDA</SidebarLink><hr>
    <div class="profileMenuBtn" @click="showProfileMenu"><i class="fas fa-user icon-user"/>
      <span v-if="collapsed">
        <div></div>
      </span>
      <span v-else>PROFILE</span>
    </div>
    <div v-if="openMenu" class="profileMenu">
      <div class="user-info">
        <div class="user-icon">
          {{ user.firstName[0] }}
        </div>
        <div>
          <span class="ml-2 text-lg font-semibold">{{ user.firstName }}</span>
          <span class="ml-2 text-lg font-semibold">{{ user.lastName }}</span> 
          <div class="ml-2 italic text-sm">
            {{ user.email }}
          </div>
        </div>
      </div>
      <hr>
      <div class="profile-menu-inner">
        <div class="profile-settings">
          Settings
        </div>
        <div class="profile-notifications" @click="showNotificationModal">
          Notifications
        </div>
        <div class="profile-logout" @click="userLogout">
          Logout
        </div>
      </div>
    </div>

    <span class="collapse-icon" :class="{ 'rotate-180': collapsed}" @click="toggleSidebar">
      <i class="fas fa-angle-double-left"></i>
    </span>

    <!-- Modal Start --> 
    <div
      v-if="toggleNotificationModal"
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
    >
      <div class="notifications-modal relative flex">
        <div class="bg-white w-full shadow-2xl max-w-2xl flex flex-col rounded">
          <div class="modal-title text-lg">
            Notifications
            <button class="modal-close-btns" @click="toggleNotificationModal = false">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <hr class="mt-1" />
          </div>
          <div v-if="notifications" class="text-center">
            There is no notification here!
          </div>
          <div class="notifications-cards" v-for="notification in notifications" :key="notification.id">
            <div class="notifications-card">
              The user "{{ notification.sender_user.userName }}" 
              wants to assign you to the {{ notification.target_type }} 
              "{{ notification.project.projectName }}"

              <hr/>
              Description: {{ notification.project.projectDescription }}  <br/>
              <div class="notification-btns">
                <div class="notification-accept" @click="acceptNotification(notification)">Accept</div>
                <div class="notification-deny" @click="denyNotification(notification)">Deny</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="toggleNotificationModal"
      class="absolute z-40 inset-0 opacity-25 bg-black"
    ></div>
    <!-- Modal End -->
  </div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import SidebarLink from './SidebarLink.vue'
export default {
  components: { SidebarLink },
  data() {
    return {
      openMenu: false,
      toggleNotificationModal: false,
    }
  },
  setup() {
    return {
      collapsed, toggleSidebar, sidebarWidth,
    }
  },
  methods:{
    showProfileMenu(){
      this.openMenu = !this.openMenu
    },
    showNotificationModal(){
      this.openMenu = false
      this.toggleNotificationModal = !this.toggleNotificationModal
    },
    userLogout(){
      setTimeout(() => {
        this.$store.dispatch("changeSidebarStateLogout");
      }, 500);
    },
    acceptNotification(notification) {
      this.$store.dispatch("acceptNotification", notification.id);
    },
    denyNotification(notification) {
      this.$store.dispatch("denyNotification", notification.id);
    }
  },
  computed: {
    user() {
      this.$store.dispatch("loadUser");
      return this.$store.state.user
    },
    notifications() {
      this.$store.dispatch("loadNotifications");
      return this.$store.state.notifications
    }
  }
}
</script>

<style>
:root {
  --sidebar-bg-color: #034d5e;
  --sidebar-item-hover: #093e42;
  --sidebar-item-active: #177c81;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-image: linear-gradient(#1c959c, #034d5e);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 1em;

  transition: 0.3s linear;

  display: flex;
  flex-direction: column;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 1em;
  padding-left: 0.5em;
  width: 0rem;
  color: white;
  font-size: 2em;
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
.icon-user {
  flex-shrink: 0;
  width: 25px;
  padding: 0.4em;
  margin-right: 20px;
}
.profileMenuBtn {
  cursor: pointer;
  @apply text-xl m-2 rounded;
}
.profileMenu {
  width: 400px;
  height: 300px;
  background-color: white;
  color: black;
  margin-left: 150px;
  @apply rounded border-2;
}
.profileMenuBtn:hover {
  font-weight: 500;
  background-color: var(--sidebar-item-hover);
}
.user-info {
  margin-left: 10px;
  margin-top: 10px;
  @apply flex;
}
.user-icon {
  background-color: #16858d;
  width: 50px;
  height: 50px;
  @apply rounded-full text-3xl text-center text-white font-semibold p-1;
}
.profile-menu-inner {
  @apply flex;
}
.profile-settings {
  background-color: blue;
  width: 100px;
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
  @apply rounded p-2 text-center text-white;
}
.profile-notifications {
  background-color: gray;
  width: 150px;
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
  @apply rounded p-2 text-center text-white;
}
.profile-logout {
  background-color: red;
  width: 100px;
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
  @apply rounded p-2 text-center text-white;
}

.notifications-modal {
  min-height: 150px;
  width: 320px;
  @apply text-black border-2 rounded;
}
.modal-title {
  width: 100%;
  text-align: center;
  margin-top: 6px;
  margin-bottom: 0;
}
.modal-close-btns {
  @apply text-lg mr-4;
  float: right;
}
.notifications-card{
  width: 300px;
  height: 180px;
  margin-left: 10px;
  margin-bottom: 10px;
  background-color: rgb(234, 234, 234);
  @apply p-2 rounded;
}
.notification-btns{
  @apply flex mt-4 text-center;
}
.notification-accept{
  width: 100px;
  cursor: pointer;
  margin-left: 30px;
  background: rgb(35, 193, 35);
  @apply rounded text-white p-1;
}
.notification-deny{
  width: 100px;
  cursor: pointer;
  margin-left: 20px;
  background: red;

  @apply rounded text-white p-1;
}
</style>