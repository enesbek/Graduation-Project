<template>
  <div class="boards">
    <div class="boards-title">
      <p class="text-2xl font-semibold tracking-wide ml-4 mt-2">
        <fa icon="clipboard"></fa> Boards
        
      </p>
      
    </div>
    <div class="boards-area flex">
      <div class="flex-intial board" v-for="board in boards" :key="board.id">
        <div class="board-inner font-semibold text-xl" :style="{'background': 'url(' + board.image + ')', 'background-size': 'cover'}" >
          <div class="p-2">{{ board.name }}</div>
        </div>
      </div>
      <div class="flex-iitial board p-12 pl-14 create-board">
        <p>Create New Board</p> 
      </div>
    </div>
    <div class="boards-title mt-10">
      <p class="text-2xl font-semibold tracking-wide ml-4 mt-2">
        Popular Board Templates
      </p>
    </div>
    <div class="boards-area flex">
      <div class="flex-intial board" v-for="board in boardTemplates" :key="board.id">
        <div class="board-inner font-semibold text-xl" :style="{'background': 'url(' + board.image + ')', 'background-size': 'cover'}" >
          <div class="p-2">{{ board.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boards: [
        {
          name: "Listing",
          image:
            "https://mixkit.co/wp-content/uploads/2020/01/trello-backgournd-1024x512.jpg",
        },
        {
          name: "Homepage",
          image:
            "https://external-preview.redd.it/S3CqF19hBz9Yp9H-B7mTSBICv406vOYSSdah-B1dHzI.jpg?auto=webp&s=e5f5b18c31b87a04b9d9a59227e65e88ad245181",
        },
        {
          name: "Market Place",
          image:
            "https://embedwistia-a.akamaihd.net/deliveries/d5ae8190f0aa7dfbe0b01f336f29d44094b967b5.webp?image_crop_resized=1280x720",
        },
      ],
      boardTemplates: [
        {
          name: "Project Management",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0vruxVJMLeutc38Nu1abYfmhUJGN7xOkqNA&usqp=CAU",
        },
        {
          name: "Kanban",
          image:
            "https://design-milk.com/images/2020/01/DM-Wallpaper-2001-5120x2880-featureda-scaled.jpg",
        },
        {
          name: "Simple Project Board",
          image:
            "https://3.bp.blogspot.com/-5YZZ2tjqs3c/XWJHz7z9eJI/AAAAAAAALsM/KhrsygWGIcQm5ui3dCUT2xnCfsDssHbbQCLcBGAs/w919/abstract-colorful-bubbles-digital-art-uhdpaper.com-4K-4.289-wp.thumbnail.jpg",
        },
        {
          name: "Remote Team",
          image:
            "https://cfw.paymoapp.com/wp-content/uploads/2019/07/remote-team-management-article-image.png",
        },
      ],
    };
  },
};
</script>

<style scoped>
.boards {
  margin: auto;
  width: 70%;
  margin-top: 5em;
  height: 50vh;
}
.boards-area {
}
.board{
  margin: 1rem;
  width: 270px;
  height: 130px;
}
.board-inner{
  height: 130px;
  background-repeat: none;
  background-size: cover;
  border-radius: 5px;
}
.create-board{
  background-color: rgb(225, 225, 225);
  border-radius: 5px;
}
</style>