<template>
  <q-card class="q-ma-sm">
    <div transition-show="scale" transition-hide="scale" class="column">
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
            <q-item-label
              >{{ cartsummary.productAmount | currency }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Tax Amount </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ cartsummary.taxAmount | currency }} </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Delivery Charges </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label
              >{{ cartsummary.shippingCharges | currency }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item class="text-blue text-h6">
          <q-item-section>
            <q-item-label>Final Totals </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ cartsummary.cartTotal | currency }} </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item class="text-red text-h6">
          <q-item-section>
            <q-item-label>Total Savings</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-red"
              >{{ cartsummary.savingAmount | currency }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-card>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters('cart', ['cartsummary'])
  },
  mounted() {
    console.log('summary', this.cartsummary);
  }
};
</script>
