<template>
  <div class="q-mt-sm">
    <div class="row q-pa-md bg-primary">
      <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12"></div>
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-white">
        <div class="text-subtitle1 text-weight-bold">About</div>
        <div class="text-caption hover_underline_white q-mt-sm">
          Contact us
        </div>
        <div class="text-caption hover_underline_white">About Us</div>
        <div class="text-caption hover_underline_white">Careers</div>
        <div class="text-caption hover_underline_white">Our Stories</div>
        <div class="text-caption hover_underline_white">Press</div>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-white">
        <div class="text-subtitle1 text-weight-bold">Connect with Us</div>
        <div class="text-caption hover_underline_white q-mt-sm">
          Facebook
        </div>
        <div class="text-caption hover_underline_white">Instagram</div>
        <div class="text-caption hover_underline_white">Twitter</div>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-white">
        <div class="text-subtitle1 text-weight-bold">Policy</div>
        <div class="text-caption hover_underline_white q-mt-sm">
          Return Policy
        </div>
        <div class="text-caption hover_underline_white">Terms Of Use</div>
        <div class="text-caption hover_underline_white">Security</div>
        <div class="text-caption hover_underline_white">Privacy</div>
        <div class="text-caption hover_underline_white">Sitemap</div>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-white">
        <div class="text-subtitle1 text-weight-bold">Help</div>
        <div class="text-caption hover_underline_white q-mt-sm">
          Payments
        </div>
        <div class="text-caption hover_underline_white">Shipping</div>
        <div class="text-caption hover_underline_white">
          Cancellation & Returns
        </div>
        <div class="text-caption hover_underline_white">FAQ</div>
      </div>
      <div
        class="col-lg-3 col-md-3 col-sm-12 col-xs-12  text-white"
        :class="$q.platform.is.desktop ? 'q-pl-xl' : ''"
        :style="$q.platform.is.desktop ? 'border-left: 1px solid grey;' : ''"
      >
        <div class="text-subtitle1 text-weight-bold">
          Registered Office Address:
        </div>
        <div class="text-caption q-mt-sm">
          335, Gokhale Wadi, Grant Road
        </div>
        <div class="text-caption">Mumbai, Maharashtra</div>
        <div class="text-caption">412207</div>
        <div class="text-caption">India</div>
      </div>
    </div>
    <div style="background-color: #163758;">
      <div
        class="q-mr-md text-right q-py-xs text-weight-bold text-grey-6"
        style=""
      >
        Made with
        <span style="color: #e25555;font-size: 16px">&#9829;</span> using
        <a
          target="_blank"
          class="text-blue-1 hover_underline_white"
          style="text-decoration: none"
          href="https://quasar-framework.org"
          >&nbsp;Quasar&nbsp;</a
        >
        by
        <a
          target="_blank"
          class="text-blue-1 hover_underline_white"
          style="text-decoration: none"
          href="https://github.com/mayur091193"
          >Mayur</a
        >.
      </div>
    </div>
  </div>
</template>
