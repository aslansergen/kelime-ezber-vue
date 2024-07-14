<template>
  <div class="menu-container">
    <span @click="acBunu" class="btn">
      d
    </span>
    <div :class="{active : active}" class="link-content">
      <router-link class="link" to="/">Ana Sayfa</router-link>
      <router-link class="link" to="/oyunlar">Oyunlar</router-link>
      <router-link class="link" to="/deneme">Deneme</router-link>
      <router-link class="link" to="/yeni-kelime">Kelime Ekle</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLinkComponent',
  data() {
    return {
      active: true,
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
  left: 30px;
  width: 50px;
  height: 50px;
  border: 1px solid red;
}

.btn{
  width: 20px;
  height: 20px; 
  display: flex;
  border: 1px solid blue;
  cursor: pointer;
}
.link-content{
  position: absolute;
  left: 0;
  top: 80px;
  width: 150px;
  height: 150px;
  visibility: hidden;
  background-color: white;
  transition: .3s ease;
  z-index: -5;
  border-radius: 10px;
  padding-top: 10px;
  opacity: 0;
}
.link-content.active{
  visibility: visible;
  top: 50px;
  z-index: 1;
  opacity: 1;
}
.link{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 20px;
  margin-bottom: 5px;
  color: black;
}
.link:hover{
  text-decoration: underline;
}
</style>
