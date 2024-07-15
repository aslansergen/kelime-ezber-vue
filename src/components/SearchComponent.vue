<template>
  <div class="search-contianer">
    <input class="search-input" v-model="username" :disabled="searchInputDisabled"/>
    <button class="search-btn" :disabled="searchBtnDisabled" @click="searchWord">Ara</button>
    <div class="result-container">
      <img src="https://firebasestorage.googleapis.com/v0/b/kelime-ezber-e0e0e.appspot.com/o/kelime-ezber%2Fvisionary.jpg?alt=media&token=b773720c-8547-4528-9023-a968f3fdc372">
      <p class="title">Nokds</p>
      <p class="text">ladsf jdf</p>
    </div>
  </div>


</template>

<script>
import { db, query, where, collection, getDocs } from '../firebase/config';
export default {
  name: 'SearchComponent',
  data() {
    return {
      username:'',
      searchInputDisabled: false,
    };
  },
  methods: {
      searchWord: async function(){
          console.log(this.username);
          const usersRef = collection(db, 'kelime-ezber');
          const q = query(usersRef, where('kelime', '==', this.username));
          
          try {
            const querySnapshot = await getDocs(q);
            const users = [];
            console.log(q);
            console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
              users.push({ id: doc.id, ...doc.data() });
            });
            console.log(users);
          } catch (error) {
            console.error("Error searching users: ", error);
            return [];
          }
      }
  },
  computed: {
    searchBtnDisabled: function(){
      if(this.username.length > 1){
        return false;
      }else{
        return true;
      }
    }
  }
}
</script>

<style scoped>
.result-container{
  width: 240px;
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
}
.result-container .title{
  margin-top: 4px;
  margin-bottom: 3px;
  font-size: 15px;
}
.result-container .text{
  font-size: 15px;
}
.search-contianer{
  position: absolute;
  right: 20px;
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

