<template>
  <div>
    <div v-if="!proceedCart">
      <div>
        You don't have login to website Do you wish to Login for recurring
        customer OR Continue as Guest ?
      </div>
      <q-btn
        color="primary"
        label="Login / Sigun Up"
        class="q-ma-lg"
        @click="loginRequest('Login')"
      />

      <q-btn
        outline
        color="primary"
        label="Guest"
        @click="loginRequest('Guest')"
      />
    </div>
    <guest-user
      v-if="guest"
      @addressValidation="$emit('addressValidation', $event)"
    />

    <login-user
      v-if="isUserLoggedIn"
      @addressValidation="$emit('addressValidation', $event)"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  components: {
    'guest-user': () => import('./CartBillingGuest'),
    'login-user': () => import('./CartBillingLoginUser')
  },
  data() {
    return {
      form: 'form_logged_user_address',
      show: false,
      address: [],
      guest: this.guestLogin,
      user: { full_name: null, dob: null, mobile: null, email_id: null }
    };
  },
  computed: {
    ...mapState(['guestLogin']),
    ...mapGetters(['isUserLoggedIn']),
    ...mapGetters('user', ['general_ledger_id']),
    ...mapGetters(['addressValidationCounter']),
    proceedCart() {
      return this.isUserLoggedIn || this.guest;
    }
  },
  methods: {
    ...mapActions('cart', ['findGuestId', 'setUserType']),
    ...mapActions(['setLoginRequest', 'setGuestLogin']),

    loginRequest(method) {
      let customerId = 0;
      if (method === 'Login') {
        this.setLoginRequest(true);
      } else {
        this.guest = true;
        this.setGuestLogin(true);
        this.findGuestId();
        this.setUserType('G');
      }
    }
  },
  mounted() {
    this.guest = this.guestLogin;
    console.log('inside mounted', this.isUserLoggedIn);
    console.log('isUserLoggedIn', this.guestLogin);
    window.scrollTo(0, 0);
  }
};
</script>

<style lang="sass" scoped></style>
