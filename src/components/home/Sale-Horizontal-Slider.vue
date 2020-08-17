<template>
  <div class="col-12 q-pa-md">
    <q-ribbon
      position="left"
      color="#ffffff"
      background-color="#027BE3"
      leaf-position="top"
      size="full"
    >
      Sales
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
      <q-carousel-slide name="one">
        <div class="row justify-evenly items-center no-wrap">
          <q-card
            v-for="row in lists"
            :key="row.product_id"
            class="q-mx-xs bg-green-13 rounded-borders hover_border_grey text-center cursor-pointer"
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
              transition="scale"
              placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
            >
              <q-badge class="content-start transparent no-margin no-padding">
                <q-chip
                  size="12px"
                  color="primary"
                  text-color="white"
                  icon="thumb_up"
                >
                  {{ row.saving }} % off
                </q-chip>
              </q-badge>
            </q-img>

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
                <q-item-label class="text-deep-purple">
                  <countdown :end-time="new Date('2020-08-15')">
                    <template v-slot:process="anyYouWantedScopName">
                      <span>
                        {{
                          `Day : ${anyYouWantedScopName.timeObj.d}
           Time : ${anyYouWantedScopName.timeObj.h} :
            ${anyYouWantedScopName.timeObj.m} :
           ${anyYouWantedScopName.timeObj.s}`
                        }}</span
                      >
                    </template>
                    <template v-slot:finish>
                      <span>Done!</span>
                    </template>
                  </countdown>
                </q-item-label>
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
            @click="goToPage('previous')"
          />
          <q-btn
            push
            round
            dense
            color="orange"
            text-color="black"
            icon="arrow_right"
            @click="goToPage('next')"
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
      console.log('go to/', direction, this.page, this.offset, this.pages);
      this.getData();
    },
    getData() {
      DataService.get(
        `slider?limit=${this.column}&offset=${this.offset}where: tag like {Sale}&total_rows=true`
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
