<template>
    <div>
      <p>bbbbb</p>
      <UserLinkComponent />
      <SearchComponent />
    </div>
  </template>
  
  <script>
import UserLinkComponent from '../components/UserLinkComponent.vue'
import SearchComponent from '../components/SearchComponent.vue'
 

  export default {
    name: 'Deneme',
    components: {
      UserLinkComponent,
      SearchComponent
    }
  }
  </script>
  