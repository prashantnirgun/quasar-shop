<template>
  <modal
    :show="show"
    title="Address Create / Update"
    icon="add_box"
    @close="close"
    @open="open"
  >
    <q-form ref="form_address" @submit.prevent.stop="onSubmit" @reset="newData">
      <div class="row q-px-sm q-pt-sm">
        <div class="col-12">
          <q-input
            dense
            outlined
            v-model="data.full_name"
            label="Full Name*"
            :rules="[val => !!val || '* Required']"
          />
        </div>
      </div>

      <div class="row q-px-sm q-pt-sm">
        <div class="col-12">
          <q-input
            dense
            outlined
            type="text"
            v-model="data.apartment"
            label="House No / Apartment*"
            :rules="[required]"
          />
        </div>
      </div>
      <div class="row q-px-sm q-pt-sm">
        <div class="col-12">
          <q-input
            dense
            outlined
            type="text"
            v-model="data.area"
            label="Area*"
            :rules="[required]"
          />
        </div>
      </div>
      <div class="row q-px-sm q-pt-sm">
        <div class="col-12">
          <q-input dense outlined v-model="data.landmark" label="Landmark" />
        </div>
      </div>

      <div class="row  q-pt-sm">
        <div class="col-6 q-px-sm">
          <q-input
            dense
            outlined
            v-model="data.city"
            label="City"
            :rules="[required]"
          />
        </div>

        <div class="col-6 q-px-sm">
          <q-input
            dense
            outlined
            type="number"
            v-model="data.telephone"
            label="Telephone*"
            :rules="[val => !!val || '* Required']"
          />
        </div>
      </div>
      <div class="row  q-pt-sm">
        <div class="q-px-sm col-6 col-md-6">
          <q-input
            dense
            outlined
            type="text"
            v-model="data.pincode"
            label="Pincode*"
          />
        </div>

        <div class="q-px-sm col-6 col-md-6">
          <q-select
            dense
            outlined
            v-model="data.is_default"
            :options="yesNoOptions"
            label="Default Address"
            emit-value
            map-options
          />
        </div>
      </div>
      <div class="row q-pa-sm">
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="deep-orange" class="q-ml-sm" />
      </div>
    </q-form>
  </modal>
</template>

<script>
import DataService from 'src/services/DataService';
import { required } from 'src/services/Validation';
import form_mixin from 'src/mixins/form_mixin';

const tableName = 'address';
export default {
  props: ['show'],
  mixins: [form_mixin],
  components: {
    modal: () => import('components/BaseModal')
  },
  data() {
    return {
      table: tableName,
      primary: {},
      form: 'form_' + tableName,
      data: this.newData(),
      yesNoOptions: [
        {
          label: 'Yes',
          value: 'Y'
        },
        {
          label: 'No',
          value: 'N'
        }
      ],
      stateList: []
    };
  },
  methods: {
    required,
    async open() {
      // let response = await this.get(`ddlb/state`);
      // this.stateList = JSON.parse(JSON.stringify(response.rows));
    },
    async onSubmit() {
      const ans = await this.validateForm();
      let payload = { action: false };
      if (ans) {
        let data = this.data;
        DataService.post(`address`, { ...data })
          .then(response => {
            payload = { action: true };
            this.close(payload);
          })
          .catch(error => {
            console.log('mixin/ddlb Error', error);
          });
      } else {
        this.close(payload);
      }
    },
    close(payload) {
      this.data = this.newData();
      this.$emit('close', !payload ? { action: false } : payload);
    },
    newData() {
      const company_id = this.$store.state.user.user
        ? this.$store.state.user.user.company_id
        : 0;
      this.primary = [];
      return {
        address_id: 0,
        company_id: company_id,
        general_ledger_id: 0,
        full_name: null,
        telephone: null,
        country_id: 101,
        state_id: 21,
        pincode: 0,
        apartment: null,
        area: null,
        landmark: null,
        city: null,
        email: null,
        is_default: 'N'
      };
    },
    updateData(data) {
      this.data = data;
    }
  }
};
</script>

<style></style>
