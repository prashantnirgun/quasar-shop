<template>
  <div class="">
    <shopping-cart-desktop v-if="isDesktop" />
    <shopping-cart-mobile v-else />
  </div>
</template>
<script>
import device_mixin from 'src/mixins/device_mixin';
export default {
  mixins: [device_mixin],
  components: {
    'shopping-cart-desktop': () => import('./ShoppingCartDesktop'),
    'shopping-cart-mobile': () => import('./ShoppingCartMobile')
  },
  data() {
    return {};
  }
};
</script>
