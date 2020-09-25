<template>
  <div class="">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>
      <q-step
        :name="1"
        title="Cart"
        icon="looks_one"
        :done="step > 1"
        style="min-height: 300px;"
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
          <cart-billing />
          <!-- </div> -->
          <!-- <div class="col-4" v-if="isDesktop">
            <cart-overview />
          </div> -->
        </div>
      </q-step>

      <q-step :name="3" title="Order" icon="looks_3" style="min-height: 200px;">
        <cart-overview />
      </q-step>

      <q-step :name="4" icon="looks_4" title="Pay" style="min-height: 200px;">
        Try out different ad text to see what brings in the most customers, and
        learn how to enhance your ads using features like ad extensions. If you
        run into any problems with your ads, find out how to tell if they're
        running and how to resolve approval issues.
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            @click="$refs.stepper.next()"
            color="primary"
            :label="step === 4 ? 'Finish' : 'Continue'"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
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
import device_mixin from 'src/mixins/device_mixin';
export default {
  mixins: [device_mixin],
  components: {
    'cart-overview': () => import('./CartOverview'),
    'cart-list': () => import('./CartList'),
    'cart-billing': () => import('./CartBilling')
  },
  data() {
    return {
      step: 1
    };
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
