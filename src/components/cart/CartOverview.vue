<template>
  <div transition-show="scale" transition-hide="scale" class="column">
    <!-- <q-card-section>
      <div class="text-h6">Order Summary</div>
    </q-card-section> 
    <q-separator />-->
    <q-list class="">
      <q-item class="text-blue text-h5 text-center">
        <q-item-section>
          <q-item-label>Order Summary</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item>
        <q-item-section>
          <q-item-label>Sub Totals </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>₹ {{ cartsummary.productAmount }} </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label>Tax Amount </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>₹ {{ cartsummary.taxAmount }} </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label>Delivery Charges </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>₹ {{ cartsummary.shippingCharges }} </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item class="text-blue text-h6">
        <q-item-section>
          <q-item-label>Final Totals </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>₹ {{ cartsummary.cartTotal }} </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      //totalAmount: 0
    };
  },
  computed: {
    ...mapGetters('cart', ['cartsummary'])
  },
  mounted() {
    console.log('item', this.cartsummary);
  }
};
</script>
