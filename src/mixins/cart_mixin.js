import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  methods: {
    ...mapActions('cart', [
      'addProductToCart',
      'updateProductQuantity',
      'removeFromCart'
    ])
  }
};
