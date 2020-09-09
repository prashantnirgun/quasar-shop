<template>
  <div class="col-12 q-mt-sm">
    <!-- <q-ribbon
      position="left"
      color="#ffffff"
      background-color="#027BE3"
      leaf-position="top"
      size="full"
    >
      Sales
    </q-ribbon> -->
    <div class="" style="color: #1f509e;">
      Hot Deal
    </div>
    <q-carousel
      v-model="latest_slide"
      ref="sale_carousel"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="primary"
      infinite
      height="312px"
    >
      <q-carousel-slide name="one" class="q-pa-none">
        <div class="row justify-evenly items-center no-wrap">
          <q-card
            v-for="row in lists"
            :key="row.product_id"
            class="q-mx-xs rounded-borders hover_border_grey text-center cursor-pointer"
            @click="$router.push(`/product/${row.slug}`)"
          >
            <!-- <q-item>
              <q-item-section>
                <q-item-label>{{ row.product_name }}</q-item-label>
              </q-item-section>
            </q-item> -->

            <q-img
              class="rounded-borders cursor-pointer"
              :src="row.image_filename"
              :height="getSize"
              :width="getSize"
              transition="scale"
              placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
              :alt="row.alternative_text"
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
                <q-item-label>{{ row.product_name }}</q-item-label>
                <!-- </q-item-section>
            </q-item>

            <q-item>
              <q-item-section> -->

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

                <q-item-label class="text-green-6"
                  >{{ row.sale_rate | currency
                  }}<span
                    class="q-ml-sm text-black"
                    style="text-decoration: line-through"
                    >{{ row.mrp | currency }}</span
                  ></q-item-label
                >
                <q-item-label class="text-red">
                  <countdown :end-time="new Date('2020-09-30')">
                    <template v-slot:process="anyYouWantedScopName">
                      <span :class="{ 'text-caption': isMobile }">
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

      <!-- <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn
          size="lg"
          icon="home"
          color="yellow"
          flat
          round
          dense
          @click="goToPage('previous')"
        />
        {{ btnProps }}
        {{ onClick }}
        <q-btn
          size="sm"
          :icon="btnProps.icon"
          color="white"
          flat
          round
          dense
          @click="goToPage('next')"
        />
      </template> -->

      <template v-slot:control>
        <q-carousel-control position="bottom-left" :offset="[8, 160]">
          <q-btn
            round
            text-color="blue"
            icon="chevron_left"
            @click="goToPage('previous')"
          />
        </q-carousel-control>

        <q-carousel-control position="bottom-right" :offset="[8, 160]">
          <q-btn
            round
            text-color="blue"
            icon="chevron_right"
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
      this.offset = this.page === 1 ? 0 : (this.page - 1) * this.column;
      // console.log(
      //   'go to/',
      //   direction,
      //   'limit',
      //   this.column,
      //   'offset',
      //   this.offset,
      //   'page',
      //   this.page
      // );
      this.getData();
    },
    getData() {
      DataService.get(
        `slider?limit=${this.column}&offset=${this.offset}&where=tag like {Sale}&total_rows=true`
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
    //console.log('No of column', this.column);
    this.getData();
  }
};
</script>

<style lang="sass" scoped></style>
