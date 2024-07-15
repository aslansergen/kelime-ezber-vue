<template>
    <div>
      <p>kaşsdlkfajsdf</p>
     
      <UserLinkComponent />
      <SearchComponent />
    </div>
  </template>
  
  <script>
import UserLinkComponent from '../components/UserLinkComponent.vue'
import SearchComponent from '../components/SearchComponent.vue'
 

  export default {
    name: 'Deneme', // kelime-ezber,
    data(){
      return{
        username: ''
      }
    },
    components: {
      UserLinkComponent,
      SearchComponent
    }
  }
  </script>
  