<template>
  <div class="">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>
      <q-step
        :name="1"
        title="Cart"
        icon="looks_one"
        :done="step > 1"
        style="min-height: 400px;"
      >
        <div class="fit row wrap justify-evenly" style="overflow: hidden;">
          <div class="col-md-8 col-lg-8 col-sm-12 col-xs-12">
            <cart-list />
          </div>
          <!-- <div class="col-4" v-if="isDesktop">
            <cart-overview />
          </div> -->
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Address"
        icon="looks_two"
        :done="step > 2"
        style="min-height: 400px;"
      >
        <div class="fit row wrap justify-evenly" style="overflow: hidden;">
          <!-- <div class="col-md-8 col-lg-8 col-sm-12 col-xs-12"> -->
          <cart-billing
            ref="cartBilling"
            @addressValidation="addressValidation = $event"
          />
          <!-- </div> -->
          <!-- <div class="col-4" v-if="isDesktop">
            <cart-overview />
          </div> -->
        </div>
      </q-step>

      <q-step
        :name="3"
        title="Payment"
        icon="looks_3"
        style="min-height: 200px;"
      >
        <cart-overview />

        <div class="row wrap justify-evenly q-ma-md">
          <q-btn
            color="indigo-10"
            @click="payNow('PAYMENT GATEWAY')"
            :disable="!processing"
          >
            <div class="row items-center no-wrap">
              <div class="text-center">Payment<br />Gateway</div>
            </div>
          </q-btn>

          <q-btn
            color="indigo-10"
            outline
            @click="payNow('CASH ON DELIVERY')"
            :disable="!processing"
          >
            <div class="row items-center no-wrap">
              <div class="text-center">Cash on<br />Delivery</div>
            </div>
          </q-btn>

          <!-- <q-btn
            color="primary"
            label="Cash on<br>Delivery"
            class="q-ma-sm"
            @click="payNow('CASH ON DELIVERY')"
            :disable="processing"
          /> -->
        </div>
      </q-step>

      <!-- <q-step :name="4" icon="looks_4" title="Pay" style="min-height: 200px;">
        Try out different ad text to see what brings in the most customers, and
        learn how to enhance your ads using features like ad extensions. If you
        run into any problems with your ads, find out how to tell if they're
        running and how to resolve approval issues.
      </q-step> -->

      <template v-slot:navigation>
        <q-stepper-navigation class="q-mt-md">
          <!-- <q-btn
            @click="pageSkip('Next')"
            color="primary"
            v-if="step <= 1 || guestLogin || isUserLoggedIn"
            :label="step === 4 ? 'Finish' : 'Continue'"
          /> -->
          <q-btn
            @click="pageSkip('Next')"
            color="primary"
            v-if="step <= 2"
            :label="step === 4 ? 'Finish' : 'Continue'"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="pageSkip('Previous')"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>

      <template v-slot:message>
        <q-banner v-if="step === 1" class="bg-purple-8 text-white q-px-lg">
          <q-icon name="shopping_cart" size="lg" />
          Shopping Cart
        </q-banner>
        <q-banner v-else-if="step === 2" class="bg-green-8 text-white q-px-lg">
          <q-icon name="local_shipping" size="lg" />
          Shipping Information
        </q-banner>
        <q-banner v-else-if="step === 3" class="bg-orange-8 text-white q-px-lg">
          <q-icon name="receipt" size="lg" />
          Payment
        </q-banner>

        <q-banner v-else class="bg-blue-8 text-white q-px-lg">
          <q-icon name="verified" size="lg" />
          Confirmation
        </q-banner>
      </template>
    </q-stepper>
  </div>
</template>
<script>
import DataService from 'src/services/DataService';
import { mapActions, mapGetters, mapState } from 'vuex';
import device_mixin from 'src/mixins/device_mixin';
import common_mixin from 'src/mixins/common_mixin';

export default {
  props: ['stage'],
  mixins: [device_mixin, common_mixin],
  components: {
    'cart-overview': () => import('./CartOverview'),
    'cart-list': () => import('./CartList'),
    'cart-billing': () => import('./CartBilling')
  },
  data() {
    return {
      step: 1,
      processing: true,
      addressValidation: false
    };
  },
  watch: {
    deliveryAddressStatus(newVal) {
      console.log(
        'controlling behaviour',
        newVal,
        newVal == false,
        newVal == true
      );
      if (this.step === 2 && newVal == false) {
        this.validation = true;
      } else {
        this.validation = false;
      }
    },
    addressValidation(newVal) {
      if (newVal === true) {
        this.step = 3;
      }
    }
  },
  computed: {
    ...mapGetters(['guestLogin', 'isUserLoggedIn']),
    ...mapGetters('cart', ['deliveryAddressStatus', 'productAmount']),
    ...mapState(['cart'])
  },
  methods: {
    ...mapActions(['setAddressValidationCounter']),
    ...mapActions('cart', ['updateBillType']),
    async payNow(paymentMode) {
      console.log('inside paynow', paymentMode, this.processing);
      //const mode = paymentMode === 'PREPAID' ? 'PR' : 'CD';

      console.log({ ...this.cart });

      this.updateBillType(paymentMode);
      this.$q.loading.show();
      this.processing = true;
      try {
        let response = await DataService.post('payment', { ...this.cart });
        console.log('wait let me check response', response);
        if (response.data.status && response.data.status === 'success') {
          console.log('please put me to success route', response.data);
          this.$router.push({
            name: 'thank-you'
          });
        } else {
          console.log('else');
          window.location.href = response.data;
        }
      } catch (error) {
        console.log('payNow() catch', error);
        this.$q.notify({
          message: 'Sorry its seems you have not logged in to system',
          color: 'negative',
          icon: 'warning'
        });
      } finally {
        this.$q.loading.hide();
        this.processing = true;
      }
    },
    pageSkip(action) {
      if (action === 'Next') {
        switch (this.step) {
          case 1:
            if (this.productAmount >= 1000) {
              console.log('on first page please check cart total');
              // if (this.isUserLoggedIn) {
              //   this.$refs.continueButton.visible = false;
              // } else {
              //   this.$refs.continueButton.visible = true;
              //   }
              this.$refs.stepper.next();
            } else {
              this.popupMessage(
                'warning',
                'Cart Minimum amount should be Rs 1,000/-',
                'center'
              );
            }

          case 2:
            this.addressValidation
              ? this.$refs.stepper.next()
              : this.setAddressValidationCounter();
            console.log('inside', this.step, this.addressValidation);
            break;
          default:
            this.$refs.stepper.next();
            break;
        }
      } else {
        this.$refs.stepper.previous();
      }
    }
  },
  mounted() {
    switch (this.stage) {
      case 'confirmation':
        this.step = 4;
        break;
      case 'failed':
        this.popupMessage('negative', 'Payment Failed', 'center');
        this.step = 3;
        break;
      default:
        break;
    }
  }
};
</script>
<style lang="sass">
.q-stepper__step-inner
    padding: 0px !important;

.q-stepper__tab
    padding: 8px 8px;
    font-size: 14px;
    flex-direction: row;

.q-stepper__line:after
    position: absolute;
    top: 50%;
    width: 0px !important;

.q-stepper--horizontal .q-stepper__line:before, .q-stepper--horizontal .q-stepper__line:after
    position: absolute;
    height: 1px;
</style>
