<template>
  <q-dialog v-model="showTracking" width="500px">
    <div class="bg-white q-pa-lg">
      <q-timeline color="secondary" class="no-padding no-margin">
        <div class="text-center text-h6 q-mb-md">Order Tracking</div>

        <q-timeline-entry title="Order Submited" subtitle="February 22, 1986">
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit</div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Order Submited"
          subtitle="February 21, 1986"
          icon="delete"
        >
          <div>sum dolor sit amet, consectetur adipisicing elit,</div>
        </q-timeline-entry>
      </q-timeline>
      <q-btn flat label="OK" color="primary" @click="close" />
    </div>
  </q-dialog>
</template>

<script>
export default {
  props: ['show'],
  watch: {
    show(newVal) {
      this.showTracking = newVal;
    }
  },
  data() {
    return {
      showTracking: this.show
    };
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style></style>
