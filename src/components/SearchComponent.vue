<template>
   <input v-model="username"/>
    <button @click="searchWord">lan lun</button>
</template>

<script>
import { db, query, where, collection, getDocs } from '../firebase/config';
export default {
  name: 'SearchComponent',
  data() {
    return {
      username: ''
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

