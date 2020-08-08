<template>
  <q-menu
    transition-show="scale"
    transition-hide="scale"
    v-if="allItems.length > 0"
  >
    <q-list style="min-width: 150px">
      <q-item clickable v-for="item in allItems" :key="item.product_id" dense>
        <q-item-section>
          <q-item-label
            >{{ item.product_name }} X {{ item.quantity }}</q-item-label
          >
        </q-item-section>

        <q-item-section side>
          <q-item-label class="text-right">₹ {{ item.amount }} </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator />
    <q-item class="text-primary text-bold">
      <q-item-section>
        <q-item-label>Total</q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-right">₹ {{ getTotal }} </q-item-label>
      </q-item-section>
    </q-item>

    <q-item class="text-primary text-bold">
      <q-item-section>
        <q-btn
          color="green"
          label="Go To Cart"
          @click="$router.push(`/cart`)"
        />
      </q-item-section>
    </q-item>
  </q-menu>
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
    ...mapGetters('cart', ['allItems']),
    getTotal() {
      return this.allItems.reduce((total, item) => {
        return total + item.amount;
      }, 0);
    }
  }
};
</script>
