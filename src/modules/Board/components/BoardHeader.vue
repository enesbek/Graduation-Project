<template>
    <div class="board-header text-white flex">
        <div class="text-lg ml-10 mt-3">Project Tracking System</div>
        <b-card>
        <b-avatar src="https://placekitten.com/300/300"></b-avatar>
        </b-card>
        <div class="text-base ml-10 mt-3 place-content-center"><router-link to="/dashboard" tag="button" class="router text-white"><i class="fas fa-home"></i>&ensp;Dashboard</router-link></div>
        <div class="text-base ml-10 mt-3"><router-link to="/dashboard" tag="button" class="router text-white"><i class="fas fa-poll-h"></i>&ensp;Projects</router-link></div>
        <div class="user text-lg mt-3 mr-8"><button>Profile&ensp;<i class="far fa-user"></i></button></div>
    </div>
</template>

<script>
export default{
    data() {
        return {
            newSection: "",
        }
    },
    methods: {
        submitSection() {
            console.log(this.newSection)
        }
    }
}
</script>

<style>
.board-header{
    height: 6%;
    background: linear-gradient(to right, rgb(3, 109, 133) , rgb(1, 45, 54));
}
.section-submit{
    text-align: right;
}
.user{
    position: absolute;
    right: 0px;
}
.router{
    text-decoration: none;
}
</style>