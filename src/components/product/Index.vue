<template>
  <div>
    <div class="row bg-white">
      <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
        <div class="">
          <img :src="data.image_filename" :height="getSize" :width="getSize" />

          <!-- <q-carousel swipeable animated v-model="slide" thumbnails infinite>
            <q-carousel-slide
              :name="1"
              :img-src="data.image_filename"
              style="height: 400px; width: 400px"
            />

            <q-carousel-slide
              :name="2"
              img-src="https://placeimg.com/500/300/nature"
            />
            <q-carousel-slide
              :name="3"
              img-src="https://cdn.quasar.dev/img/parallax2.jpg"
            />
            <q-carousel-slide
              :name="4"
              img-src="https://cdn.quasar.dev/img/quasar.jpg"
            />
          </q-carousel> -->
        </div>
      </div>

      <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
        <div class="row">
          <div
            class="col-lg-7 col-md-7 col-sm-12 col-xs-12"
            :class="$q.platform.is.desktop ? '' : 'q-px-md'"
          >
            <div class="text-h5 q-mt-sm q-pt-xs">
              {{ data.product_name }}
            </div>
            <div>
              <q-chip
                size="10px"
                class="text-weight-bold q-px-xs"
                square
                color="green-7"
                text-color="white"
                icon-right="star"
              >
                {{ data.rating }}
              </q-chip>
              <span class="text-caption text-weight-bold text-grey-6"
                >6 Ratings & 2 Reviews</span
              >
            </div>
            <div>
              <div class="text-caption text-green-8 text-weight-bolder q-mt-sm">
                Special Price
              </div>
              <span class="text-h6">{{ data.rate | currency }}</span
              ><span
                class="q-ml-sm text-subtitle1"
                style="text-decoration: line-through"
                >{{ data.mrp | currency }}</span
              >
              <span class="q-ml-md text-subtitle1 text-red q-mt-md"
                >{{
                  orderQty > 0
                    ? data.mrp * orderQty - data.rate * orderQty
                    : (data.mrp - data.rate) | currency
                }}
                Saving</span
              >
            </div>
            <div class="q-mt-sm text-weight-bold">
              Offers
              <ul class="q-pl-sm text-caption" style="list-style-type: none">
                <li class="q-mt-xs">
                  <span class="text-weight-bold">Bank Offer</span> 5% Limited
                  Cashback on Axis Bank Credit Card
                  <a class="text-primary text-weight-bolder">T&C</a>
                </li>
                <li class="q-mt-xs">
                  <span class="text-weight-bold">Lucky Draw</span>
                  Every month for customer who purchase more than Rs 2,000/-
                  <a class="text-primary text-weight-bolder">T&C</a>
                </li>
                <li class="q-mt-xs">
                  <span class="text-weight-bold">Redeem Points</span> Every
                  purchase you earned some points that you can encash on
                  selected products.
                  <a class="text-primary text-weight-bolder">T&C</a>
                </li>
              </ul>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle1 text-green-8 text-weight-bold">
                In stock.
              </div>
              <div class="text-caption q-mt-sm text-grey-8 text-weight-bold">
                Delivery by:
                <span class="text-black">{{ regularDelivery }} </span>
              </div>
              <div
                class="text-caption text-subtitle2 text-grey-8 text-weight-bold"
              >
                Fastest delivery:
                <span class="text-black">{{ fastDelivery }} </span>
              </div>
            </div>

            <div class="q-mt-md row">
              <q-btn
                v-if="orderQty === 0"
                class="q-ma-sm"
                color="green-6"
                icon="shopping_cart"
                label="Add to cart"
                @click="increment(data, ++orderQty)"
              />

              <q-input
                v-else
                v-model.number="orderQty"
                color="green-6"
                style="width: 135px; height : 20px;"
                dense
                outlined
                class="custom-control q-mt-md"
                @blur="setQuantity(data, orderQty)"
              >
                <template v-slot:prepend>
                  <q-btn
                    @click="decrement(data, --orderQty)"
                    color="green-6"
                    icon="remove"
                    size="md"
                    round
                    unelevated
                    class="rounded-borders full-height"
                  />
                </template>

                <template v-slot:append>
                  <q-btn
                    @click="increment(data, ++orderQty)"
                    color="green-6"
                    icon="add"
                    size="md"
                    round
                    unelevated
                    class="rounded-borders full-height"
                  />
                </template>
              </q-input>

              <q-btn
                class="q-ma-sm"
                color="green-6"
                icon="shopping_cart"
                label="Buy now"
                :to="{ name: 'shopping-cart', params: { stage: 1 } }"
              />
            </div>
          </div>
          <div
            class="col-lg-5 col-md-5 col-sm-12 col-xs-12 q-mt-md q-pt-xs q-pl-lg"
          >
            <div class="text-subtitle2">Customer rating</div>
            <div class="text-h3">
              {{ data.rating }}
            </div>
            <div>
              <!-- todo : please remove the warning -->
              <q-rating
                v-model.number="data.rating"
                max="5"
                size="2em"
                color="orange"
                icon="star_border"
                icon-selected="star"
                icon-half="star_half"
                no-dimming
                readonly
              />
            </div>
            <div class="text-subtitle2 text-grey-8">(357 reviews)</div>
            <div class="text-subtitle2 text-grey-10 q-mt-sm">
              93% would recommend to a friend
            </div>

            <q-list dense bordered padding class="no-border q-mt-lg q-pr-xl">
              <q-item style="padding-left: 0 !important;" v-ripple>
                <span class="text-subtitle2 q-mr-xs">5</span>
                <q-icon name="star" size="1.5em" color="orange"></q-icon>
                <q-linear-progress
                  class="q-ml-sm  q-mr-sm"
                  style="margin-top: 5px;"
                  size="13px"
                  :value="rat_5"
                />
                <span
                  style="margin-top: 2px"
                  class="text-caption text-weight-bold text-grey-8"
                  >273</span
                >
              </q-item>
              <q-item style="padding-left: 0 !important;" v-ripple>
                <span class="text-subtitle2 q-mr-xs">4</span>
                <q-icon name="star" size="1.5em" color="orange"></q-icon>
                <q-linear-progress
                  class="q-ml-sm  q-mr-sm"
                  style="margin-top: 5px;"
                  size="13px"
                  :value="rat_4"
                />
                <span
                  style="margin-top: 2px"
                  class="text-caption text-weight-bold text-grey-8"
                  >&nbsp;&nbsp;69</span
                >
              </q-item>
              <q-item style="padding-left: 0 !important;" v-ripple>
                <span class="text-subtitle2 q-mr-xs">3</span>
                <q-icon name="star" size="1.5em" color="orange"></q-icon>
                <q-linear-progress
                  class="q-ml-sm  q-mr-sm"
                  style="margin-top: 5px;"
                  size="13px"
                  :value="rat_3"
                />
                <span
                  style="margin-top: 2px"
                  class="text-caption text-weight-bold text-grey-8"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6</span
                >
              </q-item>
              <q-item style="padding-left: 0 !important;" v-ripple>
                <span class="text-subtitle2 q-mr-xs">2</span>
                <q-icon name="star" size="1.5em" color="orange"></q-icon>
                <q-linear-progress
                  class="q-ml-sm  q-mr-sm"
                  style="margin-top: 5px;"
                  size="13px"
                  :value="rat_2"
                />
                <span
                  style="margin-top: 2px"
                  class="text-caption text-weight-bold text-grey-8"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3</span
                >
              </q-item>
              <q-item style="padding-left: 0 !important;" v-ripple>
                <span class="text-subtitle2 q-mr-xs">1</span>
                <q-icon name="star" size="1.5em" color="orange"></q-icon>
                <q-linear-progress
                  class="q-ml-sm  q-mr-sm"
                  style="margin-top: 5px;"
                  size="13px"
                  :value="rat_1"
                />
                <span
                  style="margin-top: 2px"
                  class="text-caption text-weight-bold text-grey-8"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6</span
                >
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <q-tabs
          v-model="tab"
          dense
          align="left"
          class="bg-primary text-white shadow-2"
          :breakpoint="0"
        >
          <q-tab name="Specifications" label="Description" />
          <q-tab name="Benefit" label="Benefit" />
          <q-tab name="How to Use" label="How to Use" />
          <q-tab name="Ratings & Reviews" label="Ratings & Reviews" />
          <q-tab name="Recently Viewed" label="Recently Viewed" />
        </q-tabs>
        <q-tab-panels style="border: 1px solid lightgrey" v-model="tab">
          <q-tab-panel name="Specifications">
            <div class="row">
              <div class="col-12">
                <q-list bordered class="rounded-borders" style="">
                  <q-item-label class="text-weight-bolder" header
                    >Description</q-item-label
                  >
                  <q-item>
                    <q-item-section v-html="data.description" />
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="How to Use">
            <div class="row">
              <div class="col-12">
                <q-list bordered class="rounded-borders" style="">
                  <q-item-label class="text-weight-bolder" header
                    >How to Use</q-item-label
                  >
                  <q-item>
                    <q-item-section v-html="data.how_to_use" />
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="Benefit">
            <div class="row">
              <div class="col-12">
                <q-list bordered class="rounded-borders" style="">
                  <q-item-label class="text-weight-bolder" header
                    >Benefit</q-item-label
                  >
                  <q-item>
                    <q-item-section v-html="data.benefits" />
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="Ratings & Reviews">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-list bordered class="rounded-borders" style="">
                  <q-item-label class="text-weight-bolder text-green-8" header
                    >Positive Reviews</q-item-label
                  >

                  <q-item v-ripple>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1"
                        >Brunch this weekend?</q-item-label
                      >
                      <q-item-label caption lines="2">
                        <span class="text-weight-bold">Janet</span>
                        -- I'll be in your neighborhood doing errands this
                        weekend. Do you want to grab brunch?
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      1 min ago
                    </q-item-section>
                  </q-item>

                  <q-separator inset="item" />

                  <q-item v-ripple>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">Linear Project</q-item-label>
                      <q-item-label caption lines="2">
                        <span class="text-weight-bold">John</span>
                        -- Can we schedule a call for tomorrow?
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      1 min ago
                    </q-item-section>
                  </q-item>

                  <q-separator inset="item" />

                  <q-item v-ripple>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1"
                        >Brunch this weekend?</q-item-label
                      >
                      <q-item-label caption lines="2">
                        <span class="text-weight-bold">Janet</span>
                        -- I'll be in your neighborhood doing errands this
                        weekend. Do you want to grab brunch?
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      1 min ago
                    </q-item-section>
                  </q-item>

                  <q-separator inset="item" />

                  <q-item v-ripple>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">Linear Project</q-item-label>
                      <q-item-label caption lines="2">
                        <span class="text-weight-bold">John</span>
                        -- Can we schedule a call for tomorrow?
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      1 min ago
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-list bordered class="rounded-borders" style="">
                  <q-item-label class="text-weight-bolder text-red-8" header
                    >Negative Reviews</q-item-label
                  >

                  <q-item v-ripple>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1"
                        >Brunch this weekend?</q-item-label
                      >
                      <q-item-label caption lines="2">
                        <span class="text-weight-bold">Janet</span>
                        -- I'll be in your neighborhood doing errands this
                        weekend. Do you want to grab brunch?
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      1 min ago
                    </q-item-section>
                  </q-item>

                  <q-separator inset="item" />

                  <q-item v-ripple>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">Linear Project</q-item-label>
                      <q-item-label caption lines="2">
                        <span class="text-weight-bold">John</span>
                        -- Can we schedule a call for tomorrow?
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      1 min ago
                    </q-item-section>
                  </q-item>

                  <q-separator inset="item" />

                  <q-item v-ripple>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1"
                        >Brunch this weekend?</q-item-label
                      >
                      <q-item-label caption lines="2">
                        <span class="text-weight-bold">Janet</span>
                        -- I'll be in your neighborhood doing errands this
                        weekend. Do you want to grab brunch?
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      1 min ago
                    </q-item-section>
                  </q-item>

                  <q-separator inset="item" />

                  <q-item v-ripple>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">Linear Project</q-item-label>
                      <q-item-label caption lines="2">
                        <span class="text-weight-bold">John</span>
                        -- Can we schedule a call for tomorrow?
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      1 min ago
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';
import cart_mixin from 'src/mixins/cart_mixin';
import { date } from 'quasar';
let timeStamp = Date.now();
import { mapGetters } from 'vuex';

