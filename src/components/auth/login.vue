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
              <div class="text-caption text-white">{{ site_full_name }}</div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-8">
          <div class="q-pa-sm">
            <q-card-section class="row items-center q-py-none" v-if="isDesktop">
              <div class="text-h6 col">{{ site_full_name }}</div>
              <q-btn icon="close" flat round dense @click="close" />
            </q-card-section>
            <div class="q-ml-md" v-if="isDesktop">{{ slogen }}</div>
            <q-separator v-if="isDesktop" />
            <q-card-section style="height: 250px">
              <sign-in v-if="!value" @close="close" />
              <sign-up v-else />
            </q-card-section>

            <!-- <q-input
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
            ></q-checkbox> -->
          </div>
          <div>
            <q-separator inset></q-separator>
            <div class="q-pa-sm">
              <!-- <q-btn flat label="Login" @click="login" /> -->
              <q-item clickable>
                <q-item-label
                  >Login
                  <q-toggle v-model="value" class="text-subtitle1" />
                  Register
                </q-item-label>
              </q-item>
              <!-- <q-btn
                flat
                class="float-right text-blue-9 text-capitalize"
                label="Sign Up"
              /> -->
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import device_mixin from 'src/mixins/device_mixin';

export default {
  props: ['show', 'closeAction'],
  mixins: [device_mixin],
  data() {
    return {
      // username: null,
      // password: null,
      // rememberMe: false,
      value: false
    };
  },
  components: {
    'sign-in': () => import('./SignIn'),
    'sign-up': () => import('./SignUp')
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
  computed: {
    siteName() {
      return process.env.SITE_NAME;
    },
    slogen() {
      return process.env.SITE_SLOGEN;
    },
    site_full_name() {
      return process.env.SITE_FULL_NAME;
    },
    mode() {
      return this.value ? 'Login' : 'Register';
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
