import { createStore } from 'vuex';

const store = createStore({
  state: {
    counter: 0
  },
  mutations: {
    increment(state) {
      state.counter++;
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
    }
  }
});

export default store;
