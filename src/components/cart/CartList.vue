<template>
  <q-card class="">
    <q-card-section>
      <div v-if="isDesktop">
        <q-splitter v-model="splitterModel" style="height: 400px">
          <template v-slot:before>
            <cart-category-list />
          </template>

          <template v-slot:after>
            <cart-product-list />
          </template>
        </q-splitter>
      </div>
      <div v-else>
        <cart-product-list-mobile />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import device_mixin from 'src/mixins/device_mixin';
export default {
  mixins: [device_mixin],
  components: {
    'cart-product-list': () => import('./CartProductList'),
    'cart-product-list-mobile': () => import('./CartProductListMobile'),
    'cart-category-list': () => import('./CartCategoryList')
  },
  data() {
    return {
      splitterModel: 40
      //category_id: 0
    };
  }
};
</script>
