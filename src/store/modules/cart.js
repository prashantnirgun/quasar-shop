import DataService from 'src/services/DataService';
import { Notify } from 'quasar';

const getDefaultState = () => {
  return {
    cart: [],
    billType: 'PR',
    productAmount: 0,
    productBaseAmount: 0,
    productQuantity: 0,
    savingAmount: 0,
    taxAmount: 0,
    cartTotal: 0,
    deliveryAddress: {},
    billingAddress: {},
    customerID: 0,
    user_type: 'G',
    currentCategoryDisplay: { category_id: 0, totalItem: 0 },
    taxes: [] //{name : 'xx' , tax_amount : 0}
  };
};

export default {
  namespaced: true,
  state: getDefaultState(),

  getters: {
    cartCount: state => {
      return state.cart ? state.cart.length : 0;
    },
    allItems: state => {
      return state.cart;
    },
    findItemInCart: state => product_id => {
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
        cartTotal: state.cartTotal,
        taxes: state.taxes
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
      return state.deliveryAddress;
    },
    deliveryAddressStatus: state => {
      return state.deliveryAddress
        ? state.deliveryAddress.status === 'Open'
          ? true
          : false
        : false;
    },
    defaultAddress: state => state.defaultAddress,
    currentCategoryDisplay: state => state.currentCategoryDisplay,
    productAmount: state => state.productAmount
  },

  mutations: {
    CALCULATE_SHIPPING_CHARGES(state) {
      let deliveryCharges = 0;
      if (
        !!state.deliveryAddress &&
        state.deliveryAddress.status === 'Open' &&
        parseFloat(state.deliveryAddress.delivery_charges) > 0
      ) {
        if (state.deliveryAddress.delivery_charges_type === 'F') {
          deliveryCharges = state.deliveryAddress.delivery_charges;
        } else {
          deliveryCharges =
            state.deliveryAddress.delivery_charges * state.productQuantity;
        }

        if (deliveryCharges > 0) {
          let found = state.taxes.find(
            tax => tax.tax_name === 'Delivery Charges'
          );
          if (found) {
            found.tax_amount = deliveryCharges;
          } else {
            state.taxes.push({
              tax_name: 'Delivery Charges',
              tax_amount: deliveryCharges
            });
          }
        }

        //GST is all inclusing so add only delviery charges
        //state.taxAmount = gstTaxAmount + deliveryCharges;
        state.cartTotal = state.productAmount + deliveryCharges;
      }
    },
    ADD_TO_CART(state, payload) {
      let productInCart =
        state.cart &&
        state.cart.find(item => item.product_id === payload.product_id);

      if (productInCart) {
        productInCart.quantity = payload.quantity;
        productInCart.amount = parseFloat(payload.amount);
        productInCart.baseAmount = parseFloat(payload.baseAmount);
        productInCart.saving = parseFloat(payload.saving);
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
      //console.log('remove_from_cart', payload, index);
      let name = state.cart[index].product_name;
      if (index != -1) {
        state.cart.splice(index, 1);
      }
      console.log('inside remove_from_cart mutation', state.cart);
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
      //console.log('update_product_quantity', payload, index);
      if (payload.quantity > 0) {
        state.cart[index].quantity = payload.quantity;
        state.cart[index].amount = parseFloat(payload.amount);
        state.cart[index].baseAmount = parseFloat(payload.baseAmount);
        state.cart[index].saving = parseFloat(payload.saving);
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
      let taxAmount = 0;
      let cartTotal = 0;
      let gstTaxAmount = 0;
      let deliveryCharges = 0;

      state.cart.map(item => {
        state.productAmount += item.amount;
        state.productQuantity += item.quantity;
        //state.shippingCharges:
        state.savingAmount += item.quantity * item.mrp - item.amount;
        //GST Taxes Calculation begin
        console.log(
          'inside update_totals 1',
          gstTaxAmount,
          typeof gstTaxAmount
        );
        if (item.gst_rate > 0) {
          let amt = parseFloat((item.baseAmount * item.gst_rate) / 100).toFixed(
            2
          );
          gstTaxAmount += parseFloat(amt);
        }
      });

      if (gstTaxAmount > 0) {
        let gst_tax = state.taxes.find(tax => tax.tax_name === 'GST');
        if (gst_tax) {
          gst_tax.tax_amount = gstTaxAmount;
        } else {
          state.taxes.push({
            tax_name: 'GST',
            tax_amount: gstTaxAmount
          });
        }
      }

      //Delivery charges calculation
      if (state.deliveryAddress && state.deliveryAddress.delivery_charges > 0) {
        if (state.deliveryAddress.delivery_charges_type === 'F') {
          deliveryCharges = state.deliveryAddress.delivery_charges;
        } else {
          deliveryCharges =
            state.deliveryAddress.delivery_charges * state.productQuantity;
        }
      }
      //GST is all inclusing so add only delviery charges
      //state.taxAmount = gstTaxAmount + deliveryCharges;
      state.taxAmount = deliveryCharges;
      state.cartTotal = state.productAmount + state.taxAmount;
    },
    UPDATE_DELIVERY_ADDRESS(state, payload) {
      if (payload.status === 'Close') {
        Notify.create({
          type: 'warning',
          icon: 'wrong_location',
          color: 'primary',
          message:
            'Sorry we are not delivering to this pincode choose different city.',
          actions: [
            {
              label: 'Area of Operation',
              color: 'white',
              handler: () => {
                this.$router.push('city');
              }
            }
          ]
        });
      } else {
        //please calculate shippin charges
        state.deliveryAddress = payload;
      }
    },
    UPDATE_BILLING_ADDRESS(state, payload) {
      // console.log(
      //   'update_billing_address payload is',
      //   payload,
      //   !!state.billingAddress
      // );
      Object.keys(payload).map(key => {
        //console.log('key', key, state, payload[key]);
        state.billingAddress[key] = payload[key];
      });
    },
    UPDATE_CUSTOMER_ID(state, payload) {
      state.customerID = payload;
      state.user_tpye = payload > 0 ? 'U' : 'G';
    },
    UPDATE_BILL_TYPE(state, payload) {
      state.billType = payload;
    },
    RESET_CART(state) {
      Object.assign(state, getDefaultState());
    },
    RESET_STATE(state) {
      // Merge rather than replace so we don't lose observers
      // https://github.com/vuejs/vuex/issues/1118
      Object.assign(state, getDefaultState());
    },
    CURRENT_CATEGORY_DISPLAY(state, payload) {
      //console.log('CURRENT_CATEGORY_DISPLAY mutation', payload);
      state.currentCategoryDisplay = payload;
    }
  },

  actions: {
    cartReset({ commit }) {
      commit('RESET_CART');
    },
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
      commit('CALCULATE_SHIPPING_CHARGES');
    },
    updateBillingAddress({ commit }, payload) {
      commit('UPDATE_BILLING_ADDRESS', payload);
    },
    async updateCustomerId({ commit }, payload) {
      commit('UPDATE_CUSTOMER_ID', payload);
    },
    async findGuestId({ commit }) {
      let result = await DataService.get(
        'company_default?where=label like {Guest%20Customer}'
      );
      let payload = result.data.rows[0].default_id;
      commit('UPDATE_CUSTOMER_ID', payload);
    },
    async updateBillType({ commit }, payload) {
      commit('UPDATE_BILL_TYPE', payload);
    },
    resetCartState({ commit }) {
      commit('RESET_STATE');
    },
    setCurrentCategoryDisplay({ commit }, payload) {
      console.log('inside setCurrentCategoryDisplay', payload);
      commit('CURRENT_CATEGORY_DISPLAY', payload);
    }
  }
};
