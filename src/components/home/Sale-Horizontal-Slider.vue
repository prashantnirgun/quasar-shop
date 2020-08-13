<template>
  <div class="q-ma-lg">
    <!-- <div class="q-pl-md bg-green-13 rounded-borders">
      <span class="text-grey-9 text-h6 text-weight-bold">Sale</span>
      <a class="text-primary q-ml-sm cursor-pointer">[see all]</a>
    </div> -->

    <q-ribbon
      position="left"
      color="#000000"
      background-color="#a2e320"
      leaf-position="top"
      glow
      size="full"
    >
      Sales Ends on : 15th Aguust 2020 12:00 PM
    </q-ribbon>

    <q-carousel
      v-model="latest_slide"
      ref="sale_carousel"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      infinite
      height="350px"
    >
      <q-carousel-slide
        v-for="(rows, index) in lists"
        :name="index"
        :key="index"
      >
        <div class="row justify-evenly items-center no-wrap">
          <q-card
            v-for="row in rows"
            :key="row.product_id"
            class="q-mx-xs  bg-green-13 rounded-borders hover_border_grey text-center cursor-pointer"
            @click="$router.push(`/product-details/${row.product_id}`)"
          >
            <q-item>
              <q-item-section>
                <q-item-label>{{ row.product_name }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-img
              class="rounded-borders cursor-pointer"
              :src="row.image_filename"
              :height="getSize"
              :width="getSize"
              placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
            />

            <!-- <div>{{ row.product_name }}</div> 
            <div class="text-caption text-weight-bold text-green">
              {{ row.product_name }}
            </div>
            <div>
              <span>₹{{ row.sale_rate }}</span
              ><span
                class="q-ml-sm text-grey-6"
                style="text-decoration: line-through"
                >₹{{ row.mrp }}</span
              >
            </div>
            -->

            <q-item>
              <q-item-section>
                <q-item-label
                  >{{ row.sale_rate | currency
                  }}<span
                    class="q-ml-sm text-blue-6"
                    style="text-decoration: line-through"
                    >{{ row.mrp | currency }}</span
                  ></q-item-label
                >
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </q-carousel-slide>

      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
          class="q-gutter-xs"
        >
          <q-btn
            push
            round
            dense
            color="orange"
            text-color="black"
            icon="arrow_left"
            @click="$refs.sale_carousel.previous()"
          />
          <q-btn
            push
            round
            dense
            color="orange"
            text-color="black"
            icon="arrow_right"
            @click="$refs.sale_carousel.next()"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>
<script>
import array from 'src/mixins/array_mixin';
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';
export default {
  props: ['device'],
  mixins: [array, device_mixin],
  data() {
    return {
      latest_slide: 1,
      lists: [],
      column: 1
    };
  },
  computed: {
    getSize() {
      return this.column === 2 ? '180px' : '200px';
    }
  },
  mounted() {
    this.column = parseInt(this.displaySize);
    console.log('column =>', this.column);
    DataService.get('data/productSale.json')
      .then(response => {
        if (this.column < response.data.length) {
          this.lists = this.chunk(response.data, this.column);
        } else {
          this.lists = response.data;
        }
      })
      .catch(error => {
        console.log('mixin/ddlb Error', error);
      });
  }
};
</script>
