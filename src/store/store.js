import { createStore } from 'vuex';

const store = createStore({
  state: {
    counter: 0,
    value: null,
    totalWordData :[]
  },
  mutations: {
    increment(state) {
      state.counter++;
    },
    setTotalWordData (state, payload) {
      state.totalWordData.push(payload) ;
   }
  },
  actions: {
    increment(context) {
      context.commit('increment');
    }
  },
  getters: {
    counter(state) {
      return state.counter;
    },
    totalWordData(state) {
      return state.totalWordData;
    },
  }
});

export default store;
