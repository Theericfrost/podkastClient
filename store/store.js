export const state = () => ({
  snack: {
      text: '',
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