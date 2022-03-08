<template>
  <div class="h-screen">
    <board-content />
  </div>
</template>

<script>
import BoardContent from '../components/Board/BoardContent.vue'

export default {
  name: 'Board',
  components: {
    BoardContent,
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
