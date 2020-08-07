// export default function () {
//   return {
//     //
//   }
// }

import DataService from 'src/services/DataService';
import { Notify } from 'quasar';

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
    },
    findItem: state => product_id => {
      //console.log('inside findItem', product_id);
      return state.cart.find(item => {
        if (item.product_id === product_id) {
          console.log('found item in cart', product_id, item);
          return true;
        } else {
          return false;
        }
      });
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

      Notify.create({
        type: 'positive',
        message: `${payload.product_name} was added to cart.`
      });
    },

    REMOVE_FROM_CART(state, payload) {
      let index = state.cart.findIndex(
        item => item.product_id === payload.product_id
      );
      if (payload.quantity > 0) {
        state.cart[index].quantity = payload.quantity;
        state.cart[index].amount = payload.rate * payload.quantity;
      } else {
        state.cart.splice(index, 1);
      }

      Notify.create({
        type: 'warning',
        message: `${payload.product_name} was removed from cart.`
      });
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
