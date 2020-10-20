import DataService from 'src/services/DataService';
import { Notify } from 'quasar';

export default {
  namespaced: true,
  state: {
    cart: [],
    billType: 'PR',
    productAmount: 0,
    productBaseAmount: 0,
    productQuantity: 0,
    savingAmount: 0,
    taxAmount: 0,
    cartTotal: 0,
    deliveryAddress: null,
    billingAddress: null,
    customerID: 0,
    taxes: [] //{name : 'xx' , tax_amount : 0}
  },

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
    defaultAddress: state => {
      return state.defaultAddress;
    }
  },

  mutations: {
    // ADD_SHIPPING_CHARGES(state, tax_amount) {
    //   //if (state.cart.taxes.length > 0) {
    //     let found = state.taxes.find(tax => tax.name === 'Delivery Charges');
    //   //}
    //   console.log('value of found', found, found ? 'True' : 'False')
    //   found ? found.tax_amount = tax_amount :
    //     state.taxes.push({name : 'Delivery Charges', tax_amount })

    // },
    CALCULATE_SHIPPING_CHARGES(state) {
      console.log('inside caluclateshipping', state.deliveryAddress);
      if (state.deliveryAddress && state.deliveryAddress.status === 'Open') {
        if (state.deliveryAddress.delivery_charges_type === 'F') {
          let found = state.taxes.find(tax => tax.name === 'Delivery Charges');
          console.log('value of found', found, found ? 'True' : 'False');
          found
            ? (found.tax_amount = state.deliveryAddress.delivery_charges)
            : state.taxes.push({
                name: 'Delivery Charges',
                tax_amount: state.deliveryAddress.delivery_charges
              });
        } else {
        }
      }
    },
    ADD_TO_CART(state, payload) {
      let productInCart =
        state.cart &&
        state.cart.find(item => item.product_id === payload.product_id);

      if (productInCart) {
        productInCart.quantity = payload.quantity;
        productInCart.amount = payload.amount;
        productInCart.baseAmount = payload.baseAmount;
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
      let index = state.cart.find(
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
      let index = state.cart.findItemInCart(
        item => item.product_id === payload.product_id
      );
      if (payload.quantity > 0) {
        state.cart[index].quantity = payload.quantity;
        state.cart[index].amount = payload.amount;
        state.cart[index].baseAmount = payload.baseAmount;
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
        if (item.gst_rate > 0) {
          let gst_tax = state.taxes.find(tax => (tax.name = 'GST'));
          let tax_amount = ((item.baseAmount * item.gst_rate) / 100).toFixed(2);
          if (gst_tax) {
            gst_tax.tax_amount = gst_tax.tax_amount + tax_amount;
          } else {
            state.taxes.push({
              tax_name: 'GST',
              //tax_rate: item.tax_rate,
              tax_amount
            });
          }
          gstTaxAmount += taxAmount;
        }
      });

      //Delivery charges calculation
      if (state.deliveryAddress) {
        if (state.deliveryAddress.delivery_charges_type === 'F') {
          deliveryCharges = state.deliveryAddress.delivery_charges;
        } else {
          deliveryCharges =
            state.deliveryAddress.delivery_charges * productQuantity;
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
      Object.keys(payload).map(
        key => (state.billingAddress[key] = payload[key])
      );
    },
    UPDATE_CUSTOMER_ID(state, payload) {
      state.customerID = payload;
    },
    UPDATE_BILL_TYPE(state, payload) {
      state.billType = payload;
    },
    RESET_CART(state) {
      state.cart = null;
      state.productAmount = 0;
      state.productQuantity = 0;
      state.shippingCharges = 0;
      state.savingAmount = 0;
      state.taxAmount = 0;
      state.cartTotal = 0;
      state.taxes = null;
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
      console.log('updateDeliveryAddress Payload', payload);
      commit('UPDATE_DELIVERY_ADDRESS', payload);
      commit('CALCULATE_SHIPPING_CHARGES');
    },
    updateBillingAddress({ commit }, payload) {
      console.log('updateBillingAddress Payload', payload);
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
    }
  }
};
