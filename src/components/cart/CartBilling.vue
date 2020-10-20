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
    <div v-if="isUserLoggedIn">
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          label="Personal Infomation"
          icon="perm_identity"
          header-class="text-black"
          default-opened
        >
          <q-form
            ref="form_logged_user_address"
            @submit.prevent.stop="onSubmit"
          >
            <q-card>
              <q-card-section>
                <q-input
                  dense
                  class="q-pa-xs"
                  clearable
                  outlined
                  v-model="user.full_name"
                  label="Full Name"
                  :rules="[required]"
                />
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-input
                      ref="telephone"
                      dense
                      class="col-6 q-pa-xs"
                      clearable
                      outlined
                      v-model="user.mobile"
                      label="Telephone No"
                      :rules="[isPhoneNumber]"
                    />
                  </div>
                  <!-- <q-input
                dense
                  class="col-6 q-pa-xs"
                  clearable
                  outlined
                  v-model="user.mobile"
                  label="Alternate No"
                /> -->
                </div>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-input
                      dense
                      class="col-6 q-pa-xs"
                      clearable
                      outlined
                      v-model="user.email_id"
                      label="Email"
                    />
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-input
                      dense
                      outlined
                      v-model="user.dob"
                      mask="##-##-####"
                      :rules="[isDateValid]"
                      class="col-6 q-pa-xs"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            ref="qDateProxy"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="user.dob" mask="DD-MM-YYYY">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-form>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="location_on"
          label="Shipping Information"
        >
          <div>
            <q-btn
              outline
              label="Add Address"
              type="submit"
              color="secondary"
              icon="add_circle"
              class="q-ma-sm"
              @click="doAction({ action: 'New' })"
            />
          </div>

          <div class="row wrap q-ma-sm" v-if="this.address.length > 0">
            <div
              v-for="(row, index) in this.address"
              :key="index"
              class="col-md-6 col-lg-6 col-sm-12 col-xs-12 q-my-xs"
            >
              <shipping-address
                :data="row"
                @editAddress="doAction"
                class=""
                @removeAddress="doAction"
              />
            </div>
            <!-- <shipping-address /> -->
          </div>
        </q-expansion-item>
      </q-list>
    </div>
    <guest-user
      v-if="guest"
      @addessValidation="$emit('addresssValidation', $event)"
    />
    <shipping-address-create-update
      :show="show"
      @close="closeModal"
      ref="shippingAddressCreateUpdate"
    />
  </div>
</template>
<script>
import DataService from 'src/services/DataService';
import { isDateValid, isPhoneNumber, required } from 'src/services/Validation';
import { mapGetters, mapActions, mapState } from 'vuex';
import common_mixin from 'src/mixins/common_mixin';
import form_mixin from 'src/mixins/form_mixin';

export default {
  // props: ['guestValidation'],
  watch: {
    isUserLoggedIn(newVal) {
      newVal ? this.getAddress() : null;
    },
    addressValidationCounter(newVal, oldVal) {
      console.log('going to call validation', newVal);
      if (newVal) {
        this.onSubmit();
      }
    }
  },
  mixins: [common_mixin, form_mixin],
  components: {
    'shipping-address': () => import('./ShippingAddress'),
    'shipping-address-create-update': () =>
      import('./ShippingAddressCreateUpdate'),
    'guest-user': () => import('./CartBillingGuest')
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
    ...mapState(['isUserLoggedIn', 'guestLogin']),
    ...mapGetters('user', ['general_ledger_id']),
    ...mapGetters(['addressValidationCounter']),
    proceedCart() {
      return this.isUserLoggedIn || this.guest;
    }
  },
  methods: {
    isPhoneNumber,
    required,
    isDateValid,
    async onSubmit() {
      console.log('telephone', this.$refs.telephone.validate());

      const ans = await this.validateForm();
      if (ans) {
        this.updateBillingAddress({
          telephone: this.user.mobile,
          email_id: this.user.email_id
        });
        this.$emit('addressValidation', true);
      }
      console.log('answer is', ans);
    },

    ...mapActions('cart', [
      'updateDeliveryAddress',
      'updateBillingAddress',
      'findGuestId',
      'updateCustomerId'
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
    },
    doAction(payload) {
      switch (payload.action) {
        case 'New':
          this.show = true;
          this.$refs.shippingAddressCreateUpdate.newData();
          break;
        case 'Remove':
          this.deleteAddress(payload.address_id);
          break;
        default:
          this.show = true;
          this.$refs.shippingAddressCreateUpdate.updateData(payload.data);
          break;
      }
    },
    deleteAddress(address_id) {
      DataService.delete(`address?address_id=${address_id}`)
        .then(response => {
          this.getAddress();
        })
        .catch(error => {
          console.log('mixin/ddlb Error', error);
        });
    },
    getAddress() {
      this.$q.loading.show();
      DataService.get(`address`)
        .then(response => {
          this.$q.loading.hide();
          console.log('address received', response.data);
          this.user = response.data.user[0];
          this.address = response.data.address;
          const defaultAddress = this.address.find(
            obj => obj.is_default === 'Y'
          );
          console.log('address received', defaultAddress);
          if (defaultAddress.status === 'Close') {
            console.log(
              'delivery address not reachable',
              defaultAddress.status
            );
          }

          this.updateDeliveryAddress({
            ...defaultAddress,
            email_id: this.user.email_id
          });

          this.updateBillingAddress({
            ...defaultAddress,
            email_id: this.user.email_id
          });
        })
        .catch(error => {
          console.log('mixin/ddlb Error', error);
        });
    },
    closeModal(payload) {
      this.show = false;
      if (payload && payload.action === true) {
        this.getAddress();
      }
    }
  },
  mounted() {
    this.guest = this.guestLogin;
    console.log(
      'inside mounted',
      'isUserLoggedIn',
      this.isUserLoggedIn,
      'general_ledger_id',
      this.general_ledger_id
    );
    window.scrollTo(0, 0);
    if (this.isUserLoggedIn) {
      this.getAddress();
      this.updateCustomerId(this.general_ledger_id);
    } else {
      console.log('not loggedin user dont fetech rows');
    }
  }
};
</script>

<style lang="sass" scoped></style>
