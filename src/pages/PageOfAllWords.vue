<template>
    <div class="container">
      <UserLinkComponent />
      <h2 class="pageTitle">Bütün Kelimeler</h2>
      <div class="table" v-if="totalData.length > 0">
        <div class="thead">
          <div class="tbodyTdNumber">
            #
          </div>
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
          <div class="tbodyTr" v-for="(word, index ) in showTableData">
            <div class="tbodyTdNumber">
              {{ (this.tableShowNumber * this.activePage) + (index +1)}}
            </div>
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
      <PaginationComponent @newpage="changePage" :data="paginationData"/>
    </div>
  </template>
  <script>
import { setTransitionHooks } from 'vue';
import PaginationComponent from '../components/PaginationComponent.vue'
import UserLinkComponent from '../components/UserLinkComponent.vue'
import {dataCheck} from '../utili/utility'
import { mapGetters, mapActions } from 'vuex';


export default {
    name: 'PageOfAllWords',
    data(){
      return{
        tableShowNumber: 10,
        activePage: 0,
      }
    },
    methods: {
      changePage: function(number){
        this.activePage = number
      },
    },
    computed: {
      showTableData: function(){
        if(this.totalData.length <= this.tableShowNumber){
          return this.totalData;
        }
        return this.totalData.slice( 
          (this.activePage * this.tableShowNumber),
          ((this.activePage + 1)  * this.tableShowNumber))
      },
      tableLength: function(){
        if(dataCheck(this.totalData)){
          return Math.ceil(this.totalData.length / this.tableShowNumber);
        }
        return 0;
      },
      paginationData: function(){
        return{
          page: this.activePage,
          totalPageCount: this.tableLength,
        }
      },
      ...mapGetters({
        totalData : 'totalWordData',
     }),
     ...mapActions({
      getWordData : "getWordData"
      }),
    },
    components: {
      UserLinkComponent,
      PaginationComponent,
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
    margin: 0 15px;
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
    margin-bottom: 20px;
  }
  .thead{
    display: flex;
    flex-direction: row;
  }
  .theadTh{
    padding: 10px 15px;
    width: 80px;
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
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .tbodyTdNumber{
    padding: 10px 15px;
    width: 20px;
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
  .paginationContainer{
    width: 100%;
  }
 @media ( max-width: 600px) {
  .thead{
    display: none;
  }
  .tbodyTr{
    flex-wrap: wrap;
  }
  .tbodyTd{
    width: 38%;
  }
  .tbodyTdNumber{
    display: none;
  }
 }
</style>
  