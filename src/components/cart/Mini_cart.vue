<template>
  <q-menu
    transition-show="scale"
    transition-hide="scale"
    v-if="allItems && allItems.length > 0"
  >
    <q-list>
      <div v-for="item in allItems" :key="item.product_id">
        <q-slide-item
          @left="onLeft(item)"
          @right="onRight(item)"
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
                >{{ item.amount | currency }}
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
        <q-item-label class="text-right"
          >{{ cartsummary.cartTotal | currency }}
        </q-item-label>
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
    <q-item>
      <q-item-section avatar>
        <q-avatar text-color="green" icon="favorite" />
      </q-item-section>

      <q-item-section>Swipe Left Swipe Right</q-item-section>

      <q-item-section avatar>
        <q-avatar text-color="red" icon="remove_shopping_cart" />
      </q-item-section>
    </q-item>
    <!-- </q-item> -->
  </q-menu>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters('cart', ['allItems', 'cartsummary'])
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
