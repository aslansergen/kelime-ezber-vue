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
      try {
        const querySnapshot = await getDocs(collection(db, 'kelime-ezber-local'));
        let data = querySnapshot.docs.map(item => {
         return {
             ...item.data(), id: item.id
         }
       });
       commit('setTotalWordData', data);
      } catch (error) {
        console.error('Veri alınırken hata oluştu:', error);
      }
    }
  }
});

export default store;
