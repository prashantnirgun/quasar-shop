<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>
      <q-step
        :name="1"
        title="Shopping Cart"
        icon="shopping_cart"
        :done="step > 1"
        style="min-height: 300px;"
      >
        <div class="fit row wrap justify-evenly" style="overflow: hidden;">
          <div class="col-8">
            <cart-list />
          </div>
          <div class="col-4 ">
            <cart-overview />
          </div>
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Billing Information"
        icon="receipt"
        :done="step > 2"
        style="min-height: 400px;"
      >
        <div class="fit row wrap justify-evenly" style="overflow: hidden;">
          <div class="col-8">
            <cart-billing ref="cartBilling" />
          </div>
          <div class="col-4 ">
            <cart-overview />
          </div>
        </div>
      </q-step>

      <q-step
        :name="3"
        title="Payment"
        icon="payment"
        style="min-height: 200px;"
      >
        <div>
          <div class="q-ma-lg q-mb-none">NEFT & UPA payments are free</div>
          <q-btn
            color="primary"
            label="Cash on Delivery"
            class="q-ma-lg"
            @click="payNow('CASH ON DELIVERY')"
          />

          <q-btn
            outline
            color="primary"
            label="Payment Gateway"
            @click="payNow('PAYMENT GATEWAY')"
          />
        </div>
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            :disable="validation"
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
        <q-banner v-else-if="step === 2" class="bg-orange-8 text-white q-px-lg">
          <q-icon name="receipt" size="lg" />
          Billing Information
        </q-banner>
        <q-banner v-else-if="step === 3" class="bg-green-8 text-white q-px-lg">
          <q-icon name="local_shipping" size="lg" />
          Final Payment
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
import common_mixin from 'src/mixins/common_mixin';

export default {
  props: ['stage'],
  mixins: [common_mixin],
  components: {
    'cart-overview': () => import('./CartOverview'),
    'cart-list': () => import('./CartList'),
    'cart-billing': () => import('./CartBilling')
  },
  data() {
    return {
      step: 1,
      validation: false,
      processing: true,
      maxAmount: 10
    };
  },
  watch: {
    $route(from, to) {
      console.log('from', from, 'to', to);
      console.log('stage', this.stage, 'pageindex', this.pageIndex);
      this.updatePageIndex(this.stage);
      this.step = this.stage;
    },
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
    },
    stage(newVal) {
      console.log('desktop stage', newVal);
    }
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
        console.log(
          'mobile',
          cartData.billingAddress.telephone,
          cartData.billingAddress.telephone.length,
          typeof cartData.billingAddress.telephone
        );
        if (cartData.billingAddress.telephone.toString().length === 10) {
          let response = await DataService.post(
            'payment',
            cartData,
            paymentMode
          );
          console.log('wait let me check response', response.data);
          if (paymentMode === 'PAYMENT GATEWAY') {
            window.location.href = response.data;
          } else {
            this.$router.push({
              name: 'thank-you'
            });
          }
        } else {
          this.popupMessage(
            'Warning',
            'Mobile Number should be exact 10',
            'center'
          );
        }
      } catch (error) {
        console.log('error', error);
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
              this.step++;
              this.updatePageIndex(this.step);
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
  }
};
</script>
<style lang="sass"></style>
