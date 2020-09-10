<template>
  <div>
    <div>
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          switch-toggle-side
          expand-separator
          icon="perm_identity"
          label="Personal Infomation"
        >
          <q-card>
            <q-card-section>
              <q-input clearable outlined v-model="text" label="Full Name" />
              <q-input clearable outlined v-model="text" label="Telephone No" />
              <q-input clearable outlined v-model="text" label="Altername No" />
              <q-input clearable outlined v-model="text" label="Email" />
              <q-input clearable outlined v-model="text" label="Pincode" />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          switch-toggle-side
          expand-separator
          icon="perm_identity"
          label="Company Infomation"
        >
          <q-card>
            <q-card-section>
              <q-input clearable outlined v-model="text" label="Company Name" />
              <q-input clearable outlined v-model="text" label="GST No" />
              <q-input clearable outlined v-model="text" label="Telephone No" />
              <q-input clearable outlined v-model="text" label="Altername No" />
              <q-input clearable outlined v-model="text" label="Email" />
              <q-input clearable outlined v-model="text" label="Pincode" />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          switch-toggle-side
          expand-separator
          icon="signal_wifi_off"
          label="Shipping Information"
        >
          <q-card>
            <q-card-section>
              <q-input
                clearable
                outlined
                v-model="text"
                type="textarea"
                label="Billing Address"
              />
              <q-input
                clearable
                outlined
                v-model="text"
                type="textarea"
                label="Shipping Address"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
    <div></div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return { text: null };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="sass" scoped></style>
