<template>
  <q-dialog v-model="showPincode">
    <q-card style="width: 300px">
      <q-card-section class="row items-center">
        <!-- <q-avatar icon="location_on" color="primary" text-color="white" /> -->
        <span class=""
          >Enter your pincode to check availability and faster search
          results.</span
        >
        <div class="q-mt-sm col-12">
          <q-input
            type="number"
            dense
            step="1"
            outlined
            placeholder="Enter pincode"
          ></q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          icon="check_circle"
          label="Save"
          color="primary"
          @click="close"
        />

        <q-btn
          icon="cancel"
          label="Don't Ask"
          color="secondary"
          @click="close"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ['showPincode'],
  data() {
    return {
      toolbar: this.showPincode
    };
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>
