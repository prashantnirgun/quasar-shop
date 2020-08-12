<template>
  <q-list bordered separator class="q-ml-md ">
    <q-item clickable v-ripple v-for="cart in cartList" :key="cart.product_id">
      <q-item-section class="col-2">
        <img :src="cart.image_filename" height="80px" width="80px" />
      </q-item-section>

      <q-item-section class="col-10">
        <q-item-label class="text-subtitle1">{{
          cart.product_name
        }}</q-item-label>
        <q-item-label class="text-weight-regular"
          >Qunatity : {{ cart.quantity }}</q-item-label
        >
        <q-item-label class="text-caption"
          >MRP : {{ cart.mrp | currency }}</q-item-label
        >
        <q-item-label>Our Price : {{ cart.rate | currency }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
import { mapGetters } from 'vuex';
import bus from 'src/boot/events';
export default {
  props: ['category_id'],
  watch: {
    category_id(newVal) {
      this.getcartList();
    }
  },
  data() {
    return {
      cartList: []
    };
  },
  computed: {
    ...mapGetters('cart', ['findItemByCategory'])
  },
  methods: {
    getcartList() {
      console.log('getCartList...');
      this.cartList = this.findItemByCategory(this.category_id);
    },
    event_listner() {
      bus.$on('update_product_cart', () => {
        console.log('going to call getcartlist()');
        this.getcartList();
      });
    }
  },
  // mounted() {
  //   this.getcartList();
  // },
  created() {
    this.event_listner();
  }
};
</script>
