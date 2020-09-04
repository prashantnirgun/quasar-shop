import DataService from 'src/services/DataService';

export default {
  namespaced: true,
  state: {
    user: null,
    token: null
  },

  getters: {
    user: state => {
      return state.user;
    }
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        //console.log('rootState', state, this.state);
        this.state.isUserLoggedIn = true;
      } else {
        this.state.isUserLoggedIn = false;
      }
    },

    SET_USER(state, user) {
      state.user = user;
    }
  },

  actions: {
    setToken({ rootState, commit }, token) {
      console.log('inside action', rootState);
      commit('SET_TOKEN', token);
    },

    setUser({ commit }, user) {
      commit('SET_USER', user);
    }
  }
};
