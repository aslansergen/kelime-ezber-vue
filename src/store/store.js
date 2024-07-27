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
    },
    activeMenuCategory: function(state){
      return state.activeMenuCategory;
    },
    btnAllMenuName: function(state){
      return state.btnAllMenuName;
    },
    btnSmileMenuName: function(state){
      return state.btnSmileMenuName;
    },
    btnThinkMenuName: function(state){
      return state.btnThinkMenuName;
    },
    btnAngryMenuName: function(state){
      return state.btnAngryMenuName;
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
    setShowWordStatus: function(state){
      state.showWordStatus = true;
    },
    /* alttaki 4lü butonlar */
    allCategoryActive: function(state){
      if(state.activeMenuCategory !== state.btnAllMenuName){
        state.activeWordNumber = 0;
        state.showingCategory = state.totalWordData;
        state.activeMenuCategory =  state.btnAllMenuName;
      }
    },
    smileCategoryActive: function(state){
      if(!state.showWord.btnSmile){
        state.activeWordNumber = 0;
        state.showingCategory = state.ezberlenenKelime;
        state.activeMenuCategory =  state.btnSmileMenuName;
      }
    },
    thinkCategoryActive: function(state){
      if(!state.showWord.btnThink){
        state.activeWordNumber = 0;
        state.showingCategory = state.ezberlenecekKelime;
        state.activeMenuCategory =  state.btnThinkMenuName;
      }
    },
    angryCategoryActive: function(state){
      if(!state.showWord.btnAngry){
        state.activeWordNumber = 0;
        state.showingCategory = state.bekleyenKelime;
        state.activeMenuCategory =  state.btnAngryMenuName;
      }
    },

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
