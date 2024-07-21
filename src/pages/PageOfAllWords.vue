<template>
    <div class="container">
      <UserLinkComponent />
      <h2 class="pageTitle">Bütün Kelimeler</h2>
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
              <p class="wordMeaning" v-if="word.fiil !== null">
                <span> <b>Fiil:</b> {{word.fiil}} </span>
              </p>
              <p class="wordMeaning" v-if="word.sifat !== null">
                <span> <b>Sıfat:</b> {{word.sifat}} </span>
              </p>
              <p class="wordMeaning" v-if="word.zarf !== null">
                <span> <b>Zarf:</b> {{word.zarf}} </span>
              </p>
              <p class="wordMeaning" v-if="word.isim !== null">
                <span> <b>İsim:</b> {{word.isim}} </span>
              </p>
            </div>
            <div class="tbodyTd">
              <a class="imageLink" :href="word.resimYol" target="_blank"> Aç </a> 
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
      if(!dataCheck(this.totalData)){
        this.getWordData;
      }
    }
}
</script>
<style scoped>
  .container{
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding-top: 60px;
  }
  .pageTitle{
    margin-bottom: 20px;
    width: 100%;
    color: white;
    font-family: 'Shadows Into Light', cursive;
  }
  .table{
    background-color: white;
    padding: 10px;
    border-radius: 8px;
  }
  .thead{
    display: flex;
    flex-direction: row;
  }
  .theadTh{
    padding: 10px 15px;
    width: 100px;
    font-weight: bold;
    text-wrap: nowrap;
  }
  .tbodyTr{
    display: flex;
    flex-direction: row;
    border-radius: 5px;
  }
  .tbodyTr:nth-child(odd){
    background-color: #f2f2f2;
  }
  .tbodyTd{
    padding: 10px 15px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .tbodyTd .wordMeaning{
    display: flex;
    justify-content: center;
  }
  .imageLink{
    background-color: green;
    border-radius: 5px;
    padding: 4px 8px;
    color: white;
    transition: .3s ease;
    border: 2px solid green;
  }
  .imageLink:hover{
    background-color: transparent;
    color: green;
  }
 @media ( max-width: 600px) {
  .container{
    border: 2px solid blue;
  }
  .thead{
    display: none;
  }
  .tbodyTr{
    flex-wrap: wrap;
  }
  .tbodyTd{
    width: 38%;
  }
 }
</style>
  