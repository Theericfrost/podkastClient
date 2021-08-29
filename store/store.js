export const state = () => ({
  snack: {
      text: '',
  },
  audio: {
    path: 'http://localhost:8000/podkasts/1/audio.mp3',
    title: 'Серия 1',
    play: false,
  },
  showCookie: true,
  showMenuRight: false,
  showHistory: false
});

export const mutations = {
  setSnack(state, newSnack) {
    state.snack = newSnack;
  },
  setAudioPath(state, newAudio){
    state.audio = newAudio;
  },
  setAudioPlay(state, play){
    state.audio = {...state.audio, play: play}
  },
  setShowCookie(state, newShowCookie){
    state.showCookie = newShowCookie;
  },
  setShowMenuRight(state, newShowMenuRight){
    state.showMenuRight = newShowMenuRight;
  },
  setShowHistory(state, newShowHistory){
    state.showHistory = newShowHistory;
  },
};

export const getters = {
    getSnack: state => state.snack,
    getAudioPath: state => state.audio,
    getAudioPlay: state => state.audio.play,
    getShowCookie: state => state.showCookie,
    getShowMenuRight: state => state.showMenuRight,
    getShowHistory: state => state.showHistory
}