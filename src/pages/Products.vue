<template>
  <q-table
    title="Treats"
    :data="lists"
    hide-header
    row-key="name"
    grid
    hide-bottom
    :pagination="initialPagination"
  >
    <template v-slot:top="props">
      <q-btn
        flat
        round
        dense
        :icon="horizontal ? 'list' : 'grid_on'"
        @click="horizontal = !horizontal"
        v-if="!props.inFullscreen"
      >
      </q-btn>
    </template>
    <template v-slot:item="props">
      <!-- <div class="col-xs-12 col-sm-6 col-md-3 q-pa-xs"> -->
      <div :class="outer">
        <q-card
          @click="$router.push(`/product-details/${props.row.product_id}`)"
          class="cursor-pointer shadow-8"
          transition-show="“flip-up”"
          transition-hide="“flip-down”"
        >
          <div class="row">
            <div
              :class="[
                horizontal ? 'col-4' : 'col-12',
                { 'q-pt-md': !!horizontal }
              ]"
            >
              <q-img
                :src="props.row.image_filename"
                spinner-color="primary"
                spinner-size="82px"
                placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
              />
            </div>

            <div :class="[horizontal ? 'col-8' : 'col-12']">
              <div class="q-pa-sm">
                {{ props.row.product_name }}
              </div>
              <div :class="[!horizontal ? 'hidden' : 'row']">
                <div class="col-4">
                  <q-rating
                    class="col"
                    v-model="stars"
                    color="orange"
                    :max="5"
                    readonly
                    size="17px"
                  ></q-rating>
                </div>
                <div class="col-4">MRP</div>
                <div class="col-4">{{ props.row.mrp }}</div>
              </div>
              <div :class="[!horizontal ? 'hidden' : 'row']">
                <div class="col-4"></div>
                <div class="col-4">Our Price</div>
                <div class="col-4">{{ props.row.sale_rate }}</div>
              </div>
              <div :class="[!horizontal ? 'hidden' : 'row']">
                <div class="col-4"></div>
                <div class="col-4">Saving</div>
                <div class="col-4">22% off</div>
              </div>
              <div :class="[{ hidden: !horizontal }, 'row', 'q-pa-sm']">
                <div class="col-6">Size</div>
                <q-btn
                  class="col-6 text-weight-bold text-capitalize"
                  dense
                  color="positive"
                >
                  Add to Cart
                </q-btn>
              </div>
            </div>
          </div>
          <div :class="['row', 'q-pa-sm', { hidden: horizontal }]">
            <div class="col-12">
              <q-rating
                class="col"
                v-model="stars"
                color="orange"
                :max="5"
                readonly
                size="17px"
              ></q-rating>
            </div>
            <div class="col-6">Size</div>
            <q-btn
              class="col-6 text-weight-bold text-capitalize"
              dense
              color="positive"
            >
              Add to Cart
            </q-btn>
          </div>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script>
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';

export default {
  mixins: [device_mixin],
  data() {
    return {
      stars: 4,
      mode: 'grid',
      horizontal: false,
      loading: true,
      lists: [],
      variety: 1,
      options: [1, 2, 3],
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 2,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      }
    };
  },
  computed: {
    outer() {
      let c =
        'outer col-xs-12 col-sm-6 q-pa-xs ' +
        (!!this.horizontal ? 'hr col-lg-4 col-md-4' : 'vr col-lg-3 col-md-3');
      // 'outer ' +
      // (!!this.isDesktop ? (!!this.horizontal ? 'col-3' : 'col-3') : 'col-12');
      console.log('class', this.isDesktop, this.horizontal, c);
      return c;
    }
  },
  mounted() {
    const category_id = parseInt(this.$route.params.category_id);
    //this.$q.loading.show();
    //console.time('Timer name');
    DataService.get('data/product.json')
      .then(response => {
        this.lists = response.data.filter(
          row => parseInt(row.category_id) === category_id

          // && parseInt(row.primary_product_id) === 0
        );
        this.loading = false;
        //this.$q.loading.hide();
        console.log('data', this.lists);
        //console.timeEnd('Timer name');
      })
      .catch(error => {
        console.log('DataService.get Error', error);
      });
  }
};
</script>

<style lang="sass" scoped>

img
    max-width: 100%
    max-height: 100%

.q-table__grid-content row q-gutter-xs
  q-gutter-sm : true
</style>
