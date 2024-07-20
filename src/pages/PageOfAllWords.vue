<template>
    <div class="container">
      <UserLinkComponent />
      <div class="table" v-if="totalData.length > 0">
        <div class="thead">
          <div class="theadTh">
            Kelime
          </div>
          <div class="theadTh">
            Okunus
          </div>
          <div class="theadTh">
            Anlamı
          </div>
          <div class="theadTh">
            Resim Linki
          </div>
        </div>
        <div class="tbody">
          <div class="tbodyTr" v-for="word in totalData">
            <div class="tbodyTd">
              {{word.kelime}} 
            </div>
            <div class="tbodyTd">
              {{word.okunus}} 
            </div>
            <div class="tbodyTd">
              {{word.okunus}} 
            </div>
            <div class="tbodyTd">
              <a :href="word.resimYol" target="_blank"> Aç </a> 
            </div>
          </div>
        </div>
      </div>
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
<style scoped>
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    min-height: 100vh;
  }
  .table{
    border: 1px solid red;
    background-color: white;
    padding: 10px;
    border-radius: 8px;
  }
  .thead{
    border: 1px solid black;
    display: flex;
    flex-direction: row;
  }
  .theadTh{
    padding: 7px;
    width: 100px;
    border: 1px solid red;
    font-weight: bold;
  }
  .tbodyTr{
    display: flex;
    flex-direction: row;
    border: 1px solid black;
  }
  .tbodyTd{
    width: 100px;
    padding: 7px 0;
    border: 1px solid red;
  }
</style>
  