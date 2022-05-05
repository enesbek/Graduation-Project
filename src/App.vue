<template>
  <v-app>
    <v-main>
      <span v-if="dashboardOpen">
        <Sidebar/>
        <div :style="{ 'margin-left' : sidebarWidth}">
          <router-view />
        </div>
      </span>
      <span v-else>
        <router-view />
      </span>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar/SidebarMenu.vue'
import { sidebarWidth } from './components/Sidebar/state'
import { mapState } from "vuex";
export default {
  name: 'App',
  components: {
    Sidebar,
  },
  setup() {
    return {
      sidebarWidth,
    }
  },
  computed: mapState(["dashboardOpen"]),
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
