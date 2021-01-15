<template>
  <div class="">
    <shopping-cart-desktop v-if="isDesktop" :stage="stage" />
    <shopping-cart-mobile v-else :stage="stage" />
  </div>
</template>
<script>
import device_mixin from 'src/mixins/device_mixin';
export default {
  props: ['stage'],
  mixins: [device_mixin],
  components: {
    'shopping-cart-desktop': () => import('./ShoppingCartDesktop'),
    'shopping-cart-mobile': () => import('./ShoppingCartMobile')
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
