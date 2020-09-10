<template>
  <div>
    <div>
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          label="Personal Infomation"
          icon="perm_identity"
          header-class="text-black"
        >
          <q-card>
            <q-card-section>
              <q-input
                class="q-pa-xs"
                clearable
                outlined
                v-model="user.full_name"
                label="Full Name"
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
                  v-model="user.mobile"
                  label="Alternate No"
                />
              </div>
              <div class="row">
                <q-input
                  class="col-6 q-pa-xs"
                  clearable
                  outlined
                  v-model="user.email"
                  label="Email"
                />
                <q-input
                  outlined
                  v-model="date"
                  mask="date"
                  :rules="['date']"
                  class="col-6 q-pa-xs"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
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
            <q-card-section>
              <q-btn
                label="Update"
                color="primary"
                class="q-ma-sm"
                icon="backup"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
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
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="location_on"
          label="Shipping Information"
          header-class="text-orange"
        >
          <div>
            <q-btn
              label="New Address"
              type="submit"
              color="secondary"
              icon="add_circle"
              class="q-ma-sm"
              @click="show = true"
            />
          </div>
          <div class="row wrap q-ma-sm">
            <div v-for="(row, index) in this.address" :key="index">
              <shipping-address :data="row" />
            </div>
            <shipping-address />
          </div>
        </q-expansion-item>
      </q-list>
    </div>

    <shipping-address-create-update :show="show" @close="show = false" />
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import DataService from 'src/services/DataService';

export default {
  components: {
    'shipping-address': () => import('./ShippingAddress'),
    'shipping-address-create-update': () =>
      import('./ShippingAddressCreateUpdate')
  },
  data() {
    return {
      text: null,
      date: '2019/02/01',
      show: false,
      address: [],
      user: null
    };
  },
  computed: {},
  methods: {},
  created() {
    DataService.get(`address`)
      .then(response => {
        this.address = response.data.rows;
        this.user = {
          full_name: this.address[0].full_name,
          email: this.address[0].email_id,
          mobile: this.address[0].mobile
        };
        console.log('address', response, this.user);
      })
      .catch(error => {
        console.log('mixin/ddlb Error', error);
      });
  }
};
</script>

<style lang="sass" scoped></style>
