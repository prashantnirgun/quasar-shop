<template>
  <q-card class="q-ma-sm">
    <q-card-section>
      <div>
        <q-splitter v-model="splitterModel" style="height: 400px">
          <template v-slot:before>
            <cart-category-list />
          </template>

          <template v-slot:after>
            <cart-product-list />
          </template>
        </q-splitter>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  components: {
    'cart-product-list': () => import('./CartProductList'),
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
