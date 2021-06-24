<template>
  <div class="row justify-center q-gutter-lg q-mt-lg bg-white">
    <q-card
      class="text-center col-md-2 col-sm-10 col-xs-10 bg-primary text-white"
    >
      <q-avatar
        size="100px"
        font-size="100px"
        icon="location_on"
        class="q-mt-sm"
      />

      <q-card-section>
        <div class="text-h6">ADDRESS</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-h7 q-mt-sm">
          M-874, "M" wing, APMC Market, Sector-19,
        </div>
        <div class="text-h7">Turbhe, Navi Mumbai - 400 705,</div>
        <div class="text-h7">Maharashtra, India</div>
      </q-card-section>
    </q-card>

    <q-card
      class="text-center col-md-2 col-sm-10 col-xs-10 bg-primary text-white"
    >
      <q-avatar size="100px" font-size="100px" icon="phone" class="q-mt-sm" />

      <q-card-section>
        <div class="text-h6">PHONE</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-h7 q-mt-sm">
          <a
            href="tel:9867111739"
            class="text-white"
            style="text-decoration: none;"
            >Tanaji : 91-9867111739</a
          >
        </div>
        <div class="text-h7 q-mt-sm">
          <a
            href="tel:9920060859"
            class="text-white"
            style="text-decoration: none;"
            >Anil : 91-9920060859</a
          >
        </div>
        <div class="text-h7 q-mt-sm">
          <a
            href="tel:02227831775"
            class="text-white"
            style="text-decoration: none;"
            >Office : 022-27831775</a
          >
        </div>
      </q-card-section>
    </q-card>

    <q-card
      class="text-center col-md-2 col-sm-10 col-xs-10 bg-primary text-white"
    >
      <q-avatar size="100px" font-size="100px" icon="email" class="q-mt-sm" />

      <q-card-section>
        <div class="text-h6">EMAIL</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-h7 q-mt-sm">
          info@saikrupaenterprises.in
        </div>
      </q-card-section>
    </q-card>

    <q-card
      class="text-center col-md-2 col-sm-10 col-xs-10 bg-primary text-white"
    >
      <q-avatar
        size="100px"
        font-size="100px"
        icon="account_balance"
        class="q-mt-md"
      />

      <q-card-section>
        <div class="text-h6">BANK</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-h7 q-mt-sm">
          Sai Krupa Enterprises,
        </div>
        <div class="text-h7">HDFC Bank Ltd.</div>
        <div class="text-h7">Turbhe Vashi Branch</div>
        <div class="text-h7">A/c No : 10307630000479</div>
        <div class="text-h7">IFSC : HDFC0001030</div>
      </q-card-section>
    </q-card>

    <div class="col-md-6 col-xs-11 col-sm-11">
      <q-form
        ref="form_contact"
        @submit.prevent.stop="onSubmit"
        class="q-gutter-sms"
      >
        <div class="column">
          <q-input
            dense
            ref="name"
            v-model="data.name"
            outlined
            label="Name"
            class="q-pa-sm"
            :rules="[val => !!val || 'Field is required']"
          />
          <q-input
            dense
            ref="mail"
            v-model="data.mail"
            outlined
            label="Email"
            class="q-pa-sm"
            :rules="[emailRule]"
          />
          <q-select
            ref="department"
            v-model="data.department"
            outlined
            :options="DepartmentList"
            label="Department"
            class="q-pa-sm"
          />
          <q-input
            dense
            ref="message"
            v-model="data.message"
            outlined
            type="textarea"
            class="q-pa-sm"
          />
          <q-btn
            dense
            icon="mail"
            label="Send Message"
            type="submit"
            color="primary"
            class="q-pa-sm"
            :rules="[val => !!val || 'Field is required']"
          />
        </div>
      </q-form>
    </div>

    <div class="row">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.579960718999!2d73.0089505149012!3d19.082196887084407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c13aa2298891%3A0x366df2e98516904b!2sSAI%20KRUPA%20ENTERPRISES!5e0!3m2!1sen!2sin!4v1622734378998!5m2!1sen!2sin"
        width="100%"
        height="450"
        frameborder="0"
        style="border: 0;"
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
import DataService from 'src/services/DataService';
import { emailRule } from 'src/services/Validation';

export default {
  data() {
    return {
      data: this.newData(),
      DepartmentList: ['Sales', 'Accounts', 'Operation'],
      url: 'https://placeimg.com/500/300/nature'
    };
  },
  methods: {
    emailRule,
    onSubmit() {
      this.$refs.form_contact
        .validate()
        .then(valid => {
          //console.log('inside valid', valid, this.data);
          let URL = `email/contact`;
          //this.data = this.newData();
          //this.$refs.form_contact.reset();
          //this.$refs.form_contact.resetValidation();

          DataService.post(URL, { ...this.data })
            .then(response => {
              console.log(
                'data',
                response.data,
                response.data.status === 'success'
              );
              this.data = this.newData();
              this.$refs.form_contact.resetValidation();
              let type =
                response.data.status === 'success' ? 'positive' : 'negative';
              let message =
                response.data.status === 'success'
                  ? 'Message send sucessfully'
                  : 'Message could not be send';

              this.$q.notify({
                type,
                message
              });
            })
            .catch(error => {
              console.log('mixin/ddlb Error', error);
              this.$q.notify({
                type: 'negative',
                message: 'Message could not be send'
              });
            });
        })
        .catch(() => {});
    },
    newData() {
      return {
        name: null,
        mail: null,
        department: 'Sales',
        message: null
      };
    }
  }
};
</script>

<style></style>
