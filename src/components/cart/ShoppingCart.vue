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
            <q-card class="q-ma-sm">
              <q-card-section>
                <div class="text-h6">Shopping Cart</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                exercitationem laborum voluptates aut vero quibusdam, deserunt
                pariatur quaerat atque ipsa consectetur ipsam obcaecati
                laudantium tenetur ut excepturi eum expedita iusto.
              </q-card-section>
            </q-card>
          </div>
          <div class="col-4 ">
            <q-card class="q-ma-sm">
              <cart-overview />
            </q-card>
          </div>
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Billing Information"
        caption="Optional"
        icon="receipt"
        :done="step > 2"
        style="min-height: 200px;"
      >
        An ad group contains one or more ads which target a shared set of
        keywords.
      </q-step>

      <q-step
        :name="3"
        title="Shipping Information"
        icon="local_shipping"
        disable
        style="min-height: 200px;"
      >
        This step won't show up because it is disabled.
      </q-step>

      <q-step
        :name="4"
        title="Payment"
        icon="payment"
        disable
        style="min-height: 200px;"
      >
        This step won't show up because it is disabled.
      </q-step>

      <q-step
        :name="5"
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
        <q-banner v-else-if="step === 2" class="bg-orange-8 text-white q-px-lg">
          <q-icon name="receipt" size="lg" />
          Billing Information
        </q-banner>
        <q-banner v-else-if="step === 3" class="bg-green-8 text-white q-px-lg">
          <q-icon name="local_shipping" size="lg" />
          Shipping Information
        </q-banner>
        <q-banner v-else-if="step === 4" class="bg-blue-8 text-white q-px-lg">
          <q-icon name="payment" size="lg" />
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
import { mapGetters } from 'vuex';
export default {
  components: {
    'cart-overview': () => import('./CartOverview')
  },
  data() {
    return {
      //totalAmount: 0,
      step: 1
    };
  },
  computed: {
    // ...mapGetters('cart', ['allItems']),
    // getTotal() {
    //   return this.allItems.reduce((total, item) => {
    //     return total + item.amount;
    //   }, 0);
    // }
  }
};
</script>
