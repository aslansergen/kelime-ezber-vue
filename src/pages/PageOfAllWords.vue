<template>
    <UserLinkComponent />
    <table>
      <thead>
        <tr>
          <th>Kelime</th>
          <th>Okunus</th>
          <th>Resim Linki</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="word in totalData">
          <td> {{word.kelime}} </td>
          <td> {{word.okunus}} </td>
          <td> <a :href="word.resimYol" target="_blank"> Aç </a> </td>
        </tr>
      </tbody>
    </table>
    <div>
      <p> {{ totalData.length }} </p>
    </div>
  </template>
  
  <script>
import UserLinkComponent from '../components/UserLinkComponent.vue'
import { mapGetters } from 'vuex';


  export default {
    name: 'PageOfAllWords',
    computed: {
      ...mapGetters({
        totalData : 'totalWordData',
     }),
     
    },
    created: function(){
      console.log('asdfa')
      console.log(this.totalData);
    },
    components: {
      UserLinkComponent,
    }

  }
  </script>
  