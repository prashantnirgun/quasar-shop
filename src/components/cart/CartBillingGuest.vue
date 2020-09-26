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
                v-model="user.mobile1"
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
import { mapGetters } from 'vuex';

export default {
  //  props: ['guestValidation'],
  mixins: [form_mixin],
  data() {
    return {
      form: 'form_guest',
      user: {
        full_name: null,
        mobile1: null,
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
    // guestValidation(newVal, oldVal) {
    //   console.log('going to call validation', newVal);
    //   if (newVal) {
    //     this.onSubmit();
    //   }
    // },
    guestValidationCounter(newVal, oldVal) {
      console.log('going to call validation', newVal);
      if (newVal) {
        this.onSubmit();
      }
    }
  },
  methods: {
    required,
    async onSubmit() {
      const ans = await this.validateForm();
      let payload = { action: false };
      if (ans) {
        let data = this.data;
        DataService.post(`address`, { ...data })
          .then(response => {
            payload = { action: true };
            this.close(payload);
          })
          .catch(error => {
            console.log('mixin/ddlb Error', error);
          });
      }
    }
  },
  computed: {
    ...mapGetters(['guestValidationCounter'])
  },
  mounted() {
    console.log('mounted guestValidation', this.guestValidation);
  }
};
</script>

<style></style>
