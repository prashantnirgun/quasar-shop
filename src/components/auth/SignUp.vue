<template>
  <div class="row justify-end">
    <q-form
      ref="form_register"
      class="full-width"
      @submit.prevent.stop="onSubmit"
    >
      <q-input
        class="col-12 q-ma-xs"
        dense
        outlined
        v-model="full_name"
        label="Full Name*"
        lazy-rules
        :rules="[required]"
        hide-hint
        hide-bottom-space
      ></q-input>
      <q-input
        class="col-12 q-ma-xs"
        dense
        outlined
        v-model="user_name"
        label="Username*"
        lazy-rules
        :rules="[required, uniqueNameRule]"
        hide-hint
        hide-bottom-space
      ></q-input>
      <!-- <div class="row"> -->
      <q-input
        dense
        class="col-12 q-ma-xs"
        outlined
        v-model="password1"
        label="Password*"
        :type="isPwdNew1 ? 'password' : 'text'"
        lazy-rules
        :rules="[required, passwordRule]"
        hide-hint
        hide-bottom-space
      >
        <template v-slot:append>
          <q-icon
            :name="isPwdNew1 ? 'visibility_off' : 'visibility'"
            @click="isPwdNew1 = !isPwdNew1"
          />
        </template>
      </q-input>
      <!-- <q-input
      dense
      class="q-ma-xs "
      outlined
      v-model="password2"
      label="Confirm Password*"
      lazy-rules
      :type="isPwdNew2 ? 'password' : 'text'"
      :rules="[passwordRule]"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwdNew2 ? 'visibility_off' : 'visibility'"
          @click="isPwdNew2 = !isPwdNew2"
        />
      </template>
    </q-input> -->
      <!-- </div> -->
      <q-input
        dense
        class="col-12 q-ma-xs"
        type="email"
        outlined
        v-model="email_id"
        label="Email Address*"
        lazy-rules
        :rules="[uniqueEmailRule]"
        hide-hint
        hide-bottom-space
      ></q-input>
      <q-input
        dense
        class="col-12 q-ma-xs q-mb-none"
        outlined
        type="number"
        v-model.number="mobile"
        :rules="[isPhoneNumber]"
        label="Mobile Number*"
        lazy-rules
        hide-hint
        hide-bottom-space
      ></q-input>

      <q-btn
        label="Signup"
        color="teal"
        class="col-3 text-capitalized float-right q-mx-sm"
        @click="verifyMobile"
      />
    </q-form>

    <otp :show="otpShow" @close="closeModal" :mobile="mobile" :message="message"
      >{{ full_name }} Mobile Verification</otp
    >
  </div>
</template>

<script>
import AuthenticationService from 'src/services/AuthenticationService';
import auth_mixin from 'src/mixins/auth_mixin';
import { mapActions } from 'vuex';
import { required, isPhoneNumber } from 'src/services/Validation';
import axios from 'axios';
function setAxiosHeaders(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export default {
  mixins: [auth_mixin],
  components: {
    otp: () => import('components/Otp')
  },
  data() {
    return {
      status_id: 'A',
      failed_attempt: 0,
      user_name: null,
      full_name: null,
      username: null,
      password1: null,
      //password2: null,
      email_id: null,
      mobile: null,
      error: '',
      isPwdNew1: true,
      //isPwdNew2: true
      otpShow: false,
      message: {
        company_id: process.env.COMPANY_ID,
        template: 'otp',
        module: 'signup',
        key_value: null,
        mobileNo: null,
        domain: process.env.DOMAIN,
        dataType: 'number'
      }
    };
  },
  methods: {
    required,
    isPhoneNumber,
    ...mapActions('user', ['setToken', 'setUser']),
    ...mapActions('cart', ['updateCustomerId']),
    uniqueNameRule(value) {
      return this.isUserAvailable('user_name', value);
    },
    uniqueEmailRule(value) {
      return this.isUserAvailable('email_id', value);
    },
    uniquePhoneRule(value) {
      return this.isUserAvailable('mobile', value);
    },
    passwordRule(value) {
      if (value.length <= 7) {
        return 'Please enter at least 8 characters!';
      }
      // if (value !== this.password1) {
      //   return 'Password must be the same with the newly created password';
      // }
    },
    onSubmit() {
      this.$refs.form_register
        .validate()
        .then(success => {
          let columns = {
            user_id: 0,
            status_id: 'A',
            failed_attempt: 0,
            user_name: this.user_name,
            password: this.password1,
            full_name: this.full_name,
            email_id: this.email_id,
            general_ledger_id: 0,
            mobile: this.mobile,
            company_id: process.env.COMPANY_ID,
            company_type_id: process.env.COMPANY_TYPE
          };

          AuthenticationService.register({ ...columns })
            .then(response => {
              console.log('response received', response);
              setAxiosHeaders(response.data.token);
              this.setToken(response.data.token);
              this.setUser(response.data.user);
              this.updateCustomerId(response.data.user.general_ledger_id);
              //this.$router.push({ name: 'home' });
              this.$emit('close');
            })
            .catch(error => {
              // eslint-disable-next-line no-console
              console.info('error found', error);
              this.error = error.response.data.message;
            });
        })
        .catch(e => {
          console.error('form validation error');
        });
    },
    verifyMobile() {
      this.message.mobileNo = this.mobile;
      this.otpShow = true;
    },
    closeModal(payload) {
      //console.log('closeModal payaload', payload);
      this.otpShow = false;
      this.onSubmit();
    }
  }
};
</script>

<style></style>
