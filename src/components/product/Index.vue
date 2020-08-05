<template>
  <q-table
    :data="lists"
    hide-header
    row-key="name"
    grid
    hide-bottom
    :pagination="initialPagination"
  >
    <template v-slot:top>
      <q-chip color="primary" text-color="white" size="md" class="q-py-md">
        <q-avatar color="black" text-color="white" class="text-bold">
          {{ totalProducts }}
        </q-avatar>
        {{ categoryName }}
      </q-chip>
      <q-chip
        v-if="isDesktop"
        size="md"
        class="q-py-md"
        removable
        v-model="eclair"
        color="teal"
        text-color="white"
        icon="bookmark"
      >
        Hot Deals
      </q-chip>

      <q-space />
      <q-btn-group rounded>
        <q-btn
          dense
          rounded
          color="primary"
          icon="list"
          @click="horizontal = true"
        />

        <q-btn
          dense
          rounded
          color="primary"
          icon="grid_on"
          @click="horizontal = false"
        />

        <q-btn dense rounded color="primary" icon="filter_alt" />

        <q-btn-dropdown dense auto-close rounded color="primary" icon="sort">
          <!-- dropdown content goes here -->
          <q-list
            dense
            bordered
            padding
            class="rounded-borders"
            style="width: 200px"
          >
            <q-item>
              <q-item-section>
                <q-toggle
                  dense
                  left-label
                  color="blue"
                  label="Price Low to High"
                  v-model="selection"
                  val="blue"
                  checked-icon="check"
                  unchecked-icon="clear"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-toggle
                  dense
                  left-label
                  color="blue"
                  label="Price High to Low"
                  v-model="selection"
                  val="blue"
                  checked-icon="check"
                  unchecked-icon="clear"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-toggle
                  dense
                  left-label
                  color="blue"
                  label="Popularity"
                  v-model="selection"
                  val="blue"
                  checked-icon="check"
                  unchecked-icon="clear"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-toggle
                  dense
                  left-label
                  color="blue"
                  label="Saving Low to High"
                  v-model="selection"
                  val="blue"
                  checked-icon="check"
                  unchecked-icon="clear"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-toggle
                  dense
                  left-label
                  color="blue"
                  label="Saving High to Low"
                  v-model="selection"
                  val="blue"
                  checked-icon="check"
                  unchecked-icon="clear"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-toggle
                  dense
                  left-label
                  color="blue"
                  label="Price Low to High"
                  v-model="selection"
                  val="blue"
                  checked-icon="check"
                  unchecked-icon="clear"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-btn-group>
    </template>
    <template v-slot:item="props">
      <div :class="outer">
        <card :data="props.row" :horizontal="horizontal" />
        <!-- <q-card
          class=""
          transition-show="“flip-up”"
          transition-hide="“flip-down”"
        >
          <div class="row">
            <div
              @click="$router.push(`/product-details/${props.row.product_id}`)"
              class="cursor-pointer"
              :class="[
                horizontal ? 'col-4' : 'col-12',
                'row',
                'items-center',
                'justify-center'
              ]"
            >
              <q-img
                :src="props.row.image_filename"
                spinner-color="primary"
                spinner-size="82px"
                placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
              >
                <q-badge
                  v-if="!horizontal && props.row.tag"
                  class="transparent no-margin no-padding"
                >
                  <q-chip icon="star" color="yellow" text-color="black">{{
                    props.row.tag
                  }}</q-chip>
                </q-badge>
              </q-img>
            </div>

            <div :class="[horizontal ? 'col-8' : 'col-12']">
              <div class="q-pa-sm text-h6">
                {{ props.row.product_name }}
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
                  {{ props.row.mrp }}
                </div>
              </div>
              <div :class="[!horizontal ? 'hidden' : 'row']">
                <div class="col-6">
                  
                </div>
                <div class="col-3 text-green text-bold">Our Price</div>
                <div class="col-3 text-right text-green text-bold q-pr-sm">
                  {{ props.row.sale_rate }}
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
            <div class="col-12">
             
            </div>
            
          </div>

          <div class="row q-pa-sm items-evenly">
            <q-rating
              v-if="props.row.product_id % 2 === 0"
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
                >{{ props.row.tag }}</q-chip
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
          </div>

          <div class="row wrap justify-start q-pa-sm q-gutter-sm">
            <q-btn dense color="green" unelevated label="1.5 KG" />
            <q-btn dense outline label="5 KG" />
            <q-btn dense outline unelevated label="15 KG" />
          </div>
        </q-card> -->
      </div>
    </template>
  </q-table>
</template>

<script>
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';

export default {
  mixins: [device_mixin],
  components: {
    card: () => import('./Card')
  },
  data() {
    return {
      eclair: true,
      selection: [],

      mode: 'grid',
      horizontal: this.isMobile ? true : false,
      loading: true,
      lists: [],
      variety: 1,
      qty: 1,
      //options: [1, 2, 3],
      totalProducts: 0,
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
      //console.log('class', this.isDesktop, this.horizontal, c);
      return c;
    },
    categoryName() {
      return this.lists.length > 0
        ? `${this.lists[0].category_name}`
        : 'Category';
    }
  },
  mounted() {
    const category_id = parseInt(this.$route.params.category_id);
    this.horizontal = !!this.isMobile;
    //console.log('Is Mobile ?', this.isMobile);
    //console.log('horizontal ?', this.horizontal);
    //console.time('Timer name');
    DataService.get('data/product.json')
      .then(response => {
        response = response.data.filter(
          row => parseInt(row.category_id) === category_id

          // && parseInt(row.primary_product_id) === 0
        );
        this.loading = false;
        let data = [];
        this.totalProducts = response.length;
        response.map(row => {
          if (row.primary_product_id === 0) {
            let found = data.filter(
              record => record.product_id === row.primary_product_id
            );

            if (found.length === 0) {
              row.children = [row];
              //console.log('row beore insert', row);
              data.push(row);
            }
          } else {
            //sub product then find the key
            let found = data.filter(
              record => record.product_id === row.primary_product_id
            );
            //console.log('else/found', found, found.length);
            if (found.length === 0) {
              let c = { product_id: row.primary_product_id, children: [row] };
              data.push(c);
            } else {
              //console.log('row before inserting children', row, found);
              //!!found.children ? null : (found.children = []);
              found[0].children.push(row);
            }
          }
        });
        //this.$q.loading.hide();
        //console.log('data', response, data);
        this.lists = data;
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
</style>
