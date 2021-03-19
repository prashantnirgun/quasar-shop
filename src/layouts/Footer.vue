<template>
  <div v-if="isDesktop" class="bg-primary text-white" style="overflow: hidden;">
    <div class="row wrap justify-center items-start" style="overflow: hidden;">
      <div class="col-6 col-md-2 col-lg-2 col-xl-12 q-pa-sm">
        <div class="text-subtitle1 text-weight-bold">About</div>
        <div class="text-caption hover_underline_white">
          About Us
        </div>
        <div class="text-caption hover_underline_white">Careers</div>
        <div class="text-caption hover_underline_white">Our Stories</div>
        <div class="text-caption hover_underline_white">Press</div>
      </div>

      <div class="col-6 col-md-2 col-lg-2 col-xl-12 q-pa-sm">
        <div class="text-subtitle1 text-weight-bold">Connect with Us</div>
        <div class="text-caption hover_underline_white q-mt-sm">
          Facebook
        </div>
        <div class="text-caption hover_underline_white">Instagram</div>
        <div class="text-caption hover_underline_white">Twitter</div>
      </div>

      <div class="col-6 col-md-2 col-lg-2 col-xl-12 q-pa-sm">
        <div class="text-subtitle1 text-weight-bold">Policy</div>
        <div class="text-caption hover_underline_white q-mt-sm">
          Return Policy
        </div>
        <div class="text-caption hover_underline_white">Terms Of Use</div>
        <div class="text-caption hover_underline_white">Security</div>
        <div class="text-caption hover_underline_white">Privacy</div>
        <div class="text-caption hover_underline_white">Sitemap</div>
      </div>

      <div class="col-6 col-md-2 col-lg-2 col-xl-12 q-pa-sm">
        <div class="text-subtitle1 text-weight-bold">Help</div>
        <div class="text-caption hover_underline_white q-mt-sm">
          Payments
        </div>
        <!-- <div class="text-caption hover_underline_white"> -->
        <router-link
          to="city"
          tag="div"
          class="text-caption hover_underline_white cursor-pointer"
          >Area of operation</router-link
        >
        <!-- </div> -->
        <div class="text-caption hover_underline_white">
          Cancellation & Returns
        </div>
        <div class="text-caption hover_underline_white">FAQ</div>
      </div>

      <div
        class="desktop-only col-6 col-md-auto col-lg-auto col-xl-auto q-pa-sm"
      >
        <div class="text-subtitle1 text-weight-bold">
          Registered Office Address:
        </div>
        <div class="text-caption q-mt-sm">
          M-874, "M" wing, APMC Market, Sector-19, Turbhe,
        </div>
        <div class="text-caption">Navi Mumbai, Maharashtra</div>
        <div class="text-caption">400 705</div>
        <div class="text-caption">India</div>
      </div>
    </div>
  </div>
  <div v-else class="bg-primary text-white q-py-md" style="overflow: hidden;">
    <div class="row wrap justify-center items-start" style="overflow: hidden;">
      <a
        href="tel:02227831775"
        class="text-white"
        style="text-decoration: none;"
        >Customer Care 022-27831775</a
      >
    </div>
  </div>
</template>

<script>
import device_mixin from 'src/mixins/device_mixin';
export default {
  mixins: [device_mixin],
  mounted() {
    console.log('from footer', this.isDesktop);
  }
};
</script>
