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
          <q-card>
            <q-card-section>
              <q-input
                dense
                class="q-pa-xs"
                clearable
                outlined
                v-model="user.full_name"
                label="Full Name"
              />
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    class="col-6 q-pa-xs"
                    clearable
                    outlined
                    v-model="user.mobile"
                    label="Telephone No"
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
                    :rules="['isDateValid']"
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
            <!-- <q-card-section>
              <q-btn
                dense
                label="Update"
                color="primary"
                class="q-ma-sm"
                icon="backup"
              />
            </q-card-section> -->
          </q-card>
        </q-expansion-item>

        <!-- <q-expansion-item
          expand-separator
          icon="business"
          label="Company Infomation"
          header-class="text-purple"
        >
          <q-card>
            <q-card-section>
              <q-input
                class="q-pa-xs"
                clearable
                outlined
                v-model="text"
                label="Company Name"
              />
              <div class="row">
                <q-input
                  class="col-6 q-pa-xs"
                  clearable
                  outlined
                  v-model="text"
                  label="Telephone No"
                />
                <q-input
                  class="col-6 q-pa-xs"
                  clearable
                  outlined
                  v-model="text"
                  label="Alternate No"
                />
              </div>
              <div class="row">
                <q-input
                  class="col-6 q-pa-xs"
                  clearable
                  outlined
                  v-model="text"
                  label="Email"
                />
                <q-input
                  class="col-6 q-pa-xs"
                  clearable
                  outlined
                  v-model="text"
                  label="GST No"
                />
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item> -->

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
    <guest-user v-if="guest" />
    <shipping-address-create-update
      :show="show"
      @close="closeModal"
      ref="shippingAddressCreateUpdate"
    />
  </div>
</template>
<script>
import DataService from 'src/services/DataService';
import { isDateValid } from 'src/services/Validation';
import { mapActions, mapState } from 'vuex';

export default {
  // props: ['guestValidation'],
  watch: {
    isUserLoggedIn(newVal) {
      newVal ? this.getAddress() : null;
    }
  },
  components: {
    'shipping-address': () => import('./ShippingAddress'),
    'shipping-address-create-update': () =>
      import('./ShippingAddressCreateUpdate'),
    'guest-user': () => import('./CartBillingGuest')
  },
  data() {
    return {
      text: null,
      show: false,
      address: [],
      guest: this.guestLogin,
      user: { full_name: null, dob: null, mobile: null, email_id: null }
      // deliveryAddressId: 0,
      // defaultAddressId: 0
    };
  },
  computed: {
    ...mapState(['isUserLoggedIn', 'guestLogin']),
    proceedCart() {
      return this.isUserLoggedIn || this.guest;
    }
  },
  methods: {
    ...mapActions('cart', [
      'updateDeliveryAddress',
      'updateDefaultDeliveryAddress'
    ]),
    ...mapActions(['setLoginRequest', 'setGuestLogin']),

    loginRequest(method) {
      if (method === 'Login') {
        this.setLoginRequest(true);
      } else {
        this.guest = true;
        this.setGuestLogin(true);
        //this.setGuestValidation(false);
      }
    },
    doAction(payload) {
      switch (payload.action) {
        case 'New':
          this.show = true;
          this.$refs.shippingAddressCreateUpdate.newData();
          break;
        case 'Remove':
          //console.log('delete', payload);
          this.deleteAddress(payload.address_id);
          break;
        default:
          this.show = true;
          this.$refs.shippingAddressCreateUpdate.updateData(payload.data);
          break;
      }

      // if (payload.action === 'New') {
      //   this.$refs.shippingAddressCreateUpdate.newData();
      // } else {
      //   this.$refs.shippingAddressCreateUpdate.updateData(payload.data);
      // }
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
      DataService.get(`address`)
        .then(response => {
          this.user = response.data.user.rows[0];
          this.address = response.data.address.rows;
          const id = this.address.find(obj => obj.is_default === 'Y')
            .address_id;
          this.updateDeliveryAddress(id);
          this.updateDefaultDeliveryAddress(id);
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
    console.log('inside mounted', 'isUserLoggedIn', this.isUserLoggedIn);
    window.scrollTo(0, 0);
    if (this.isUserLoggedIn) {
      this.getAddress();
    } else {
      console.log('not loggedin user dont fetech rows');
    }
  }
};
</script>

<style lang="sass" scoped></style>
