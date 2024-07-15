<template>
    <div>
      <p> {{ counter }} </p>
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
        counter : 'counter',
     }),
    },
    components: {
      UserLinkComponent,
      SearchComponent
    }
  }
  </script>
  