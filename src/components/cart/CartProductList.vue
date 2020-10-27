<template>
  <q-list class="q-px-sm q-gutter-md">
    <q-card v-for="cart in cartList" :key="cart.product_id">
      <cart-product :data="cart" />
      <!-- <div class="row">
        <div>
          <img :src="cart.image_filename" height="116px" width="116px" />
        </div>

        <div>
          <div class="q-pa-sm text-h6">
            {{ cart.product_name }}
          </div>
          <q-item-label class="text-weight-regular"
            >Qunatity : {{ cart.quantity }}</q-item-label
          >
          <q-item-label class="text-caption"
            >MRP : {{ cart.mrp | currency }}</q-item-label
          >
          <q-item-label>Our Price : {{ cart.rate | currency }}</q-item-label>
        </div>
        <div>
          <q-input
            v-model.number="orderQty"
            color="green-6"
            style="width: 135px; height : 30px;"
            dense
            outlined
            class="custom-control col-4"
          >
            <template v-slot:prepend>
              <q-btn
                @click="decrement"
                color="green-6"
                icon="remove"
                size="md"
                round
                unelevated
                class="rounded-borders full-height"
              />
            </template>

            <template v-slot:append>
              <q-btn
                @click="increment"
                color="green-6"
                icon="add"
                size="md"
                round
                unelevated
                class="rounded-borders full-height"
              />
            </template>
          </q-input>
        </div>
      </div> -->
    </q-card>
  </q-list>
</template>
<script>
import { mapGetters } from 'vuex';
import bus from 'src/boot/events';
export default {
  components: {
    'cart-product': () => import('./CartProduct')
  },
  data() {
    return {
      cartList: []
    };
  },
  watch: {
    currentCategoryDisplay(oldVal, newVal) {
      console.log('new category is', oldVal, newVal);
      this.cartList = this.findItemByCategory(newVal);
    }
  },
  computed: {
    ...mapGetters('cart', ['findItemByCategory', 'currentCategoryDisplay'])
  },
  methods: {
    // event_listner() {
    //   bus.$on('update_product_cart', category_id => {
    //     this.cartList = this.findItemByCategory(category_id);
    //     console.log('event capture', category_id);
    //   });
    // }
  },
  mounted() {
    console.log('mounted', this.currentCategoryDisplay);
    this.cartList = this.findItemByCategory(this.currentCategoryDisplay);
  },
  created() {
    console.log('created', this.currentCategoryDisplay);
    //this.event_listner();
  }
};
</script>
