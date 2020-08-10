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
    cart: [],
    productAmount: 0,
    productQuantity: 0,
    shippingCharges: 0,
    savingAmount: 0,
    taxAmount: 0,
    cartTotal: 0
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
          return true;
        } else {
          return false;
        }
      });
    },
    cartsummary: state => {
      return {
        productAmount: state.productAmount,
        productQuantity: state.productQuantity,
        shippingCharges: state.shippingCharges,
        savingAmount: state.savingAmount,
        taxAmount: state.taxAmount,
        cartTotal: state.cartTotal
      };
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
    },

    UPDATE_TOTALS(state) {
      state.cart.map(item => {
        state.productAmount += item.amount;
        state.productQuantity += item.quantity;
        //state.shippingCharges:
        state.savingAmount += item.quantity * item.mrp - item.amount;
        //state.taxAmount: 0
      });

      state.cartTotal =
        state.productAmount + state.shippingCharges + state.taxAmount;
    }
  },

  actions: {
    addProductToCart({ commit }, payload) {
      commit('ADD_TO_CART', payload);
      commit('UPDATE_TOTALS');
    },
    removeFromCart({ commit }, payload) {
      commit('REMOVE_FROM_CART', payload);
      commit('UPDATE_TOTALS');
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
