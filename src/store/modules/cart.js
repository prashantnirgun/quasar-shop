// export default function () {
//   return {
//     //
//   }
// }

import DataService from 'src/services/DataService';

export default {
  namespaced: true,
  state: {
    cart: []
  },

  getters: {
    cartCount: state => {
      return state.cart.length;
    },
    allItems: state => {
      return state.cart;
    }
  },

  mutations: {
    ADD_TO_CART(state, payload) {
      let productInCart = state.cart.find(
        item => item.product_id === payload.product_id
      );

      if (productInCart) {
        productInCart.quantity = payload.quantity;
        productInCart.amount = productInCart.rate * payload.quantity;
      } else {
        state.cart.push({ ...payload });
      }
    },

    REMOVE_FROM_CART(state, payload) {
      let index;
      // let productInCart = state.cart.find(item => {
      //   index++;
      //   return item.product_id === payload.product_id;
      // });

      index = state.cart.findIndex(
        item => item.product_id === payload.product_id
      );
      if (payload.quantity > 0) {
        state.cart[index].quantity = payload.quantity;
        state.cart[index].amount = payload.rate * payload.quantity;
      } else {
        state.cart.splice(index, 1);
      }
      // productInCart.quantity = payload.quantity;
      // if (productInCart.quantity === 0) {
      //   delete state.cart[productInCart];
      //   console.log('going to delte');
      // }
      console.log('found and removing', payload, index);
    },

    CLEAR_CART_ITEMS(state) {
      state.cart = [];
    },

    SET_CART(state, cartItems) {
      state.cart = cartItems;
    }
  },

  actions: {
    addProductToCart({ commit }, payload) {
      commit('ADD_TO_CART', payload);
    },
    removeFromCart({ commit }, payload) {
      commit('REMOVE_FROM_CART', payload);
    }

    // fetchProduct({ context, commit }, payload) {
    //   DataService.get('index/product')
    //     .then(response => {
    //       commit('SET_PRODUCT', response.data.rows);
    //     })
    //     .catch(error => {
    //       console.log('mixin/ddlb Error', error);
    //     });
    // }
  }
};
