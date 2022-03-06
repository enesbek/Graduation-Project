<template>
  <div class="main">
    <menuSide class="menuSide"/>
    <page class="page"/>
  </div>
</template>

<script>
import MenuSide from '../components/MenuSide.vue'
import Page from '../components/Page.vue'

export default {
  name: 'DashBoard',
  components: {
    MenuSide,
    Page,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scpoed>
.main{
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  background: url("https://images.wallpaperscraft.com/image/single/stars_sky_space_car_113629_1920x1080.jpg");
  background-repeat: none;
  background-size: cover;
}

.menuSide{
  background-color: #187f86;
  margin: 0;
  width: 20rem;
}

.page{
  margin: 0;
  width: 100%;
  
}
</style>