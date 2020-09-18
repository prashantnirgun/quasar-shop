<template>
  <q-list class="">
    <q-card v-for="cart in cartList" :key="cart.product_id" class="">
      <cart-product-mobile :data="cart" />
    </q-card>
  </q-list>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  components: {
    'cart-product-mobile': () => import('./CartProductMobile')
  },
  data() {
    return {
      cartList: []
    };
  },
  computed: {
    ...mapGetters('cart', ['allItems'])
  },

  mounted() {
    this.cartList = this.allItems;
  }
};
</script>
<style lang="sass">
.q-card__section--vert
    padding: 16px;
    padding-top: 4px;
    padding-right: 4px;
    padding-bottom: 4px;
    padding-left: 4px;
</style>
