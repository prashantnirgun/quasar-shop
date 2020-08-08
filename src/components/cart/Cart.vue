<template>
  <div
    transition-show="scale"
    transition-hide="scale"
    v-if="allItems.length > 0"
    class="q-ma-lg row col-5"
  >
    <q-list style="min-width: 150px" class="col-5">
      <q-card
        expand-separator
        v-for="item in allItems"
        :key="item.product_id"
        class="q-ma-xs"
      >
        <!-- <slot>{{ item.product_name }}</slot> -->

        <q-expansion-item expand-separator>
          <template slot="header" class="q-pa-none q-ma-none">
            <q-item-section>
              <q-item-label>{{ item.product_name }} </q-item-label>
            </q-item-section>
            <q-chip color="primary" small class="q-mr-sm">
              ₹ {{ item.amount }}
            </q-chip>
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

      <!-- <q-item clickable v-for="item in allItems" :key="item.product_id" dense>
        <q-item-section>
          <q-item-label
            >{{ item.product_name }} X {{ item.quantity }}</q-item-label
          >
        </q-item-section>

        <q-item-section side>
          <q-item-label class="text-right">₹ {{ item.amount }} </q-item-label>
        </q-item-section>
      </q-item>  -->
    </q-list>

    <!-- <q-separator />
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
        <q-btn color="green" label="Go To Cart" />
      </q-item-section>
    </q-item>  -->
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
