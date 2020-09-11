<template>
  <!-- <div class="q-pa-md row items-start q-gutter-md"> -->
  <q-card class="col-6 col-sm-12 col-xs-12" flat bordered>
    <q-card-section>
      <div class="q-px-sm col-12">
        {{ data.full_name }}
      </div>

      <div class="row">
        <div class="q-px-sm col-6 col-md-6">
          {{ data.state_id }}
        </div>

        <div class="q-px-sm col-6 col-md-6">
          {{ data.telephone }}
        </div>
      </div>

      <div class="row">
        <div class="q-px-sm col-12">
          {{ data.apartment }}
        </div>
      </div>
      <div class="row">
        <div class="q-px-sm col-12">
          {{ data.area }}
        </div>
      </div>
      <div class="row">
        <div class="q-px-sm col-12">
          {{ data.landmark }}
        </div>
      </div>
      <div class="row">
        <div class="q-px-sm col-12">
          {{ data.city }}
        </div>
      </div>
      <div class="row">
        <div class="q-px-sm col-12">
          {{ data.email }}
        </div>

        <div class="q-px-sm col-6 col-md-6">
          {{ data.pincode }}
        </div>
      </div>
      <div class="row">
        <q-btn
          label="Delivered to this address"
          color="primary"
          class="q-ma-sm"
          icon="local_shipping"
        />
      </div>
      <div class="row">
        <q-btn label="Edit" color="primary" class="q-ma-sm" icon="create" />
        <q-space />
        <q-btn
          label="Delete"
          color="deep-orange"
          class="q-ma-sm"
          icon="cancel"
        />
      </div>
    </q-card-section>
  </q-card>
  <!-- </div> -->
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      // data: {
      //   full_name: 'Prashant Nirgun',
      //   apartment: '15 Anand CHS,',
      //   landmark: 'Opp Atlanta Tower,',
      //   area: 'Mulund East,',
      //   city: 'Mumbai',
      //   email: 'prashant_nirgun@yahoo.com',
      //   pincode: 400081,
      //   is_default: true
      // }
    };
  }
};
</script>

<style></style>
