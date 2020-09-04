<template>
  <div class="row">
    <div class="col-3">
      <img :src="data.image_filename" height="116px" width="116px" />
    </div>

    <div class="col-9">
      <div class="q-pa-sm text-h6">
        {{ data.product_name }}
      </div>
      <div class="row">
        <div class="col-4">MRP</div>
        <div class="col-4">Our Price</div>
        <div class="col-4">Amount</div>
      </div>
      <div class="row">
        <div class="col-4">{{ data.mrp | currency }}</div>
        <div class="col-4">{{ data.rate | currency }}</div>
        <div class="col-4">{{ data.amount | currency }}</div>
      </div>

      <div class="row q-ma-sm content-center">
        <div class="col-6">
          <q-btn
            icon="remove_shopping_cart"
            size="md"
            flat
            class="full-height"
            @click="remove"
          />
        </div>
        <div class="col-6">
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
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  props: ['data'],
  data() {
    return {
      orderQty: this.data.quantity
    };
  },
  computed: {
    //    ...mapGetters('cart', ['findItemByCategory'])
  },
  methods: {
    ...mapActions('cart', [
      'addProductToCart',
      'updateProductQuantity',
      'removeFromCart'
    ]),
    increment() {
      this.orderQty++;
      this.setProduct();
    },
    decrement() {
      this.orderQty--;
      this.setProduct();
    },
    setProduct() {
      this.updateProductQuantity({
        product_id: this.data.product_id,
        quantity: this.orderQty,
        amount: this.orderQty * this.data.rate,
        saving: this.orderQty * this.data.mrp - this.orderQty * this.data.rate,
        message: false
      });
    },
    remove() {
      this.removeFromCart({ product_id: this.data.product_id });
    }
  }
};
</script>

<style lang="sass" scoped></style>
