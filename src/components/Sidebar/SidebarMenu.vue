<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <div class="text-base mt-3 mb-4">
      <span v-if="collapsed">
        <div>PMS</div>
      </span>
      <span v-else>PROJECT MANAGEMENT SYSTEM</span>
    </div>

    <hr>
    <SidebarLink to="/dashboard" icon="fas fa-home" class="text-xl m-1">DASHBOARD</SidebarLink><hr>
    <SidebarLink to="/projects" icon="fas fa-poll-h" class="text-xl m-2">PROJECTS</SidebarLink><hr>
    <SidebarLink to="/board" icon="fas fa-clipboard" class="text-xl m-2">BOARDS</SidebarLink><hr>
    <SidebarLink to="/dashboard" icon="fas fa-calendar-week" class="text-xl m-2">AGENDA</SidebarLink><hr>
    <SidebarLink to="/dashboard" icon="fas fa-bell" class="text-xl m-2">NOTIFICATIONS</SidebarLink><hr>
    <SidebarLink to="/dashboard" icon="fas fa-tasks" class="text-xl m-2">TASKS</SidebarLink><hr>
    <SidebarLink to="/dashboard" icon="fas fa-user" class="text-xl m-2">PROFILE</SidebarLink>

    <span class="collapse-icon" :class="{ 'rotate-180': collapsed}" @click="toggleSidebar">
      <i class="fas fa-angle-double-left"></i>
    </span>
  </div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import SidebarLink from './SidebarLink.vue'

export default {
  components: { SidebarLink },
  setup() {
    return {
      collapsed, toggleSidebar, sidebarWidth,
    }
  }
}
</script>

<style>
:root {
  --sidebar-bg-color: #034d5e;
  --sidebar-item-hover: #16858d;
  --sidebar-item-active: #177c81;
}
</style>

<style scoped>
.sidebar{
  color: white;
  background-color: var(--sidebar-bg-color);

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
.collapse-icon{
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
</style>