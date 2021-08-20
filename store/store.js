export const state = () => ({
  snack: {
      text: '',
  },
  audio: {
    path: 'http://localhost:8000/podkasts/1/audio.mp3',
    title: 'Серия 1',
    play: false
  },
  showCookie: true
});

export const mutations = {
  setSnack(state, newSnack) {
    state.snack = newSnack;
  },
  setAudioPath(state, newAudio){
    state.audio = newAudio;
  },
  setShowCookie(state, newShowCookie){
    state.showCookie = newShowCookie;
  }
};

export const getters = {
    getSnack: state => state.snack,
    getAudioPath: state => state.audio,
    getShowCookie: state => state.showCookie
}