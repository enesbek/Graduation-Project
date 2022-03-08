<template>
  <div class="home flex flex-col h-screen justify-between">
    <home-header />
    <home-content />
    <home-footer />
  </div>
</template>

<script>
import HomeContent from '../components/Home/HomeContent.vue'
import HomeFooter from '../components/Home/HomeFooter.vue'
import HomeHeader from '../components/Home/HomeHeader.vue'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeContent,
    HomeFooter 
  },
  setup() {
    return{
      
    }
  }
}
</script>
