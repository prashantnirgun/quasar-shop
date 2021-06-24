<template>
  <div class="">
    <shopping-cart-desktop v-if="isDesktop" :stage="stage" />
    <shopping-cart-mobile v-else :stage="stage" />
  </div>
</template>
<script>
import device_mixin from 'src/mixins/device_mixin';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  props: ['stage'],
  mixins: [device_mixin],
  // watch: {
  //   $route(to, from) {
  //     console.log('from', from, 'to', to, 'state', this.state);
  //     console.log('state', this.stage);
  //   },
  //   stage(newVal) {
  //     console.log('inside shoppingcart stage', newVal);
  //     this.stageIndex = newVal;
  //   }
  // },
  methods: {
    ...mapActions('cart', ['updateBillingAddress']),
    ...mapActions(['setAddressValidation'])
  },
  components: {
    'shopping-cart-desktop': () => import('./ShoppingCartDesktop'),
    'shopping-cart-mobile': () => import('./ShoppingCartMobile')
  },
  data() {
    return {
      stageIndex: this.state
    };
  },
  updated() {
    console.log('updaed');
  },
  mounted() {
    console.log('inside shopping cart mounted', this.stage);
    this.updateBillingAddress(null);
    this.setAddressValidation(false);
  }
};
</script>
