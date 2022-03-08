<template>
  <v-app>
    <v-main>
      <span v-if="isOpenSidebar">
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
import Sidebar from '../src/modules/Dashboard/components/Sidebar/SidebarMenu.vue'
import { sidebarWidth } from '../src/modules/Dashboard/components/Sidebar/state'
import store from './store'
export default {
  name: 'App',
  data: () => ({
  }),
  components: {
    Sidebar,
  },
  setup() {
    return {
      sidebarWidth,
    }
  },
  computed: {
    isOpenSidebar() {
      return store.getters.isDashboardOpen
    }
  }
}
</script>
