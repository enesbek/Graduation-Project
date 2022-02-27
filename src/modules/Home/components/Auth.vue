<template>
  <div class="content text-center">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: "Auth",
}
</script>

<style scpoed>
  .content{
    width: 100%;
    height: 100vh;
    display: flex;
  }
</style>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input {
  margin-bottom: 10px;
  
}
</style>