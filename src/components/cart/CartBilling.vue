<template>
  <div>
    <div>
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
                <q-input
                  dense
                  class="col-6 q-pa-xs"
                  clearable
                  outlined
                  v-model="user.mobile"
                  label="Telephone No"
                />
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
                <q-input
                  dense
                  class="col-6 q-pa-xs"
                  clearable
                  outlined
                  v-model="user.email_id"
                  label="Email"
                />
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
                        <q-date v-model="user.date" mask="DD-MM-YYYY">
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
            <div v-for="(row, index) in this.address" :key="index">
              <shipping-address
                :data="row"
                @editAddress="doAction"
                class="q-ma-sm"
              />
            </div>
            <shipping-address />
          </div>
        </q-expansion-item>
      </q-list>
    </div>

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
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    'shipping-address': () => import('./ShippingAddress'),
    'shipping-address-create-update': () =>
      import('./ShippingAddressCreateUpdate')
  },
  data() {
    return {
      text: null,
      show: false,
      address: [],
      user: { full_name: null, dob: null, mobile: null, email_id: null }
      // deliveryAddressId: 0,
      // defaultAddressId: 0
    };
  },
  computed: {},
  methods: {
    ...mapActions('cart', [
      'updateDeliveryAddress',
      'updateDefaultDeliveryAddress'
    ]),
    doAction(payload) {
      this.show = true;
      if (payload.action === 'New') {
        this.$refs.shippingAddressCreateUpdate.newData();
      } else {
        this.$refs.shippingAddressCreateUpdate.updateData(payload.data);
      }
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
  created() {
    this.getAddress();
  }
};
</script>

<style lang="sass" scoped></style>
