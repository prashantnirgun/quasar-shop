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
              <div class="text-caption text-white">
                some text goes here
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-8">
          <div class="q-pa-sm">
            <div class="text-h6">Welcome {{ siteName }}</div>
            <div>Some more text</div>
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
              v-model="remember_me"
              label="Remember me"
            ></q-checkbox>
          </div>
          <div>
            <q-separator inset></q-separator>
            <div class="q-pa-sm">
              <q-btn flat label="Login" v-close-popup></q-btn>
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
export default {
  props: ['show', 'closeAction'],
  data() {
    return {
      username: 'admin',
      password: 'admin',
      remember_me: false
    };
  },

  methods: {
    close(payload) {
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
