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
    cartTotal: 0,
    deliveryAddressId: 0,
    defaultAddressId: 0
  },

  getters: {
    cartCount: state => {
      return state.cart.length;
    },
    allItems: state => {
      return state.cart;
    },
    findItem: state => product_id => {
      return state.cart.find(item => item.product_id === product_id);
    },
    findItemByCategory: state => category_id => {
      return state.cart.filter(item => item.category_id === category_id);
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
    },
    categoryList: state => {
      let caregory = [];
      state.cart.map(item => {
        let found = caregory.find(obj => obj.category_id === item.category_id);
        if (found) {
          found.totalAmount += item.amount;
          found.totalItem += 1;
          found.totalSaving += item.saving;
        } else {
          caregory.push({
            category_id: item.category_id,
            category_name: item.category_name,
            totalItem: 1,
            totalAmount: item.amount,
            totalSaving: item.saving
          });
        }
      });
      return caregory;
    },
    deliveryAddress: state => {
      return state.deliveryAddressId;
    },
    defaultAddress: state => {
      return state.defaultAddressId;
    }
  },

  mutations: {
    ADD_TO_CART(state, payload) {
      let productInCart = state.cart.find(
        item => item.product_id === payload.product_id
      );

      if (productInCart) {
        productInCart.quantity = payload.quantity;
        productInCart.amount = payload.amount;
        productInCart.saving = payload.saving;
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
      let name = state.cart[index].product_name;
      if (index != -1) {
        state.cart.splice(index, 1);
      }

      Notify.create({
        type: 'warning',
        message: `${name} was removed from cart.`
      });
    },

    CLEAR_CART_ITEMS(state) {
      state.cart = [];
    },

    UPDATE_PRODUCT_QUANTITY(state, payload) {
      let index = state.cart.findIndex(
        item => item.product_id === payload.product_id
      );
      if (payload.quantity > 0) {
        state.cart[index].quantity = payload.quantity;
        state.cart[index].amount = payload.amount;
        state.cart[index].saving = payload.saving;
      } else {
        state.cart.splice(index, 1);
      }
      if (!!payload.message) {
        Notify.create({
          type: 'warning',
          message: `${payload.product_name} was removed from cart.`
        });
      }
    },

    UPDATE_TOTALS(state) {
      //empty the toals first
      state.productAmount = 0;
      state.productQuantity = 0;
      state.savingAmount = 0;

      state.cart.map(item => {
        state.productAmount += item.amount;
        state.productQuantity += item.quantity;
        //state.shippingCharges:
        state.savingAmount += item.quantity * item.mrp - item.amount;
        //state.taxAmount: 0
      });

      state.cartTotal =
        state.productAmount + state.shippingCharges + state.taxAmount;
    },
    UPDATE_DELIVERY_ADDRESS(state, payload) {
      state.deliveryAddressId = payload;
    },
    UPDATE_DEFAULT_DELIVERY_ADDRESS(state, payload) {
      state.defaultAddressId = payload;
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
    },
    updateProductQuantity({ commit }, payload) {
      commit('UPDATE_PRODUCT_QUANTITY', payload);
      commit('UPDATE_TOTALS');
    },
    updateDeliveryAddress({ commit }, payload) {
      commit('UPDATE_DELIVERY_ADDRESS', payload);
    },
    updateDefaultDeliveryAddress({ commit }, payload) {
      commit('UPDATE_DEFAULT_DELIVERY_ADDRESS', payload);
    }
  }
};
