<template>
  <div class="col-12 q-mt-sm">
    <!-- <q-ribbon
      position="left"
      color="#000000"
      background-color="#e3df02"
      leaf-position="bottom"
      size="full"
    >
      New Arrivals
    </q-ribbon> -->
    <!-- <div> -->
    <div class="" style="color: #1f509e;">
      New Arrival
    </div>

    <q-carousel
      v-model="latest_slide"
      ref="new_arival_carousel"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      infinite
      height="290px"
    >
      <q-carousel-slide name="one" class="q-pa-none">
        <div class="row justify-evenly items-center no-wrap">
          <q-card
            v-for="row in lists"
            :key="row.product_id"
            class="q-ma-xs rounded-borders hover_border_grey text-center cursor-pointer"
            @click="$router.push(`/product/${row.slug}`)"
          >
            <q-img
              class="rounded-borders cursor-pointer"
              :src="row.image_filename"
              :height="getSize"
              :width="getSize"
              transition="scale"
              placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
              :alt="row.alternative_text"
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
                <q-item-label>{{ row.product_name }}</q-item-label>
                <!-- </q-item-section>
            </q-item>
            <q-item> 
              <q-item-section>-->
                <q-item-label>
                  <q-rating
                    v-model="row.rating"
                    max="5"
                    size="1.2em"
                    color="orange"
                    icon="star_border"
                    icon-selected="star"
                    icon-half="star_half"
                    no-dimming
                    readonly
                  />
                </q-item-label>
                <!-- </q-item-section>
            </q-item>

            <q-item class="q-ma-none">
              <q-item-section class="q-ma-none"> -->
                <q-item-label class="text-green-6"
                  >{{ row.sale_rate | currency
                  }}<span
                    class="q-ml-sm text-black"
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
          position="bottom-left"
          :offset="[5, 160]"
          class="q-gutter-xs"
        >
          <q-btn
            round
            text-color="blue"
            icon="arrow_left"
            @click="goToPage('previous')"
          />
        </q-carousel-control>

        <q-carousel-control
          position="bottom-right"
          :offset="[10, 160]"
          class="q-gutter-xs"
        >
          <q-btn
            round
            text-color="blue"
            icon="arrow_right"
            @click="goToPage('next')"
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
      latest_slide: 'one',
      lists: [],
      column: 1,
      page: 1,
      pages: 0,
      offset: 0
    };
  },
  computed: {
    getSize() {
      return this.column === 2 ? '180px' : '200px';
    }
  },
  methods: {
    goToPage(direction) {
      if (direction === 'next') {
        this.page = this.pages > this.page ? this.page + 1 : 1;
      } else {
        this.page = this.page > 1 ? this.page - 1 : this.pages;
      }
      this.offset = this.page * this.column;
      this.getData();
    },
    getData() {
      DataService.get(
        `slider?limit=${this.column}&offset=${this.offset}where: tag like {New}&total_rows=true`
      )
        .then(response => {
          this.lists = response.data.rows;
          this.pages = response.data.total_rows / this.column;
        })
        .catch(error => {
          console.log('mixin/ddlb Error', error);
        });
    }
  },
  created() {
    this.column = parseInt(this.displaySize);
    this.getData();
  }
};
</script>
<style lang="sass" scoped></style>
