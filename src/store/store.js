import { createStore } from 'vuex';

export default createStore({
  state: {
    // Durum (state) tanımlamalarınız buraya gelecek
    wordToReplace : null,
  },
  mutations: {
    setWordToReplace : function(state, word){
      console.log(word);
      state.wordToReplace = word;
    }
    // Durumu değiştirmek için mutasyonlarınız buraya gelecek
  },
  actions: {
    // Asenkron işlemleri yönetmek için aksiyonlarınız buraya gelecek
  },
  getters: {
    // Durumu işleyerek yeni değerler elde etmek için getter'larınız buraya gelecek
  }
});
