<template>
  <div>
    <!-- <q-ribbon
      class="q-pb-md"
      decoration="point-in"
      background-color="secondary"
      inline
      >Quasar Color</q-ribbon
    > -->
    <div class="row">
      <div
        @click="$router.push(`/product/${data.slug}`)"
        class="cursor-pointer"
        :class="[
          horizontal ? 'col-4' : 'col-12',
          'row',
          'items-center',
          'justify-center'
        ]"
      >
        <!-- <q-ribbon position="top-left" type="corner" glow>Saving 33%</q-ribbon> -->

        <!-- <div class="inline-block relative-position"> -->
        <q-img
          :height="setHeigh"
          :src="data.image_filename"
          spinner-color="primary"
          spinner-size="82px"
          transition="scale"
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
        <!-- </div> -->
      </div>
      <!-- horizontal -->
      <div :class="[horizontal ? 'col-8' : 'col-12']">
        <div
          class="q-pa-sm text-h6 cursor-pointer"
          @click="$router.push(`/product/${data.slug}`)"
        >
          {{ data.product_name }}
        </div>
        <div :class="[!horizontal ? 'hidden' : 'row']">
          <div class="col-6">
            <!-- <q-rating
              v-model="stars"
              color="orange"
              :max="5"
              readonly
              size="14px"
            ></q-rating> -->
          </div>

          <div class="col-2 text-green-6 text-bold float-rigth">Price</div>
          <div class="col-4 text-right text-green-6 text-bold q-pr-sm">
            {{ data.rate | currency }}
          </div>
        </div>
        <div :class="[!horizontal ? 'hidden' : 'row']">
          <div class="col-6"></div>
          <div class="col-2">MRP</div>
          <div class="col-4 text-strike text-right q-pr-sm">
            {{ data.mrp | currency }}
          </div>
        </div>
        <div :class="[!horizontal ? 'hidden' : 'row']">
          <div class="col-6"></div>
          <div class="col-2 text-red">Saving</div>
          <div class="col-4 text-right text-red q-pr-sm">
            {{
              orderQty > 0
                ? data.mrp * orderQty - data.rate * orderQty
                : (data.mrp - data.rate) | currency
            }}
          </div>
        </div>
      </div>
    </div>
    <!-- Vertical -->
    <div :class="['row', 'q-pa-sm', { hidden: horizontal }]">
      <div class="col-12 row ">
        <div class="col-4">
          <div class="text-green-6 text-h7 text-bold text-center">
            Our Price
          </div>
          <div class="text-green-6 text-h7 text-bold  text-center">
            {{ data.rate | currency }}
          </div>
        </div>
        <div class="col-4">
          <div class="text-grey-10 text-h7 text-bold  text-center">MRP</div>
          <div class="text-grey-10 text-h7 text-strike  text-center">
            {{ data.mrp | currency }}
          </div>
        </div>
        <div class="col-4">
          <div class="text-h7 text-bold text-red text-center">Saving</div>
          <div class="text-h7 text-red text-center">
            {{
              orderQty > 0
                ? data.mrp * orderQty - data.rate * orderQty
                : (data.mrp - data.rate) | currency
            }}
          </div>
        </div>
      </div>
    </div>

    <div class="row q-pa-sm q-mb-sm items-evenly">
      <q-rating
        class="col-6"
        v-model="data.rating"
        max="5"
        size="1.2em"
        color="orange"
        icon="star_border"
        icon-selected="star"
        icon-half="star_half"
        no-dimming
        readonly
      ></q-rating>

      <!-- <q-badge v-else class="transparent no-margin no-padding">
        <q-chip
          icon="star"
          color="yellow"
          text-color="black"
          class="col-6 ellipsis"
          >{{ data.tag }}</q-chip
        >
      </q-badge> -->

      <q-space />
      <q-btn
        v-if="orderQty === 0"
        class="text-weight-bold col-4"
        dense
        color="positive"
        icon="add_shopping_cart"
        label="Add"
        @click="increment(data, ++orderQty)"
      />

      <q-input
        v-else
        v-model.number="orderQty"
        color="green-6"
        style="width: 135px; height : 30px;"
        dense
        outlined
        class="custom-control col-4"
        @blur="setQuantity(data, orderQty)"
      >
        <template v-slot:prepend>
          <q-btn
            @click="decrement(data, --orderQty)"
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
            @click="increment(data, ++orderQty)"
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
import { mapGetters } from 'vuex';
import cart_mixin from 'src/mixins/cart_mixin';
export default {
  props: ['data', 'horizontal'],
  mixins: [cart_mixin],
  data() {
    return {
      stars: 4,
      orderQty: 0
    };
  },
  watch: {
    'data.product_id'(NewItem) {
      let cartItem = this.findItemInCart(this.data.product_id);
      if (cartItem) {
        this.orderQty = cartItem.quantity;
      } else {
        this.orderQty = 0;
      }
    }
  },
  methods: {
    // add() {
    //   this.orderQty++;
    //   let d = { ...this.data };
    //   d.quantity = this.orderQty;
    //   this.increment(d);
    //   console.log(
    //     'amount',
    //     this.data,
    //     this.removeGST(d.quantity * d.rate, this.data.gst_rate)
    //   );
    // }
    // ...mapActions('cart', ['addProductToCart', 'updateProductQuantity']),
    // setQuantity() {
    //   this.updateProductQuantity({
    //     product_id: this.data.product_id,
    //     category_id: this.data.category_id,
    //     product_name: this.data.product_name,
    //     category_name: this.data.category_name,
    //     rate: this.data.rate,
    //     quantity: this.orderQty,
    //     amount: this.orderQty * this.data.rate,
    //     gst_rate: this.data.gst_rate,
    //     mrp: this.data.mrp,
    //     image_filename: this.data.image_filename,
    //     saving:
    //       this.orderQty * this.data.mrp - this.orderQty * this.data.rate
    //   });
    // },
    // increment() {
    //   this.orderQty++;
    //   //message is showing add even in decrement so keept it sepratee
    //   //this.setQuantity();
    //   this.addProductToCart({
    //     product_id: this.data.product_id,
    //     category_id: this.data.category_id,
    //     product_name: this.data.product_name,
    //     category_name: this.data.category_name,
    //     rate: this.data.rate,
    //     quantity: this.orderQty,
    //     amount: this.orderQty * this.data.rate,
    //     gst_rate: this.data.gst_rate,
    //     mrp: this.data.mrp,
    //     image_filename: this.data.image_filename,
    //     saving:
    //       this.orderQty * this.data.mrp - this.orderQty * this.data.rate
    //   });
    // },
    // decrement() {
    //   this.orderQty--;
    //   //message is showing add even in decrement so keept it sepratee
    //   //this.setQuantity();
    //   this.updateProductQuantity({
    //     product_id: this.data.product_id,
    //     product_name: this.data.product_name,
    //     quantity: this.orderQty,
    //     amount: this.orderQty * this.data.rate,
    //     saving:
    //       this.orderQty * this.data.mrp - this.orderQty * this.data.rate,
    //     message: false
    //   });
    // }
  },
  computed: {
    //...mapState(['cart']),
    ...mapGetters('cart', ['findItemInCart']),
    setHeigh() {
      return this.horizontal ? '116px' : '300px';
    }
  },
  mounted() {
    let cartItem = this.findItemInCart(this.data.product_id);
    if (cartItem) {
      this.orderQty = cartItem.quantity;
    }
  }
};
</script>

<style lang="sass" scoped>
::v-deep .custom-control
  & .q-field__control
    padding: 0

  input
    text-align: center
</style>
