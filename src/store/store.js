import { createStore } from 'vuex';
import { db, getDocs, collection, updateDoc, doc} from '../firebase/config';
const store = createStore({
  state: {
    counter: 0,
    value: null,
    totalWordData :[],
  },
  getters: {
    counter(state) {
      return state.counter;
    },
    totalWordData(state) {
      return state.totalWordData;
    },
  },
  mutations: {
    increment(state) {
      state.counter++;
    },
    setTotalWordData (state, payload) {
      state.totalWordData = payload;
    },

  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
    
    getWordData: async function({commit}){
      console.log('--------1------------');
      try {
        const querySnapshot = await getDocs(collection(db, 'kelime-ezber-local'));
        console.log(querySnapshot);
       let data = querySnapshot.docs.map(item => {
         return {
             ...item.data(), id: item.id
         }
       });
       console.log('----------');
       console.log(data);
       commit('setTotalWordData', data);

        
        /* console.log( JSON.stringify(this.totalData)) */
      } catch (error) {
        console.error('Veri alınırken hata oluştu:', error);
      }
    }
  }
});

export default store;
