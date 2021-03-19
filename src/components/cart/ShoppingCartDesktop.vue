<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" ref="stepper" color="primary" animated keep-alive>
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
            <cart-billing
              ref="cartBilling"
              @addressValidation="addressValidation = $event"
            />
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
          <q-btn
            color="primary"
            label="Cash on Delivery"
            class="q-ma-lg"
            @click="payNow('CASH ON DELIVERY')"
            :disable="processing"
          />

          <q-btn
            outline
            color="primary"
            label="Payment Gateway"
            @click="payNow('PAYMENT GATEWAY')"
            :disable="processing"
          />
        </div>
      </q-step>

      <q-step
        :name="4"
        title="Confirmation"
        icon="done"
        style="min-height: 200px;"
      >
        <cart-confirmation />
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            :disable="validation"
            @click="pageSkip('Next')"
            color="primary"
            v-if="step <= 1 || guestLogin || isUserLoggedIn"
            :label="step === 3 ? 'Finish' : 'Continue'"
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
    'cart-billing': () => import('./CartBilling'),
    'cart-confirmation': () => import('./CartConfirmation')
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
  data() {
    return {
      step: 1,
      //addressValidation: false,
      validation: false,
      processing: true
    };
  },
  methods: {
    ...mapActions(['setAddressValidationCounter']),
    ...mapActions('cart', ['updateBillType']),
    async payNow(paymentMode) {
      //const mode = paymentMode === 'PREPAID' ? 'PG' : 'CD';
      console.log('inside payNow', paymentMode);
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
        console.log('data', result.data.rows);
        this.$q.notify({
          message: 'Sorry its seems you have not logged in to system',
          color: 'negative',
          icon: 'warning'
        });
      } finally {
        this.$q.loading.hide();
        this.processing = true;
      }

      //this.$q.loading.hide();
      //this.processing = true;
    },
    // s(val) {
    //   console.log('value final value receied as payload', val);
    // },

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
            if (this.addressValidation) {
              this.processing = false;
              console.log(
                'inside',
                this.step,
                this.addressValidation,
                this.processing
              );
              this.$refs.stepper.next();
            } else {
              console.log(
                'inside',
                this.step,
                'Address validation = ',
                this.addressValidation
              );
              this.setAddressValidationCounter();
            }

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
  computed: {
    ...mapGetters(['guestLogin', 'isUserLoggedIn', 'addressValidation']),
    ...mapGetters('cart', ['deliveryAddressStatus', 'productAmount']),
    ...mapState(['cart'])
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
<style lang="sass"></style>
