<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 40vw">
      <div class="row">
        <div
          class="col-xs-12 col-md-4 q-pa-sm text-center"
          style="background-color: #1f509e"
        >
          <div class="row items-center justify-center full-height">
            <div class="col-xs-12 text-center">
              <img src="/images/logo.png" width="30%" />
              <div class="text-weight-bolder text-white text-h6">
                {{ siteName }}
              </div>
              <div class="text-caption text-white">some text goes here</div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-8">
          <div class="q-pa-sm">
            <q-card-section class="row items-center q-py-none">
              <div class="text-h6 col">Welcome {{ siteName }}</div>
              <q-btn icon="close" flat round dense @click="close" />
            </q-card-section>
            <div class="q-ml-md">Some more text</div>
            <q-separator></q-separator>

            <q-input
              class="q-ma-sm"
              dense
              outlined
              v-model="username"
              label="Username"
              lazy-rules
            ></q-input>
            <q-input
              dense
              class="q-ma-sm"
              type="password"
              outlined
              v-model="password"
              label="Password"
              lazy-rules
            ></q-input>
            <q-checkbox
              class="text-grey-8"
              dense
              v-model="rememberMe"
              label="Remember me"
            ></q-checkbox>
          </div>
          <div>
            <q-separator inset></q-separator>
            <div class="q-pa-sm">
              <q-btn flat label="Login" @click="login"></q-btn>
              <q-btn
                flat
                class="float-right text-blue-9 text-capitalize"
                label="Sign Up"
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import DataService from 'src/services/DataService';
import axios from 'axios';
import { mapActions } from 'vuex';

function setAxiosHeaders(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export default {
  props: ['show', 'closeAction'],
  data() {
    return {
      username: null,
      password: null,
      rememberMe: false
    };
  },

  methods: {
    ...mapActions('user', ['setToken', 'setUser']),
    ...mapActions(['setRememberMe']),
    login() {
      this.$q.loading.show();
      //request to server
      DataService.post('user/login', {
        user_name: this.username,
        password: this.password
      }).then(response => {
        //console.log('response', response);
        this.$q.loading.hide();
        if (response.data.token) {
          this.username = '';
          this.password = '';
          console.log('login successfull', response.data);
          setAxiosHeaders(response.data.token);
          this.setToken(response.data.token);
          this.setUser(response.data.user);
          this.setRememberMe(this.rememberMe);
          this.$emit('close');
        } else {
          this.$q.notify({
            type: 'negative',
            message: `Wrong user Name or Password`
          });
        }
      });
    },
    close(payload) {
      this.username = '';
      this.password = '';
      this.$emit('close');
    }
  },
  computed: {
    siteName() {
      return process.env.SITE_NAME;
    }
  }
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
  height: 100%
</style>
