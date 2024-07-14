<template>
  <div class="menu-container">
    <span @click="acBunu" class="btn">
      d
    </span>
    <div :class="{active : active}" class="link-content">

    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLinkComponent',
  data() {
    return {
      active: false,
      status: 'Hello Vue.js!',
    };
  },
  methods: {
    acBunu: function(){
      this.active = !this.active
    }
  }
}
</script>

<style scoped>
.menu-container {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid red;
}
.link-content{
  position: absolute;
  left: 0;
  top: 80px;
  width: 150px;
  height: 150px;
  border: 1px solid black;
  visibility: hidden;
  background-color: white;
  transition: .3s ease;
  z-index: -5;
}
.link-content.active{
  visibility: visible;
  top: 50px;
  z-index: 1;
}
.btn{
  width: 20px;
  height: 20px; 
  display: flex;
  border: 1px solid blue;
  cursor: pointer;
}
</style>
