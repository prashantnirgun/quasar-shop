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
//import DataService from 'src/services/DataService';
//import { isDateValid, isPhoneNumber, required } from 'src/services/Validation';
import { mapGetters, mapActions, mapState } from 'vuex';
//import common_mixin from 'src/mixins/common_mixin';
//import form_mixin from 'src/mixins/form_mixin';

export default {
  watch: {
    // isUserLoggedIn(newVal) {
    //   newVal ? this.getAddress() : null;
    // },
    // addressValidationCounter(newVal, oldVal) {
    //   console.log('going to call validation', newVal);
    //   if (newVal) {
    //     this.onSubmit();
    //   }
    // }
  },
  //mixins: [common_mixin, form_mixin],
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
    s(val) {
      console.log('inside s value recieved', val);
    },
    //isPhoneNumber,
    //required,
    //isDateValid,
    // async onSubmit() {
    //   const ans = await this.validateForm();
    //   if (ans) {
    //     this.updateBillingAddress({
    //       telephone: this.user.mobile,
    //       email_id: this.user.email_id
    //     });
    //     this.$emit('addressValidation', true);
    //   }
    //   console.log('answer is', ans);
    // },

    ...mapActions('cart', [
      //   'updateDeliveryAddress',
      //   'updateBillingAddress',
      'findGuestId'
      //   'updateCustomerId'
    ]),
    ...mapActions(['setLoginRequest', 'setGuestLogin']),

    loginRequest(method) {
      let customerId = 0;
      if (method === 'Login') {
        this.setLoginRequest(true);
      } else {
        this.guest = true;
        this.setGuestLogin(true);
        this.findGuestId();
      }
    }
    // doAction(payload) {
    //   switch (payload.action) {
    //     case 'New':
    //       this.show = true;
    //       this.$refs.shippingAddressCreateUpdate.newData();
    //       break;
    //     case 'Remove':
    //       this.deleteAddress(payload.address_id);
    //       break;
    //     default:
    //       this.show = true;
    //       this.$refs.shippingAddressCreateUpdate.updateData(payload.data);
    //       break;
    //   }
    // },
    // deleteAddress(address_id) {
    //   DataService.delete(`address?address_id=${address_id}`)
    //     .then(response => {
    //       this.getAddress();
    //     })
    //     .catch(error => {
    //       console.log('mixin/ddlb Error', error);
    //     });
    // },
    // getAddress() {
    //   this.$q.loading.show();
    //   DataService.get(`address`)
    //     .then(response => {
    //       this.$q.loading.hide();
    //       console.log('address received', response.data);
    //       this.user = response.data.user[0];
    //       this.address = response.data.address;
    //       const defaultAddress = this.address.find(
    //         obj => obj.is_default === 'Y'
    //       );
    //       console.log('address received', defaultAddress);
    //       if (defaultAddress.status === 'Close') {
    //         console.log(
    //           'delivery address not reachable',
    //           defaultAddress.status
    //         );
    //       }

    //       this.updateDeliveryAddress({
    //         ...defaultAddress,
    //         email_id: this.user.email_id
    //       });

    //       this.updateBillingAddress({
    //         ...defaultAddress,
    //         email_id: this.user.email_id
    //       });
    //     })
    //     .catch(error => {
    //       console.log('mixin/ddlb Error', error);
    //     });
    // },
    // closeModal(payload) {
    //   this.show = false;
    //   if (payload && payload.action === true) {
    //     this.getAddress();
    //   }
    // }
  },
  mounted() {
    this.guest = this.guestLogin;
    console.log('inside mounted', this.isUserLoggedIn);
    console.log('isUserLoggedIn', this.guestLogin);
    window.scrollTo(0, 0);
    // if (this.isUserLoggedIn) {
    //   //this.getAddress();
    //   //this.updateCustomerId(this.general_ledger_id);
    // } else {
    //   console.log('not loggedin user dont fetech rows');
    // }
  }
};
</script>

<style lang="sass" scoped></style>
