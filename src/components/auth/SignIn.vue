<template>
  <div class="row">
    <q-input
      class="q-ma-xs col-12"
      dense
      outlined
      v-model="username"
      label="Username*"
      lazy-rules
      :disable="islogin"
    ></q-input>
    <q-input
      dense
      class="q-ma-xs col-12"
      :type="isPwdNew ? 'password' : 'text'"
      outlined
      v-model="password"
      label="Password*"
      lazy-rules
      autocomplete="on"
      :disable="islogin"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwdNew ? 'visibility_off' : 'visibility'"
          @click="isPwdNew = !isPwdNew"
        />
      </template>
    </q-input>

    <q-input
      class="q-ma-xs col-12"
      dense
      outlined
      v-model="otp"
      label="OTP*"
      lazy-rules
      v-if="islogin"
      type="number"
      @input="
        val => {
          otp = val.toUpperCase();
        }
      "
    ></q-input>

    <q-checkbox
      class="text-grey-8"
      dense
      v-model="rememberMe"
      label="Remember me"
    ></q-checkbox>
    <q-space />
    <q-btn color="teal" label="Login" @click="login" class="q-mt-sm" />
  </div>
</template>

<script>
import DataService from 'src/services/DataService';
import axios from 'axios';
import { mapActions } from 'vuex';

function setAxiosHeaders(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export default {
  data() {
    return {
      username: null,
      password: null,
      rememberMe: false,
      value: false,
      isPwdNew: true,
      otp: '',
      islogin: false
    };
  },
  methods: {
    ...mapActions('user', ['setToken', 'setUser']),
    ...mapActions(['setRememberMe']),
    ...mapActions('cart', ['updateCustomerId']),
    login() {
      this.$q.loading.show();
      //request to server
      DataService.post('user/login', {
        user_name: this.username,
        password: this.password,
        otp: this.otp,
        site: process.env.SITE
      }).then(response => {
        //console.log('response', response);
        this.$q.loading.hide();
        if (response.data.status === 'failed') {
          this.$q.notify({
            type: 'negative',
            message: `Wrong user Name or Password`
          });
        } else {
          if (this.otp.length < 6) {
            this.islogin = true;
          } else {
            this.islogin = false;
            if (response.data.token) {
              this.username = '';
              this.password = '';
              //console.log('login successfull', response.data);
              setAxiosHeaders(response.data.token);
              this.setToken(response.data.token);
              this.setUser(response.data.user);
              this.updateCustomerId(response.data.user.general_ledger_id);
              this.setRememberMe(this.rememberMe);
              this.$emit('close');
            }
          }
        }
      });
    },
    close(payload) {
      this.username = '';
      this.password = '';
      this.$emit('close');
    }
  }
};
</script>

<style></style>
