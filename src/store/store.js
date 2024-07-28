import { createStore } from 'vuex';
import { db, getDocs, collection, updateDoc, doc} from '../firebase/config';
const store = createStore({
  state: {
    collectionName: 'kelime-ezber-local',
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
    smileCategoryTotalNumber: function(state){
      return state.ezberlenenKelime.length;
    },
    totalWordNumber: function(state){
      return state.totalWordData.length;
    },
    thinkCategoryTotalNumber: function(state){
      return state.ezberlenecekKelime.length;
    },
    angryCategoryTotalNumber: function(state){
      return state.bekleyenKelime.length;
    },
    showWord: function(state){
      return state.showingCategory[state.activeWordNumber];
   },
   wordMeaningData: function(state){
    const dataWord = [];
    for(let word in state.showingCategory[state.activeWordNumber]){
        if(word == 'isim' || word == 'sifat'||word == 'zarf'||word == 'fiil'){
            if(state.showingCategory[state.activeWordNumber][word] !== ""){
                dataWord.push({
                    kategori : word,
                    anlami : state.showingCategory[state.activeWordNumber][word]
                })
            }
        }
    }
    return dataWord;
},
  },
  mutations: {
    searchResultSet: function(state, payload){
      if(payload.btnSmile){
        state.showingCategory = state.ezberlenenKelime;
        state.activeMenuCategory =  state.btnSmileMenuName;
      }
      if(payload.btnThink){
        state.showingCategory = state.ezberlenecekKelime;
        state.activeMenuCategory =  state.btnThinkMenuName;
      }
      if(payload.btnAngry){
        state.showingCategory = state.bekleyenKelime;
        state.activeMenuCategory =  state.btnAngryMenuName;
      }
      let index = state.showingCategory.findIndex(item => item.id === payload.id);
      state.activeWordNumber = index;
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
      let showWord = state.showingCategory[state.activeWordNumber];
      if(!showWord.btnSmile){
        state.activeWordNumber = 0;
        state.showingCategory = state.ezberlenenKelime;
        state.activeMenuCategory =  state.btnSmileMenuName;
      }
    },
    thinkCategoryActive: function(state){
      let showWord = state.showingCategory[state.activeWordNumber];
      if(!showWord.btnThink){
        state.activeWordNumber = 0;
        state.showingCategory = state.ezberlenecekKelime;
        state.activeMenuCategory =  state.btnThinkMenuName;
      }
    },
    angryCategoryActive: function(state){
      let showWord = state.showingCategory[state.activeWordNumber];
      if(!showWord.btnAngry){
        state.activeWordNumber = 0;
        state.showingCategory = state.bekleyenKelime;
        state.activeMenuCategory =  state.btnAngryMenuName;
      }
    },
    prevWord : function(state){
      if(state.activeWordNumber  > 0  ){
        state.activeWordNumber--
      }else{
        state.activeWordNumber = state.showingCategory.length-1;
      }
    },
    nextWord: function(state){
      if(state.activeWordNumber < state.showingCategory.length-1){
          state.activeWordNumber++
      }else{
          state.activeWordNumber = 0
      }
    },
    subtractFromOldSeries: function(){

    },
    /* kategoriyi değiştir */
    changeWordCategory: function(state, payload){
      if(state.showingCategory.length > 1){
        if(state.activeWordNumber === state.showingCategory.length-1){
          state.activeWordNumber--;
          state.showingCategory = state.showingCategory.filter(word =>{
              if(word.id !== state.showingCategory[state.activeWordNumber+1].id){
                  return word;
              }else{
                  payload.push(word);
                  switch (state.activeMenuCategory) {
                    case state.btnSmileMenuName:
                      state.ezberlenenKelime = state.ezberlenenKelime.filter(item => item.id !== word.id);
                      break;
                    case state.btnThinkMenuName:
                      state.ezberlenecekKelime = state.ezberlenecekKelime.filter(item => item.id !== word.id);
                      break;
                    case state.btnAngryMenuName:
                      state.bekleyenKelime = state.bekleyenKelime.filter(item => item.id !== word.id);
                      break;
                  }
              }
          });

        }else{
          state.showingCategory = state.showingCategory.filter(word =>{
              if(word.id !== state.showingCategory[state.activeWordNumber].id){
                  return word;
              }else{
                  payload.push(word);
                  switch (state.activeMenuCategory) {
                    case state.btnSmileMenuName:
                      state.ezberlenenKelime = state.ezberlenenKelime.filter(item => item.id !== word.id);
                      break;
                    case state.btnThinkMenuName:
                      state.ezberlenecekKelime = state.ezberlenecekKelime.filter(item => item.id !== word.id);
                      break;
                    case state.btnAngryMenuName:
                      state.bekleyenKelime = state.bekleyenKelime.filter(item => item.id !== word.id);
                      break;
                  }
              }
          });
        }
      }
    },
  },
  actions: {
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
    },
    setSmileCategory: async function({commit, getters, state}){
      console.log(getters.showWord.btnSmile);
       if(!getters.showWord.btnSmile){
          commit('changeWordCategory', state.ezberlenenKelime);
          let  updatedData = {
             ...getters.showWord,
             btnAngry: false,
             btnThink: false,
             btnSmile: true
          }
          const docRef = doc(db,state.collectionName,getters.showWord.id)
          await  updateDoc(docRef,updatedData); 
      } 
    },
    setThinkCategory: async function({commit, getters, state}){
      if(!getters.showWord.btnThink){
          commit('changeWordCategory', state.ezberlenecekKelime);
          let  updatedData = {
              ...getters.showWord,
              btnAngry: false,
              btnThink: true,
              btnSmile: false
          }
          const docRef = doc(db, state.collectionName ,getters.showWord.id);
          await  updateDoc(docRef,updatedData);
      }
    },
    setAngryCategory: async function({commit, getters, state}){
      if(!getters.showWord.btnAngry){
          commit('changeWordCategory', state.bekleyenKelime);
          let  updatedData = {
               ...getters.showWord,
              btnAngry: true,
              btnThink: false,
              btnSmile: false
          }
          const docRef = doc(db, state.collectionName ,getters.showWord.id);
          await  updateDoc(docRef,updatedData);
      }
    }, 
  }
});

export default store;
