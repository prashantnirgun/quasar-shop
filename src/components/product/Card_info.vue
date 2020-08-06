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
          :height="[horizontal ? '116px' : '300px']"
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
        dense
        v-model="orderQty"
        outlined
        mask="#####"
        color="green"
        class="col-4 q-pa-none q-ma-none"
      >
        <template v-slot:prepend class="q-pa-none q-ma-none">
          <q-icon
            name="add_box"
            @click="increment"
            class="text-green q-pa-none q-ma-none"
            size="md"
          />
        </template>
        <template v-slot:append>
          <q-icon
            name="indeterminate_check_box"
            @click="decrement"
            class="text-green"
            size="md"
          />
        </template>
      </q-input>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data', 'horizontal'],

  data() {
    return {
      stars: 4,
      orderQty: 0
    };
  },
  methods: {
    increment() {
      this.orderQty++;
    },
    decrement() {
      this.orderQty--;
    }
  }
};
</script>
