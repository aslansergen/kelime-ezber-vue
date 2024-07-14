<template>
  <div class="userMenu">
    <span>
      
    </span>
    {{status }}
  </div>
</template>

<script>
export default {
  name: 'UserLinkComponent',
  data() {
    return {
      status: 'Hello Vue.js!',
    };
  },
}
</script>

<style scoped>
.userMenu {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid red;
}
</style>
