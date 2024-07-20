<template>
    <UserLinkComponent />
    <table v-if="totalData.length > 0">
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
import {dataCheck} from '../utili/utility'
import { mapGetters, mapActions } from 'vuex';


  export default {
    name: 'PageOfAllWords',
    computed: {
      ...mapGetters({
        totalData : 'totalWordData',
     }),
     ...mapActions({
      getWordData : "getWordData"
      })
     
    },
    components: {
      UserLinkComponent,
    },
    created: function(){
      if(dataCheck(this.totalData)){
      }else{
        this.getWordData;
      }
    }
  }
  </script>
  