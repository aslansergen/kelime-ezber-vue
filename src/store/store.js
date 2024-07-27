import { createStore } from 'vuex';
import { db, getDocs, collection, updateDoc, doc} from '../firebase/config';
const store = createStore({
  state: {
    counter: 0,
    value: null,
    totalWordData :[],
    bekleyenKelime:[],
    ezberlenecekKelime: [],
    ezberlenenKelime: [],
    showingCategory: [],
    activeWordNumber: 0,
    showWordStatus: false,
    activeMenuCategory: "btnThink",
    btnAllMenuName : "btnAll",
    btnSmileMenuName : "btnSmile",
    btnThinkMenuName : "btnThink",
    btnAngryMenuName : "btnAngry",
  },
  getters: {
    counter(state) {
      return state.counter;
    },
    totalWordData(state) {
      return state.totalWordData;
    },
    showingCategory: function(state){
      return state.showingCategory;
    },
    activeWordNumber: function(state){
      return state.activeWordNumber;
    }
  },
  mutations: {
    increment(state) {
      state.counter++;
    },
    setTotalWordData (state, payload) {
      state.totalWordData = payload;
    },
    setBekleyenKelime(state, payload){
      state.bekleyenKelime.push(payload);
    },
    setEzberlenecekKelime(state, payload){
      state.ezberlenecekKelime.push(payload);
    },
    setEzberlenenKelime(state, payload){
      state.ezberlenenKelime.push(payload);
    },
    showEzberlenecekKelime(state){
      state.showingCategory = state.ezberlenecekKelime;
    },
    setShowWordStatus(state){
      state.showWordStatus = true;
    }
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
    getWordData: async function({commit, state}){
      try {
        const querySnapshot = await getDocs(collection(db, 'kelime-ezber-local'));
        let data = querySnapshot.docs.map(item => {
         return {
             ...item.data(), id: item.id
          }
        });
        commit('setTotalWordData', data);
        data.forEach(wordInfo => {
            if(wordInfo.btnAngry === true ){
              commit('setBekleyenKelime', wordInfo);
            }
            if(wordInfo.btnThink === true ){
              commit('setEzberlenecekKelime', wordInfo);
            }
            if(wordInfo.btnSmile === true ){
              commit('setEzberlenenKelime', wordInfo);
            }
        });
        commit('showEzberlenecekKelime');
        commit('setShowWordStatus');
       
      } catch (error) {
        console.error('Veri alınırken hata oluştu:', error);
      }
    }
  }
});

export default store;
