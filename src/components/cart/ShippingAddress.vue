<template>
  <q-card class="q-mx-xs shadow-4" flat bordered style="min-height: 200px;">
    <q-card-section>
      <div align="right" v-if="isDefault">
        <q-chip dense outline color="orange" icon-right="star">
          Default
        </q-chip>
      </div>

      <div class="q-px-sm text-weight-bold">
        {{ data.full_name }}
      </div>

      <div class="row">
        <div class="q-px-sm">
          {{ data.apartment }}
        </div>
      </div>
      <div class="row">
        <div class="q-px-sm">
          {{ data.area }}
        </div>
      </div>
      <div class="row">
        <div class="q-px-sm">
          {{ data.landmark }}
        </div>
      </div>
      <div class="row">
        <div class="q-px-sm">{{ data.city }} {{ data.pincode }}</div>
      </div>
      <div class="row">
        <div class="q-px-sm">
          {{ data.email }}
        </div>
      </div>

      <div class="row">
        <div class="q-px-sm">
          {{ data.state_name }}, {{ data.country_name }}
        </div>
      </div>
      <div class="row">
        <div class="q-px-sm">Phone : {{ data.telephone }}</div>
      </div>
      <div class="row q-mt-sm">
        {{ deliveryAddressState }}
        <q-toggle
          :value="deliveryAddressState"
          label="Delivery to this Address"
          @input="updateAddressState"
        />
      </div>
      <div class="row">
        <q-btn flat color="primary" size="12px" @click="editAction"
          >Edit
          <tooltip>Update delivery address click here</tooltip>
        </q-btn>

        <q-btn flat color="primary" size="12px" @click="removeAction"
          >Delete
          <tooltip
            >If you no longer required this address click here to remove from
            list</tooltip
          >
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: ['data'],
  components: {
    tooltip: () => import('components/BaseTooltip')
  },

  methods: {
    ...mapActions('cart', ['updateDeliveryAddress', 'updateBillingAddress']),
    editAction() {
      this.$emit('editAddress', { data: this.data, action: 'Edit' });
    },
    removeAction() {
      this.$emit('removeAddress', {
        action: 'Remove',
        address_id: this.data.address_id
      });
    },
    updateAddressState(value) {
      if (value === true) {
        //console.log('going to update delivery address', this.data);
        this.updateDeliveryAddress(this.data);
        //this.updateBillingAddress(this.data);
        //console.log('val method', val);
      }
    }
  },
  computed: {
    ...mapGetters('cart', ['deliveryAddress', 'defaultAddress']),
    isDefault() {
      return this.data.is_default === 'Y' ? true : false;
    },
    deliveryAddressState() {
      console.log('deliveryAddressState', !!this.deliveryAddress);
      return (
        !!this.deliveryAddress &&
        this.deliveryAddress.address_id === this.data.address_id
      );
    }
  },
  mounted() {
    console.log('address data received', !!this.deliveryAddress);
  }
};
</script>

<style></style>
