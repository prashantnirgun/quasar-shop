<template>
  <q-dialog v-model="modalShow" persistent>
    <q-card style="min-width: 40vw">
      <div class="row">
        <div
          class="col-xs-12 col-md-4 q-pa-sm text-center"
          style="background-color: #1f509e"
        >
          <div class="row items-center justify-center full-height">
            <div class="col-xs-12 text-center">
              <img :src="getLogo" width="30%" height="50px" />

              <q-btn
                icon="close"
                v-if="isMobile"
                flat
                round
                color="white"
                class="float-right"
                @click="close"
              />
              <div
                v-if="isDesktop"
                class="text-weight-bolder text-white text-h6"
              >
                {{ siteName }}
              </div>
              <div v-if="isDesktop" class="text-caption text-white">
                {{ site_full_name }}
              </div>
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
            <q-card-section
              :style="{ height: getSize }"
              class="no-padding no-margin"
            >
              <sign-in v-if="!value" @close="close" />
              <sign-up v-else @close="close" />
            </q-card-section>
          </div>
          <div>
            <q-separator inset></q-separator>
            <div class="q-pa-sm">
              <q-item dense clickable>
                <q-item-section class="text-right" @click="value = false">
                  <q-item-label dense>Login </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-toggle v-model="value" dense width="50px" />
                </q-item-section>
                <q-item-section class="float-left" @click="value = true">
                  <q-item-label dense>Register </q-item-label>
                </q-item-section>
              </q-item>
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
  watch: {
    show(newVal) {
      console.log('inside show watcher', newVal);
      this.modalShow = newVal;
    }
  },
  data() {
    return {
      modalShow: this.show,
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
      this.modalShow = false;
      this.$emit('close');
    }
  },
  computed: {
    getLogo() {
      return this.isDesktop
        ? '/images/logo.png'
        : '/images/logo-horizontal.png';
    },
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
    },
    getSize() {
      return this.isDesktop ? '350px' : '350px';
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
