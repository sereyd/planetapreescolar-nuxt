import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      test:'prueba store con state'

    }),
    mutations: {
      increment(state) {
        state.counter++
      }
    }
  })
}

export default createStore
