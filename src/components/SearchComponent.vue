<template>
  <div class="search-contianer">
    <input class="search-input" v-model="wordName" :disabled="searchInputDisabled"/>
    <button class="search-btn" :disabled="searchBtnDisabled" @click="searchWord">Ara</button>
    <div class="result-container" v-if="resultShow">
      <img :src="wordResult.resimYol">
      <p class="title"> {{resultWordName}} </p>
      <p class="text">  {{resultWordText}} </p>
    </div>
    <button class="clear-btn" @click="clearResult" v-if="resultShow">Temizle</button>
  </div>


</template>

<script>
import { db, query, where, collection, getDocs } from '../firebase/config';
export default {
  name: 'SearchComponent',
  data() {
    return {
      wordResult: null,
      resultShow: false,
      resultWordName: null,
      resultWordText: null,
      resultImage: null,
      wordName: null,
      searchInputDisabled: false,
    };
  },
  methods: {
      searchWord: async function(){
          console.log(this.wordName);
          const usersRef = collection(db, 'kelime-ezber');
          const q = query(usersRef, where('kelime', '==', this.wordName));
          try {
            const querySnapshot = await getDocs(q);
            console.log(q);
            console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
              this.wordResult = { id: doc.id, ...doc.data() };
              this.resultWordName = this.wordResult.kelime;
              this.resultWordText = 
              `${this.wordResult.isim} ${this.wordResult.fiil} ${this.wordResult.sifat} ${this.wordResult.zarf}`;
            });
            if(this.wordResult !== null ){
              this.resultShow = true;
            }
            console.log(this.wordResult);
          } catch (error) {
            console.error("Error searching users: ", error);
            return [];
          }
      },
      clearResult: function(){
        this.wordResult = null;
        this.resultShow = false;
        this.wordName = null;
      }
  },
  computed: {
    searchBtnDisabled: function(){
      if(this.wordName !== null ){
        return false;
      }else{
        return true;
      }
    }
  }
}
</script>

<style scoped>
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
  right: 20px;
  width: 250px;
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