export default {
  name: 'details.vue',
  mixins: [cart_mixin, device_mixin],
  data() {
    return {
      slide: 1,
      tab: 'Specifications',
      rating_point: 4.3,
      rat_5: 0.9,
      rat_4: 0.6,
      rat_3: 0.1,
      rat_2: 0.1,
      rat_1: 0.1,
      data: {},
      orderQty: 0
    };
  },
  watch: {
    cartUpdateCounter(newVal) {
      let cartItem = this.findItemInCart(this.data.product_id);
      console.log(
        'cart updated',
        newVal,
        this.data.product_id,
        cartItem,
        !!cartItem
      );
      if (!!cartItem === false) {
        this.orderQty = 0;
      }
    }
  },
  computed: {
    ...mapGetters('user', ['quotationPartyId']),
    ...mapGetters('cart', ['findItemInCart', 'cartUpdateCounter']),
    win_width() {
      return this.$q.screen.width - 59;
    },
    win_height() {
      return this.$q.screen.height - 0;
    },
    fastDelivery() {
      let newDate = date.addToDate(new Date(), { days: 1 });
      return date.formatDate(newDate, 'ddd, MMM D ') + 'by 9 PM';
    },
    regularDelivery() {
      let newDate = date.addToDate(new Date(), { days: 2 });
      return date.formatDate(newDate, 'ddd, MMM D ');
    },
    getSize() {
      console.log(this.isDesktop);
      return this.isDesktop ? '510px' : '360px';
    },
    getItem() {
      let abc = this.findItemInCart(this.data.product_id);
      console.log('result', abc);
      return abc;
    }
  },
  mounted() {
    const slug = this.$route.params.slug;
    //console.time('Timer name');
    //DataService.get('data/product.json')
    DataService.get(
      `product/${slug}?quotation_party_id=${this.quotationPartyId}`
    )
      .then(response => {
        this.data = response.data.rows[0];
        //this.rating_point = parse.Float(response.data.rows[0].rating);
        this.rating_point = response.data.rows[0].rating;
        let cartItem = this.findItemInCart(this.data.product_id);
        console.log('cart found', cartItem);
        if (cartItem) {
          this.orderQty = cartItem.quantity;
        } else {
          this.orderQty = 0;
        }
      })
      .catch(error => {
        console.log('DataService.get Error', error);
      });
  }
};
</script>

<style lang="sass" scoped>
.q-panel
  height: 100%
  width: 100%


::v-deep .custom-control
  & .q-field__control
    padding: 0

  input
    text-align: center
</style>
