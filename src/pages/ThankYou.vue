<template>
  <div class="q-my-lg row justify-center bg-white">
    <q-card class=" col-md-3 col-ms-11 col-xs-11">
      <q-item class="justify-center ">
        <q-item-section avatar class="q-px-none">
          <q-avatar size="200px">
            <img :src="imgUrl" />
          </q-avatar>
        </q-item-section>
      </q-item>
      <q-card-section>
        <!-- <q-btn
          fab
          color="primary"
          icon="place"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        /> -->

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            Thank You for ordering
          </div>
          <!-- <div
            class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
          >
            <q-icon name="place" />
            250 ft
          </div> -->
        </div>

        <q-rating
          v-model="stars"
          :max="5"
          size="32px"
          color="orange"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          Delievery Address
        </div>
        <div class="text-caption">
          {{ address }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions class="row justify-evenly">
        <q-btn color="secondary" icon="home" label="Home" to="/" />
        <q-btn
          v-if="isUserLoggedIn"
          color="primary"
          icon="assignment"
          to="/orders"
        >
          Order
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
//import DataService from 'src/services/DataService';
//import device_mixin from 'src/mixins/device_mixin';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      stars: 3.5,
      lists: [],
      address: ''
    };
  },
  /*
  watch: {
    $route(to, from) {
      console.log('route changed', from.name, from);
      if (from.name === 'thank-you') {
        console.log('now going to reset cart');
        this.setAddressValidation(false);
        this.cartReset();
      } else {
        console.log('route not detected ====', from.name);
      }
    }
  },
  */
  computed: {
    ...mapGetters(['isUserLoggedIn']),
    ...mapGetters('user', ['user']),
    ...mapGetters('cart', ['deliveryAddressFull']),
    imgUrl() {
      return process.env.NODE_ENV === 'production' &&
        this.user.image_filename &&
        this.user.image_filename.length > 5
        ? `${process.env.STATIC}users/${this.user.company_id}/${this.user.image_filename}`
        : 'https://cdn.quasar.dev/img/boy-avatar.png';
    },
    getImageSize() {
      return this.isDesktop ? '200px' : '125px';
    }
  },
  mounted() {
    this.address = this.deliveryAddressFull;
  },
  methods: {
    ...mapActions('cart', ['cartReset']),
    ...mapActions(['setAddressValidation'])
  },
  destroyed() {
    this.setAddressValidation(false);
    this.cartReset();
  }
};
</script>
