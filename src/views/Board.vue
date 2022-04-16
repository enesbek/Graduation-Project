<template>
  <div>
    <BoardHeader />
    <BoardContent />
  </div>
</template>

<script>
import BoardHeader from '@/components/Board/BoardHeader.vue'
import BoardContent from '@/components/Board/BoardContent.vue'
import store from '../store'
export default {
  name: 'Board',
  components: {
    BoardHeader,
    BoardContent,
  },
  setup() {
    store.commit('changeSidebarState');
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
