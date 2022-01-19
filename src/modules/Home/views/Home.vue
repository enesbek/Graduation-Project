<template>
  <div class="home flex flex-col h-screen justify-between">
    <home-header />
    <home-content />
    <home-footer />
  </div>
</template>

<script>
import HomeContent from '../components/HomeContent.vue'
import HomeFooter from '../components/HomeFooter.vue'
import HomeHeader from '../components/HomeHeader.vue'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeContent,
    HomeFooter 
  }
}
</script>
