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
    },
    companyId: state => {
      return state.user.company_id;
    },
    token: state => {
      return state.token;
    },
    general_ledger_id: state => {
      return state.user ? state.user.general_ledger_id : 0;
    },
    quotationPartyId: state => (state.user ? state.user.quotation_party_id : 0)
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        this.state.isUserLoggedIn = true;
      } else {
        this.state.isUserLoggedIn = false;
      }
    },

    SET_USER(state, user) {
      state.user = user;
    },

    SET_IMAGE(state, image) {
      state.user.image_filename = image;
    }
  },

  actions: {
    setToken({ rootState, commit }, token) {
      commit('SET_TOKEN', token);
    },

    setUser({ commit }, user) {
      commit('SET_USER', user);
    },

    setImage({ commit }, image) {
      commit('SET_IMAGE', image);
    }
  }
};
