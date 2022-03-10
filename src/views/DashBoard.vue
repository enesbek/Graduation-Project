<template>
  <Content class="content border-8 border-black"/>
</template>

<script>
import Content from '../components/Dashboard/Content.vue'
export default {
  components:{
    Content,
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.content{
  height: 100vh;
  width: 10rem;
}
</style>