import DataService from 'src/services/DataService';

export default {
  namespaced: true,
  state: {
    token: null
  },

  getters: {
    user: state => {
      return state;
    },
    companyId: state => {
      return state.company_id;
    },
    token: state => {
      return state.token;
    },
    general_ledger_id: state => {
      return !!state.general_ledger_id ? state.general_ledger_id : 0;
    },
    quotationPartyId: state =>
      !!state.quotation_party_id ? state.quotation_party_id : 0
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
      //console.log(state.user, user, !!state.user);
      if (!!user) {
        Object.keys(user).map(key => {
          //       console.log('inside set_user', key, user[key]);
          state[key] = user[key];
        });
      } else {
        //console.log('set_user', user);
        state = {};
      }
    },

    SET_IMAGE(state, image) {
      state.image_filename = image;
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
