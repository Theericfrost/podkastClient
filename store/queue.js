export default {
  state: {
    data: []
  },
  mutations: {
    addToQueue(state, newAudio) {
        state.data = [...state.data, newAudio];
    },
    removeFromQueue(state, audioToRemove) {
        state.data = state.data.filter(el => el.title !== audioToRemove.title)
    },
    setQueue(state, newState){
        state.data = newState;
    },
    removeAllFromQueue(state){
        state.data = []
    }
  },
  getters: {
    getQueue: state => state.data
  }
};