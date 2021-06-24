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
                @input="change"
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
                @input="change"
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
                @input="change"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs q-mb-md">
              <q-input
                dense
                outlined
                v-model="user.landmark"
                label="Landmark"
                @input="change"
              />
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-input
                dense
                outlined
                v-model="user.city"
                label="City"
                :rules="[required]"
                @input="change"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs q-mb-md">
              <keep-alive>
                <pincode-ddlb
                  title="Pincode List*"
                  :list="pincodeList"
                  :value="user.pincode_id"
                  @changed="user.pincode_id = $event"
                />
              </keep-alive>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-input
                dense
                clearable
                outlined
                v-model="user.email_id"
                label="Email"
                :rules="[required]"
                @input="change"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs">
              <q-input
                dense
                clearable
                outlined
                type="number"
                v-model="user.mobile"
                label="Telephone No"
                :rules="[required, isPhoneNumber]"
                @input="change"
              />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-input
                dense
                clearable
                outlined
                v-model="user.mobile2"
                label="Alternet No"
                @input="change"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
    <otp
      :show="otpShow"
      @close="closeModal"
      :mobile="user.mobile"
      :message="message"
      >Guest Mobile Verification</otp
    >
  </div>
</template>

<script>
import { required, isPhoneNumber } from 'src/services/Validation';
import DataService from 'src/services/DataService';
import form_mixin from 'src/mixins/form_mixin';
import common_mixin from 'src/mixins/common_mixin';
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['validation'],
  mixins: [form_mixin, common_mixin],
  components: {
    'pincode-ddlb': () => import('components/BaseDdlb'),
    otp: () => import('components/Otp')
  },
  data() {
    return {
      form: 'form_guest',
      user: {
        address_id: 0,
        full_name: null,
        mobile: null,
        mobile2: null,
        email_id: null,
        country_id: 101,
        state_id: 21,
        pincode_id: null,
        pincode: null,
        apartment: null,
        area: null,
        landmark: null,
        city: null
      },
      pincodeList: [],
      otpShow: false,
      message: {
        company_id: process.env.COMPANY_ID,
        template: 'otp',
        module: 'signin',
        key_value: null,
        mobileNo: null,
        domain: process.env.DOMAIN,
        dataType: 'number'
      }
    };
  },
  watch: {
    addressUpdatedCounter(newVal, oldVal) {
      console.log('going to call validation');
      if (newVal) {
        this.onSubmit();
      }
    }
  },

  methods: {
    ...mapActions('cart', [
      'updateDeliveryAddress',
      'updateBillingAddress',
      'updatePageIndex'
    ]),
    ...mapActions('user', ['setUser']),
    ...mapActions(['setAddressValidation']),
    required,
    isPhoneNumber,
    change() {
      console.log('change happened');
    },
    closeModal(payload) {
      console.log('closeModal payaload', payload);
      if (!!payload) {
        this.setAddressValidation(payload);
        this.updatePageIndex(3);
      }
      this.otpShow = false;
    },
    // this function fire by continue button from cart stepper
    async onSubmit() {
      this.$q.loading.show();
      const ans = await this.validateForm();
      let payload = { action: ans };
      console.log('inside onSubmit', ans);

      if (ans) {
        const result = await DataService.get(
          `verify-pincode?pincode_id=${this.user.pincode_id}&company_id=${process.env.COMPANY_ID}`
        );
        console.log('pincode status', result);
        console.log('validation successfull going to emit', payload, this.user);
        if (
          result.data.total_rows > 0 &&
          result.data.rows[0].pincode_status === 'O'
        ) {
          this.user.company_id = process.env.COMPANY_ID;
          this.user.pincode = result.data.rows[0].pincode;
          this.user.pincode_status = result.data.rows[0].pincode_status;
          this.user.delivery_charges = result.data.rows[0].delivery_charges;
          this.user.delivery_charges_type =
            result.data.rows[0].delivery_charges_type;
          this.user.telephone = this.user.mobile;

          this.updateDeliveryAddress(this.user);
          this.updateBillingAddress(this.user);
          this.setUser(this.user);
          //this.$emit('addressValidation', ans);
          console.log(
            'otpShow before changed',
            this.otpShow,
            this.addressValidation
          );

          this.otpShow = !this.addressValidation;
          this.message.mobileNo = this.user.mobile;
          console.log('otpShow has changed', this.otpShow);
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
        console.log('guest login validation failed', ans);
        this.$emit('addressValidation', false);
      }
      this.$q.loading.hide();
    }
  },
  computed: {
    ...mapGetters(['addressUpdatedCounter', 'addressValidation'])
  },
  async mounted() {
    let response = await DataService.get(
      `pincode-ddlb?company_id=${process.env.COMPANY_ID}`
    );
    this.pincodeList = response.data.rows;
    console.log('cart billing guest');
  }
};
</script>

<style></style>
