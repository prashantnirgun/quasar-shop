<template>
  <q-dialog
    v-model="modalDialog"
    width="400px"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <div class="bg-white q-pa-lg">
      <q-form ref="form_otp" @submit.prevent.stop="onSubmit">
        <div class="row q-mb-sm">
          <slot></slot>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input
              dense
              clearable
              outlined
              v-model="otp_value"
              label="Enter OTP here"
              :rules="[required]"
              :type="dataType"
            />
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-12">{{ noInfo }}</div>
        </div>
        <div class="row q-gutter-sm">
          <q-btn
            icon="check_circle"
            label="Submit"
            color="positive"
            @click="verifyOTP"
          />
          <q-btn icon="cancel" label="Close" color="negative" @click="close" />
        </div>
      </q-form>
    </div>
  </q-dialog>
</template>

<script>
import { date } from 'quasar';
import DataService from 'src/services/DataService';
import { required } from 'src/services/Validation';
export default {
  props: ['show', 'message'],
  watch: {
    show(newVal) {
      this.modalDialog = newVal;
      console.log('modalDialg watch', newVal);
      if (newVal === true) {
        console.log('going to call sendOTP()');
        this.sendOTP();
      }
    }
  },
  data() {
    return {
      modalDialog: this.show,
      verification: false,
      otp_value: '',
      key_value: null,
      dataType: !!this.message.dataType ? this.message.dataType : 'text'
    };
  },
  methods: {
    required,
    onSubmit() {
      this.verifyOTP();
    },
    async verifyOTP() {
      if (this.otp_value.length > 3) {
        this.$q.loading.show();
        try {
          this.data = this.message;

          let result = await DataService.post(`verify-otp`, {
            key_value: this.key_value,
            otp_value: this.otp_value,
            company_id: process.env.COMPANY_ID,
            domain: process.env.DOMAIN
          });
          //this.data = result.data.rows;
          //this.data = result.data.rows;
          console.log(
            'response',
            result.data.rows[0].count,
            typeof result.data.rows[0].count
          );
          this.verification = result.data.rows[0].count === 1;
        } catch (error) {
          console.log('data', error);
          this.$q.notify({
            message: 'Sorry netwowrk error',
            color: 'negative',
            icon: 'warning'
          });
        } finally {
          this.$q.loading.hide();
          this.close();
        }
      }
    },
    async sendOTP() {
      try {
        let result = await DataService.post(`send-message`, this.message);
        console.log('response', result);
        this.key_value = result.data.rows.key_value;
      } catch (error) {
        console.log('data', error);
        this.$q.notify({
          message: 'Sorry netwowrk error',
          color: 'negative',
          icon: 'warning'
        });
      }
    },
    close() {
      this.$emit('close', this.verification);
      this.modalDialog = false;
      this.verification = false;
      this.otp_value = '';
      this.key_value = null;
    }
  },
  computed: {
    noInfo() {
      if (!!this.message.mobileNo) {
        let no = this.message.mobileNo.toString();
        console.log('inside computer', typeof no);
        return '6 digit OTP was send on ' + no.replace(/.(?=.{4})/g, 'x');
      } else {
        return '';
      }
    }
  },
  mounted() {}
};
</script>

<style></style>
