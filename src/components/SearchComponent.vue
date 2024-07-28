<template>
  <div class="search-contianer">
    <input class="search-input" v-model="wordName" :disabled="searchInputDisabled"/>
    <button class="search-btn" :disabled="searchBtnDisabled" @click="searchWord">Ara</button>
    <div class="result-container" v-if="resultShow" @click="selectResult">
      <img :src="wordResult.resimYol">
      <p class="title"> {{resultWordName}} </p>
      <p class="text">  {{resultWordText}} </p>
    </div>
    <p class="wordNo" v-if="wordNoShow">Kelime Bulunamadı</p>
    <button class="clear-btn" @click="clearResult" v-if="resultShow">Temizle</button>
  </div>
</template>

<script>
import { db, query, where, collection, getDocs } from '../firebase/config';
import { mapMutations } from "vuex";
export default {
  name: 'SearchComponent',
  data() {
    return {
      wordResult: null,
      resultWordName: null,
      resultWordText: null,
      resultImage: null,
      wordName: null,
      searchInputDisabled: false,
      noWord: false,
    };
  },
  methods: {
      ...mapMutations({
        searchResultSet: 'searchResultSet'
      }),
      selectResult: function(){
        this.searchResultSet(this.wordResult);
        this.clearResult();
      },
      searchWord: async function(){
          const usersRef = collection(db, 'kelime-ezber-local');
          const q = query(usersRef, where('kelime', '==', this.wordName));
          try {
            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty){
              this.noWord = true;
            }else{
              this.resultShow = true;
            }
            querySnapshot.forEach((doc) => {
              this.wordResult = { id: doc.id, ...doc.data() };
              this.resultWordName = this.wordResult.kelime;
              this.resultWordText = 
              `${this.wordResult.isim} ${this.wordResult.fiil} ${this.wordResult.sifat} ${this.wordResult.zarf}`;
            });
          } catch (error) {
            console.error("Error searching users: ", error);
          }
      },
      clearResult: function(){
        this.wordResult = null;
        this.resultShow = false;
        this.wordName = null;
      },
      dataValid: function(value){
        if(value  == null || value == undefined ){
          return false;
        }else{
          if (typeof value === 'string' && value.trim() === '') {
            return false;
          }
          return true;
        }
      }
  },
  computed: {
    searchBtnDisabled: function(){
      if(this.wordName !== null ){
        return false;
      }else{
        return true;
      }
    },
    wordNoShow: function(){
      if(this.noWord && this.dataValid(this.wordName) && !this.dataValid(this.wordResult)){
        return true;
      }else{
        this.noWord = false;
        return false;
      }
    },
    resultShow: function(){
      if( this.dataValid(this.wordResult) && this.dataValid(this.wordName)){
        return true;
      }else{
        this.wordResult = null;
        return false;
      }
    }
  }
}
</script>

<style scoped>
.wordNo{
  margin-top: 10px;
  font-size: 12px;
}
.clear-btn{
  background-color: white;
  color: black;
  border: none;
  outline: none;
  border-radius: 5px;
  margin-top: 10px;
  padding: 8px;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 12px;
}
.result-container{
  width: 250px;
  height: 75px;
  margin-top: 10px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  align-items: flex-start;
  padding-left: 7px;
  cursor: pointer;
}
.result-container img{
  margin-top: 5px;
  margin-right: 10px;
  width: 100px;
  height: 60px;
}
.result-container .title{
  margin-top: 4px;
  margin-bottom: 3px;
  font-size: 15px;
}
.result-container .text{
  font-size: 12px;
}
.search-contianer{
  position: absolute;
  right: 10px;
  top: 41px;
  width: 250px;
  z-index: 2;
}
.search-input{
 padding: 7px 3px;
 border-radius: 4px;
 border: none;
 outline: none;
 padding-left: 10px;
}
.search-btn{
  cursor: pointer;
  border: none;
  background-color: #ff73d5;
  border:2px solid #ff73d5;
  border-radius: 4px;
  padding: 5px 10px;
  color: white;
  margin-left: 5px;
  transition: .3s ease;
}
.search-btn:disabled{
  background-color: #f18dd3;
  border:2px solid #f18dd3;
}
.search-btn:disabled:hover{
  background-color: #f18dd3;
}
.search-btn:hover{
  background-color: transparent;
}
</style>

