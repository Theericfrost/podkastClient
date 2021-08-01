export const state = () => ({
  snack: {
      text: '',
      show: false
  }
});

export const mutations = {
  setSnack(state, newSnack) {
    state.snack = newSnack;
  }
};

export const getters = {
    getSnack: state => state.snack
}