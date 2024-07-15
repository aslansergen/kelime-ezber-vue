<template>
   <input class="search-input" v-model="username" :disabled="searchFormDisabled"/>
    <button class="search-btn" :disabled="searchFormDisabled" @click="searchWord">Ara</button>
</template>

<script>
import { db, query, where, collection, getDocs } from '../firebase/config';
export default {
  name: 'SearchComponent',
  data() {
    return {
      searchFormDisabled: false
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
}
</script>

<style scoped>
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
  background-color: #f3b9e2;
  border:2px solid #f3b9e2;
}
.search-btn:disabled:hover{
  background-color: #f3b9e2;
}
.search-btn:hover{
  background-color: transparent;
}
</style>

