<template>
  <div>
    <div class="row">
      <div
        @click="$router.push(`/product-details/${data.product_id}`)"
        class="cursor-pointer"
        :class="[
          horizontal ? 'col-4' : 'col-12',
          'row',
          'items-center',
          'justify-center'
        ]"
      >
        <q-img
          :height="setHeigh"
          :src="data.image_filename"
          spinner-color="primary"
          spinner-size="82px"
          placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
        >
          <q-badge
            v-if="!horizontal && data.tag"
            class="transparent no-margin no-padding"
          >
            <q-chip icon="star" color="yellow" text-color="black">{{
              data.tag
            }}</q-chip>
          </q-badge>
        </q-img>
      </div>

      <div :class="[horizontal ? 'col-8' : 'col-12']">
        <div class="q-pa-sm text-h6">
          {{ data.product_name }}
        </div>
        <div :class="[!horizontal ? 'hidden' : 'row']">
          <div class="col-4">
            <q-rating
              v-model="stars"
              color="orange"
              :max="5"
              readonly
              size="14px"
            ></q-rating>
          </div>
          <div class="col-4 text-grey-10">MRP</div>
          <div class="col-4 text-strike text-right q-pr-sm">
            {{ data.mrp }}
          </div>
        </div>
        <div :class="[!horizontal ? 'hidden' : 'row']">
          <div class="col-4"></div>
          <div class="col-4 text-green text-bold">Our Price</div>
          <div class="col-4 text-right text-green text-bold q-pr-sm">
            {{ data.sale_rate }}
          </div>
        </div>
        <div :class="[!horizontal ? 'hidden' : 'row']">
          <div class="col-4"></div>
          <div class="col-4">Saving</div>
          <div class="col-4 text-right q-pr-sm">22% off</div>
        </div>
      </div>
    </div>
    <div :class="['row', 'q-pa-sm', { hidden: horizontal }]">
      <div class="col-12 row ">
        <div class="col-4">
          <div class="text-green-8 text-h7 text-bold">Price</div>
          <div class="text-green-8 text-h7 text-bold">
            ₹{{ data.sale_rate }}
          </div>
        </div>
        <div class="col-4">
          <div class="text-grey-10 text-h7 text-bold">MRP</div>
          <div class="text-grey-10 text-h7 text-strike">₹{{ data.mrp }}</div>
        </div>
        <div class="col-4">
          <div class="text-h7 text-bold">Saving</div>
          <div class="text-h7">22% off</div>
        </div>
      </div>
    </div>

    <div class="row q-pa-sm q-mb-sm items-evenly">
      <q-rating
        v-if="data.product_id % 2 === 0"
        class="col-6"
        v-model="stars"
        color="orange"
        :max="5"
        readonly
        size="17px"
      ></q-rating>

      <q-badge v-else class="transparent no-margin no-padding">
        <q-chip
          icon="star"
          color="yellow"
          text-color="black"
          class="col-6 ellipsis"
          >{{ data.tag }}</q-chip
        >
      </q-badge>

      <q-space />
      <q-btn
        v-if="orderQty === 0"
        class="text-weight-bold col-4"
        dense
        color="positive"
        icon="add_shopping_cart"
        label="Add"
        @click="increment"
      />

      <q-input
        v-else
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
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  props: ['data', 'horizontal'],

  data() {
    return {
      stars: 4,
      orderQty: 0
    };
  },
  methods: {
    ...mapActions('cart', ['addProductToCart', 'removeFromCart']),
    increment() {
      this.orderQty++;
      console.log('going to add', this.data.product_id, this.orderQty);
      this.addProductToCart({
        product_id: this.data.product_id,
        product_name: this.data.product_name,
        rate: this.data.sale_rate,
        quantity: this.orderQty,
        amount: this.orderQty * this.data.sale_rate
      });
      //console.log('store', this.$store.state.cart.cart);
    },
    decrement() {
      this.orderQty--;
      this.removeFromCart({
        product_id: this.data.product_id,
        quantity: this.orderQty
      });
    }
  },
  computed: {
    ...mapState(['cart']),
    setHeigh() {
      return this.horizontal ? '116px' : '300px';
    }
  }
  // mounted() {
  //   console.log('mounted', this.cart);
  // }
};
</script>

<style lang="sass" scoped>
::v-deep .custom-control
  & .q-field__control
    padding: 0

  input
    text-align: center
</style>
