<template>
  <div class="h-screen">
    <board-header />
    <board-content />
  </div>
</template>

<script>
import BoardHeader from '../components/BoardHeader.vue'
import BoardContent from '../components/BoardContent.vue'

export default {
  name: 'Board',
  components: {
    BoardHeader,
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
