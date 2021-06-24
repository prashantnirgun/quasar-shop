<template>
  <div
    transition-show="scale"
    transition-hide="scale"
    v-if="allItems.length > 0"
    class="q-ma-lg row col-12"
  >
    <q-list class="col-12">
      <q-card
        expand-separator
        v-for="item in allItems"
        :key="item.product_id"
        class="q-ma-xs"
      >
        <q-expansion-item expand-separator>
          <template slot="header">
            <q-item-section>
              <q-item-label>{{ item.product_name }} </q-item-label>
            </q-item-section>
            <q-chip color="primary" small> ₹ {{ item.amount }} </q-chip>
          </template>
          <q-item>
            <q-item-section><q-skeleton size="50px"/></q-item-section>
            <q-item-section>
              <q-item-label>Quantity : {{ item.quantity }}</q-item-label>
              <q-item-label caption>Amount {{ item.amount }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-card>
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
    ...mapGetters('cart', ['allItems']),
    getTotal() {
      return this.allItems.reduce((total, item) => {
        return total + item.amount;
      }, 0);
    }
  }
};
</script>
