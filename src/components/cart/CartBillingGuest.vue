<template>
  <div class="q-ma-sm">
    <q-form ref="form_guest" @submit.prevent.stop="onSubmit">
      <q-card>
        <q-card-section>
          <div class="row">
            <div class="col-12">
              <q-input
                dense
                clearable
                outlined
                v-model="user.full_name"
                label="Full Name"
                :rules="[required]"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs">
              <q-input
                dense
                outlined
                type="text"
                v-model="user.apartment"
                label="House No / Apartment*"
                :rules="[required]"
              />
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs">
              <q-input
                dense
                outlined
                type="text"
                v-model="user.area"
                label="Area*"
                :rules="[required]"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs">
              <q-input
                dense
                outlined
                v-model="user.landmark"
                label="Landmark"
              />
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-input
                dense
                outlined
                v-model="user.city"
                label="City"
                :rules="[required]"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs">
              <q-input
                dense
                outlined
                type="text"
                v-model="user.pincode"
                label="Pincode*"
                :rules="[required]"
              />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-input
                dense
                clearable
                outlined
                v-model="user.email_id"
                label="Email"
                :rules="[required]"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs">
              <q-input
                dense
                clearable
                outlined
                v-model="user.telephone"
                label="Telephone No"
                :rules="[required]"
              />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-input
                dense
                clearable
                outlined
                v-model="user.mobile2"
                label="Alternet No"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script>
import { required } from 'src/services/Validation';
import DataService from 'src/services/DataService';
import form_mixin from 'src/mixins/form_mixin';
import common_mixin from 'src/mixins/common_mixin';
import { mapGetters, mapActions } from 'vuex';

export default {
  //  props: ['addressValidation'],
  mixins: [form_mixin, common_mixin],
  data() {
    return {
      form: 'form_guest',
      user: {
        address_id: 0,
        full_name: null,
        telephone: null,
        mobile2: null,
        email_id: null,
        country_id: 101,
        state_id: 21,
        pincode: null,
        apartment: null,
        area: null,
        landmark: null,
        city: null
      }
    };
  },
  watch: {
    addressValidationCounter(newVal, oldVal) {
      //console.log('going to call validation', newVal);
      if (newVal) {
        this.onSubmit();
      }
    }
  },
  methods: {
    ...mapActions('cart', ['updateDeliveryAddress', 'updateBillingAddress']),
    required,
    async onSubmit() {
      // console.log('pincode is', this.user.pincode);
      // const result = await DataService.get(
      //   `verify-pincode?pincode=${this.user.pincode}`
      // );
      // console.log('pincode status', result);
      this.$q.loading.show();
      const ans = await this.validateForm();
      let payload = { action: false };
      if (ans) {
        const result = await DataService.get(
          `verify-pincode?pincode=${this.user.pincode}`
        );
        console.log('pincode status', result.data.rows[0]);
        console.log('validation successfull going to emit', payload);
        if (
          result.data.total_rows > 0 &&
          result.data.rows[0].status === 'Open'
        ) {
          this.user.status = result.data.rows[0].status;
          this.user.delivery_charges_type =
            result.data.rows[0].delivery_charges_type;
          this.user.delivery_charges = result.data.rows[0].delivery_charges;

          this.updateDeliveryAddress(this.user);
          this.updateBillingAddress(this.user);
          this.$emit('addressValidation', ans);
        } else {
          this.$q.notify({
            type: 'warning',
            icon: 'no_transfer',
            color: 'primary',
            message:
              'Sorry we are not delivering to this pincode choose different city.',
            actions: [
              {
                label: 'Area of Operation',
                color: 'white',
                handler: () => {
                  this.$router.push('city');
                }
              }
            ]
          });
        }
      } else {
        this.$emit('addressValidation', false);
      }
      this.$q.loading.hide();
    }
  },
  computed: {
    ...mapGetters(['addressValidationCounter'])
  },
  mounted() {
    console.log('mounted addressValidation', this.addressValidation);
  }
};
</script>

<style></style>
