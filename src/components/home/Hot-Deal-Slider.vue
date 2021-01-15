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
      arrows
      swipeable
      animated
      infinite
      :height="isDesktop ? '312px' : '280px'"
      class="text-blue rounded-borders"
      control-text-color="blue"
    >
      <q-carousel-slide
        :name="index"
        class="row wrap justify-evenly items-start  q-pa-none"
        v-for="(slides, index) in lists"
        :key="index"
      >
        <div
          v-for="row in slides"
          :key="row.product_id"
          class="col-lg-2 col-md-2 col-xs-6 col-sm-6 "
        >
          <div class="q-ma-xs">
            <q-card
              class="rounded-borders  text-center cursor-pointer my-card"
              @click="$router.push(`/product/${row.slug}`)"
            >
              <q-img
                class="rounded-borders"
                :src="row.image_filename"
                :height="getSize"
                :width="getSize"
                transition="scale"
                placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
                :alt="row.alternative_text"
              >
                <q-badge class="content-start transparent  rotate-45">
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

              <q-item class="no-padding no-margin">
                <q-item-section>
                  <q-item-label class="ellipsis-2-lines">{{
                    row.product_name
                  }}</q-item-label>

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
                    >{{ row.rate | currency
                    }}<span
                      class="q-ml-sm text-black"
                      style="text-decoration: line-through"
                      >{{ row.mrp | currency }}</span
                    ></q-item-label
                  >
                  <q-item-label class="text-red q-mb-xs">
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

      <!-- <template v-slot:control>
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
      </template> -->
    </q-carousel>
  </div>
</template>
<script>
import array from 'src/mixins/array_mixin';
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';
import { mapActions } from 'vuex';

export default {
  props: ['device'],
  mixins: [array, device_mixin],
  data() {
    return {
      latest_slide: 0,
      lists: [],
      column: 1,
      page: 1,
      pages: [],
      offset: 0
    };
  },
  computed: {
    getSize() {
      return this.column === 2 ? '160px' : '200px';
    }
  },
  methods: {
    ...mapActions(['updateSidebar']),
    // goToPage(direction) {
    //   if (direction === 'next') {
    //     this.page = this.pages > this.page ? this.page + 1 : 1;
    //   } else {
    //     this.page = this.page > 1 ? this.page - 1 : this.pages;
    //   }
    //   this.offset = this.page === 1 ? 0 : (this.page - 1) * this.column;

    //   this.getData();
    // },
    getData() {
      DataService.get(`slider?where=tag like {Hot Deals}&total_rows=true`)
        .then(response => {
          const counter = parseInt(response.data.total_rows / this.column - 1);
          this.pages = [...Array(counter).keys()];
          this.lists = this.chunk(response.data.rows, this.column);
          const option = response.data.rows.map(item => {
            return {
              label: item.product_name,
              to: '/product/' + item.slug,
              level: 0,
              icon: 'label_important'
            };
          });

          //console.log('hot-deal data', this.lists, option);
          this.updateSidebar({
            label: 'Hot Deal',
            list: option,
            icon: 'card_giftcard'
          });
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

<style lang="sass" scoped>
.my-card
  box-shadow: none
  &:hover
    box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12) !important;
</style>
