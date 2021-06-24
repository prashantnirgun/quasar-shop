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
          <cart-billing
            ref="cartBilling"
            @addressValidation="addressValidation = $event"
          />
        </div>
      </q-step>

      <q-step
        :name="3"
        title="Payment"
        icon="looks_3"
        style="min-height: 200px;"
      >
        <cart-overview />

        <div>
          <div class="text-center">NEFT & UPA payments are free</div>
          <div class="row wrap justify-evenly q-ma-md">
            <q-btn color="indigo-10" @click="payNow('PAYMENT GATEWAY')">
              <div class="row items-center no-wrap">
                <div class="text-center">Payment<br />Gateway</div>
              </div>
            </q-btn>

            <q-btn
              color="indigo-10"
              outline
              @click="payNow('CASH ON DELIVERY')"
            >
              <div class="row items-center no-wrap">
                <div class="text-center">Cash on<br />Delivery</div>
              </div>
            </q-btn>
          </div>
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="q-mt-md">
          <q-btn
            @click="pageSkip('Next')"
            color="primary"
            v-if="step <= 2"
            label="Continue"
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
  watch: {
    pageIndex: {
      immediate: true,
      handler(newVal, oldVal) {
        console.log('pageIndex', newVal, oldVal);
        if (newVal > oldVal) {
          this.$refs.stepper.next();
        } else if (oldVal > 1) {
          this.$refs.stepper.previous();
        }
      }
    }
  },
  data() {
    return {
      step: 1,
      validation: false,
      processing: true,
      maxAmount: 10
    };
  },

  computed: {
    ...mapGetters([
      'guestLogin',
      'isUserLoggedIn',
      'addressValidation',
      'addressUpdatedCounter'
    ]),
    ...mapGetters('cart', ['productAmount', 'deliveryAddress', 'pageIndex']),
    ...mapGetters('user', ['user']),
    ...mapState(['cart'])
  },
  methods: {
    ...mapActions('cart', ['updateBillType', 'updatePageIndex']),
    ...mapActions(['setaddressUpdatedCounter']),
    async payNow(paymentMode) {
      this.updateBillType(paymentMode);
      this.$q.loading.show();
      this.processing = true;

      try {
        let cartData = { ...this.cart };
        cartData.billingAddress.telephone = this.user.mobile;
        cartData.billingAddress.email_id = this.user.email_id;
        cartData.billingAddress.full_name = this.user.full_name;
        //console.log('mobile', this.user.mobile, cartData);
        if (cartData.billingAddress.telephone.length === 10) {
          let response = await DataService.post('payment', cartData);
          console.log('wait let me check response', response.data);
          if (paymentMode === 'PAYMENT GATEWAY') {
            window.location.href = response.data;
          } else {
            this.$router.push({
              name: 'thank-you'
            });
          }
        } else {
          this.popupmessage(
            'Warning',
            'Mobile Number should be exact 10',
            'center'
          );
        }
      } catch (error) {
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
            if (this.productAmount >= this.maxAmount) {
              this.$refs.stepper.next();
            } else {
              this.popupMessage(
                'warning',
                'Cart Minimum amount should be Rs ' + this.maxAmount + '/-',
                'center'
              );
            }
            break;
          case 2:
            if (this.guestLogin) {
              if (this.addressValidation) {
                console.log('pageIndex', this.pageIndex);
                this.updatePageIndex(this.pageIndex + 1);
              } else {
                this.setaddressUpdatedCounter(this.addressUpdatedCounter + 1);
              }
            } else {
              if (this.addressValidation) {
                this.updatePageIndex(this.pageIndex + 1);
              } else {
                this.$q.notify({
                  message: 'Please fill delivery address',
                  color: 'negative',
                  icon: 'warning'
                });
              }
            }
            break;
          default:
            this.updatePageIndex(this.step++);
            this.$refs.stepper.next();
            break;
        }
      } else {
        this.$refs.stepper.previous();
        this.updatePageIndex(this.step);
      }
    }
  }
};
</script>
<style lang="sass">
.q-stepper__step-inner
    padding: 0px !important

.q-stepper__tab
    padding: 8px 8px
    font-size: 14px
    flex-direction: row

.q-stepper__line:after
    position: absolute
    top: 50%
    width: 0px !important

.q-stepper--horizontal .q-stepper__line:before, .q-stepper--horizontal .q-stepper__line:after
    position: absolute
    height: 1px
</style>
