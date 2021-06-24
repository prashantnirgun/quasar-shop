<template>
  <q-dialog v-model="showTracking" width="500px">
    <div class="bg-white q-pa-lg">
      <q-timeline color="secondary" class="no-padding no-margin">
        <div class="text-center text-h6 q-mb-md">Order Tracking</div>

        <q-timeline-entry
          v-for="entry in data"
          :key="entry.sales_bill_event_id"
          :title="entry.c_bill_status"
          :subtitle="dateFormat(entry.event_date_time)"
        >
          <div v-if="!!entry.description && entry.description.length > 0">
            {{ entry.description }}
          </div>
        </q-timeline-entry>
      </q-timeline>
      <q-btn flat label="OK" color="primary" @click="close" />
    </div>
  </q-dialog>
</template>

<script>
import { date } from 'quasar';
import DataService from 'src/services/DataService';
export default {
  props: ['show', 'sales_bill_id'],
  watch: {
    show(newVal) {
      this.showTracking = newVal;
      if (newVal === true) {
        this.getEvents();
      }
    }
  },
  data() {
    return {
      showTracking: this.show,
      data: []
    };
  },
  methods: {
    dateFormat(dateValue) {
      return date.formatDate(new Date(dateValue), 'DD-MM-YYYY hh:mm A');
    },
    async getEvents() {
      this.$q.loading.show();
      try {
        let result = await DataService.get(
          `order-events/${this.sales_bill_id}`
        );
        this.data = result.data.rows;
        console.log('response', result);
      } catch (error) {
        //console.log('data', result.data.rows);
        this.$q.notify({
          message: 'Sorry netwowrk error',
          color: 'negative',
          icon: 'warning'
        });
      } finally {
        this.$q.loading.hide();
      }
    },
    close() {
      this.$emit('close');
    }
  },
  mounted() {}
};
</script>

<style></style>
