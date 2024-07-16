<template>
    <div>
      <p> {{ totalData.length }} </p>
      <UserLinkComponent />
      <SearchComponent />
    </div>
  </template>
  
  <script>
import UserLinkComponent from '../components/UserLinkComponent.vue'
import SearchComponent from '../components/SearchComponent.vue'
import { mapGetters } from 'vuex';


  export default {
    name: 'Deneme',
    computed: {
      ...mapGetters({
        totalData : 'totalWordData',
     }),
    },
    components: {
      UserLinkComponent,
      SearchComponent
    }
  }
  </script>
  