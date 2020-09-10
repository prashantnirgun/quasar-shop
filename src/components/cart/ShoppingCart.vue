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
            <cart-billing />
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
        disable
        style="min-height: 200px;"
      >
        This step won't show up because it is disabled.
      </q-step>

      <q-step
        :name="4"
        title="Confirmation"
        icon="done"
        style="min-height: 200px;"
      >
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
            :label="step === 3 ? 'Finish' : 'Continue'"
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
        <q-banner v-else-if="step === 2" class="bg-orange-8 text-white q-px-lg">
          <q-icon name="receipt" size="lg" />
          Billing Information
        </q-banner>
        <q-banner v-else-if="step === 3" class="bg-green-8 text-white q-px-lg">
          <q-icon name="local_shipping" size="lg" />
          Shipping Information
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
export default {
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
<style lang="sass"></style>
