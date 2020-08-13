<template>
  <div class="q-mx-lg">
    <q-ribbon
      position="left"
      color="#000000"
      background-color="#e3df02"
      leaf-position="bottom"
      size="full"
      glow
    >
      New Arrivals
    </q-ribbon>
    <!-- <div> -->
    <q-carousel
      v-model="latest_slide"
      ref="new_arival_carousel"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
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
            class="q-ma-sm bg-yellow-5 rounded-borders hover_border_grey text-center cursor-pointer"
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

            <!-- <div>{{ row.product_name }}</div> -->

            <!-- <div>
              <span>₹{{ row.sale_rate }}</span
              ><span
                class="q-ml-sm text-grey-6"
                style="text-decoration: line-through"
                >₹{{ row.mrp }}</span
              >
            </div> -->

            <q-item>
              <q-item-section>
                <q-item-label
                  >{{ row.sale_rate | currency
                  }}<span
                    class="q-ml-sm text-grey-6"
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
            @click="$refs.new_arival_carousel.previous()"
          />
          <q-btn
            push
            round
            dense
            color="orange"
            text-color="black"
            icon="arrow_right"
            @click="$refs.new_arival_carousel.next()"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
  <!-- </div> -->
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
  methods: {
    // displaySize() {
    //   const width = this.$q.screen.width;
    //   switch (true) {
    //     case width <= 320:
    //       this.column = 1;
    //       return this.column;
    //       break;
    //     case width <= 375:
    //       this.column = 1;
    //       return this.column;
    //       break;
    //     case width >= 640 && width <= 768:
    //       this.column = 2;
    //       return this.column;
    //       break;
    //     case width <= 1024:
    //       this.column = 4;
    //       return this.column;
    //       break;
    //     default:
    //       this.column = 6;
    //       return this.column;
    //       break;
    //   }
    // }
  },
  mounted() {
    this.column = parseInt(this.displaySize);
    DataService.get('data/newArrival.json')
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
<style lang="sass" scoped></style>
