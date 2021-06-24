<template>
  <q-table title="Treats" :data="lists" hide-header row-key="name" grid>
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
      <!-- <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-6"> -->
      <div :class="getClass">
        <q-card>
          <q-card-section :horizontal="horizontal">
            <q-img
              class="col-4"
              spinner-color="primary"
              spinner-size="82px"
              :src="props.row.image_filename"
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

            <q-card-section v-if="horizontal" class="col-8">
              <!-- <q-card-action> -->
              <q-item-section>
                <q-item class="text-h6 ellipsis-2-lines text-grey-10">
                  {{ props.row.product_name }}
                </q-item>

                <q-item
                  ><q-rating
                    v-model="stars"
                    color="orange"
                    :max="5"
                    readonly
                    size="17px"
                  ></q-rating
                ></q-item>
                <q-item><span class="veg-food"></span></q-item>
              </q-item-section>

              <q-item-section>
                <q-item>
                  <div class="text-h6 text-grey-6 text-weight-bolder">
                    MRP&nbsp;&nbsp;
                  </div>
                  <span class="text-h6 text-strike"> ₹{{ props.row.mrp }}</span>
                </q-item>
                <q-item class="text-h6 text-weight-bolder text-green-6">
                  <div>
                    Our Price&nbsp;&nbsp;
                  </div>
                  <span>₹{{ props.row.rate }}</span>
                </q-item>
                <q-item class="text-h6 text-orange-6 text-weight-bolder">
                  <div>
                    Saving&nbsp;&nbsp;
                  </div>
                  <span>20% off</span>
                </q-item>
              </q-item-section>
              <!-- </q-card-action> -->
            </q-card-section>

            <!-- vertical card Begin -->
            <q-card-section v-if="!horizontal">
              <div class="text-h6 ellipsis-2-lines text-grey-10">
                {{ props.row.product_name }}
              </div>

              <q-rating
                v-model="stars"
                color="orange"
                :max="5"
                readonly
                size="17px"
              ></q-rating>
              <div class="text-caption text-green-8 text-weight-bolder">
                Special Price
              </div>
              <span class="text-h6">₹{{ props.row.rate }}</span
              ><span
                class="q-ml-sm text-grey-6"
                style="text-decoration: line-through"
                >₹{{ props.row.mrp }}</span
              >
            </q-card-section>
            <!-- vertical card End Here-->
          </q-card-section>

          <q-card-section>
            <q-card-action class="row wrap">
              <q-select dense outline v-model="variety" :options="options" />
              <q-space />
              <q-btn color="green" icon="shopping_cart" label="Add to Cart" />
            </q-card-action>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script>
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';

export default {
  data() {
    return {
      stars: 4,
      mode: 'list',
      horizontal: false,
      loading: true,
      class_val: 'shadow-1 my-card',
      lists: [],
      variety: 1,
      options: [1, 2, 3]
    };
  },
  computed: {
    getSize() {
      return this.horizontal ? '30%' : '400px';
    },
    getClass() {
      return (
        'q-pa-xs col-xs-12 col-sm-12 ' +
        (!!this.horizontal ? 'hr col-lg-6 col-md-6' : 'vr col-lg-3 col-md-4')
      );
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
.veg-food
  border : 1px solid #6dad5c
  font-size: 8px
  display: inline-block
  width: 18px
  height: 17px !important
</style>
