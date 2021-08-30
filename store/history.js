export default {
  state: {
    data: []
  },
  mutations: {
    addToHistory(state, newAudio) {
      state.data = [...state.data, newAudio];
    },
    removeFromHistory(state, audioToRemove) {
      state.data = state.data.filter(el => el.title !== audioToRemove.title);
    },
    setHistory(state, newState) {
      state.data = newState;
    },
    removeAllFromHistory(state) {
      state.data = [];
    }
  },
  getters: {
    getHistory: state => state.data
  }
};
