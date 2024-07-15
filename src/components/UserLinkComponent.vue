<template>
  <div class="menu-container">
    <span @click="active = !active" class="btn">
      <i :class="active ? 'icon-cancel' : 'icon-menu' "></i>
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
      active: false,
    };
  }
}
</script>

<style scoped>
.menu-container {
  position: absolute;
  top:15px;
  left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.btn{
  display: flex;
  cursor: pointer;
  font-size: 24px;
  color:white;
}
.link-content{
  position: absolute;
  left: 0;
  top: 80px;
  width: 150px;
  min-height: 100px;
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
  top: 40px;
  z-index: 1;
  opacity: 1;
}
.link-content .link:last-child{
 margin-bottom: 10px;
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
