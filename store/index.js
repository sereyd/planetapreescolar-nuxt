import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      test:'prueba store con state 1'

    }),
    mutations: {
      increment(state) {
        state.counter++
      }
    }
  })
}

export default createStore
