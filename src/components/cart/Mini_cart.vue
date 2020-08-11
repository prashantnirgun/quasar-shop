<template>
  <q-menu
    transition-show="scale"
    transition-hide="scale"
    v-if="allItems.length > 0"
  >
    <q-list>
      <div v-for="item in allItems" :key="item.product_id">
        <q-slide-item
          @left="onLeft(item)"
          @right="onRight"
          left-color="green"
          right-color="red"
        >
          <template v-slot:left>
            <div class="row items-center">
              <q-icon left name="favorite" />Add to Wish List
            </div>
          </template>
          <template v-slot:right>
            <div class="row items-center ">
              Remove from Cart<q-icon right name="remove_shopping_cart" />
            </div>
          </template>

          <q-item clickable dense>
            <q-item-section>
              <q-item-label
                >{{ item.product_name }} X {{ item.quantity }}</q-item-label
              >
            </q-item-section>

            <q-item-section side>
              <q-item-label class="text-right"
                >₹ {{ item.amount }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-slide-item>
      </div>
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
          @click="$router.push(`/shopping-cart`)"
        />
      </q-item-section>
    </q-item>

    <!-- <q-item class=""> -->
    <q-card-actions class="q-pt-none">
      <q-btn flat round color="red" icon="favorite">Slide Left</q-btn>
      <q-btn flat round color="teal" icon="remove_shopping_cart"
        >Slide Right</q-btn
      >
    </q-card-actions>
    <!-- </q-item> -->
  </q-menu>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
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
  },
  methods: {
    ...mapActions('cart', ['removeFromCart']),
    onLeft(item) {
      this.$q.notify('Item added to Wish List.');
    },

    onRight(item) {
      this.removeFromCart(item);
    }
  }
};
</script>
