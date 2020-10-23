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
          />

          <q-btn
            outline
            color="primary"
            label="Payment Gateway"
            @click="payNow('PREPAID')"
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
            v-if="step <= 2"
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
export default {
  props: ['stage'],
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
    }
  },
  data() {
    return {
      step: 1,
      addressValidation: false,
      validation: false
    };
  },
  methods: {
    ...mapActions(['setAddressValidationCounter']),
    ...mapActions('cart', ['updateBillType']),
    payNow(paymentMode) {
      const mode = paymentMode === 'PREPAID' ? 'PR' : 'CD';
      this.updateBillType(mode);

      //DataService.post('pay', { ...this.cart }).then(response => {
      DataService.post('payment', { ...this.cart }).then(response => {
        console.log('resp', response.data);
        window.location.href = response.data;
      });
    },
    // s(val) {
    //   console.log('value final value receied as payload', val);
    // },

    pageSkip(action) {
      if (action === 'Next') {
        switch (this.step) {
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
        /*
        if (
          this.step === 2 &&
          this.guestLogin === true &&
          this.addressValidation === false
        ) {
          this.setAddressValidationCounter();
          this.addressValidation ? this.$refs.stepper.next() : null;
        } else {
          this.setAddressValidationCounter();
          console.log('here step ', this.step, ' and login');
          //this.$refs.stepper.next();
          this.addressValidation ? this.$refs.stepper.next() : null;
        }
      } else {
        this.$refs.stepper.previous();
      }
      */
      }
    }
  },
  computed: {
    ...mapGetters(['guestLogin']),
    ...mapGetters('cart', ['deliveryAddressStatus']),
    ...mapState(['cart'])
  },
  mounted() {
    console.log('sopping carddesktop', this.stage);
    if (this.stage === 'confirmation') {
      this.step = 4;
    }
  }
};
</script>
<style lang="sass"></style>
