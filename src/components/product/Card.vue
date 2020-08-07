<template>
  <q-card class="" transition-show="“flip-up”" transition-hide="“flip-down”">
    <!-- <div class="row">

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
          <div class="col-6">
            <q-rating
              v-model="stars"
              color="orange"
              :max="5"
              readonly
              size="17px"
            ></q-rating>
          </div>
          <div class="col-3 text-grey-10">MRP</div>
          <div class="col-3 text-strike text-right q-pr-sm">
            {{ data.mrp }}
          </div>
        </div>
        <div :class="[!horizontal ? 'hidden' : 'row']">
          <div class="col-6"></div>
          <div class="col-3 text-green text-bold">Our Price</div>
          <div class="col-3 text-right text-green text-bold q-pr-sm">
            {{ data.sale_rate }}
          </div>
        </div>
        <div :class="[!horizontal ? 'hidden' : 'row']">
          <div class="col-6"></div>
          <div class="col-3">Saving</div>
          <div class="col-3 text-right q-pr-sm">22% off</div>
        </div>
      </div>
    </div>
    <div :class="['row', 'q-pa-sm', { hidden: horizontal }]">
      <div class="col-12"></div>
    </div>

    <div class="row q-pa-sm items-evenly">
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
        class="text-weight-bold col-4"
        dense
        color="positive"
        icon="add_shopping_cart"
        label="Add"
      />
    </div> -->
    <card-info :data="current" :horizontal="horizontal" />
    <div class="bg-grey-4">
      <card-options
        :data="data.children"
        @updatedItem="runme"
        v-if="data.children.length > 1"
      />
    </div>
    <!-- <div class="row wrap justify-start q-pa-sm q-gutter-sm">
      <q-btn dense color="green" unelevated label="1.5 KG" />
      <q-btn dense outline label="5 KG" />
      <q-btn dense outline unelevated label="15 KG" />
    </div> -->
  </q-card>
</template>
<script>
import device_mixin from 'src/mixins/device_mixin';
export default {
  props: ['data', 'horizontal'],
  mixins: [device_mixin],
  components: {
    'card-info': () => import('./Card_info'),
    'card-options': () => import('./Card_options')
  },
  data() {
    return {
      current: {}
    };
  },
  methods: {
    runme(item) {
      this.current = item;
      console.log('item recieved', item.product_id, this.current.product_id);
    }
  },
  mounted() {
    this.current = this.data;
    //console.log('data', this.data);
  }
};
</script>
