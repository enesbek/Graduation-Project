<template>
  <div class="home-header text-white">
    <div class="navbar mt-2 text-lg">
      <button class="home-login text-white mr-10 mt-4" data-bs-toggle="modal" data-bs-target="#exampleModal1"><i class="fa fa-user"></i>&ensp;Login&ensp;</button>
      <div class="home-signup mr-10 mt-4">
        <i class="fa fa-user-plus"></i> Sign-up</div>
        <!-- <button data-bs-toggle="modal" data-bs-target="#exampleModal" v-on:click="submitSectionName(sections)">Add New Task</button>-->
      <!-- Add Task Modal Start -->
        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add New Task</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <label for="exampleInputEmail1" class="form-label">New Task</label>
                <input type="text" class="form-control">
                <label for="exampleInputEmail1" class="form-label">Date</label>
                <input type="text" class="form-control" >
                <label for="exampleInputEmail1" class="form-label">Tag</label>
                <input type="text" class="form-control">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <router-link to="/dashboard" tag="button" class="home-login text-white mr-10 mt-4">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Add Task</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- Add Task Modal Finish -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home-header{
  height: 7%;
  background: linear-gradient(to right, rgb(3, 109, 133) , rgb(1, 45, 54));
  
}
.home-login{
  text-decoration: none;
  position: absolute;
  right: 6rem;
}
.home-signup{
  text-decoration: none;
  position: absolute;
  right: 0px;
}
</style>
