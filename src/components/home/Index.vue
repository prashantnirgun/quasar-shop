<template>
  <q-page class="">
    <banner />
    <sliders :device="deviceInfo" />
    <sub-footer />
  </q-page>
</template>

<script>
import device_mixin from 'src/mixins/device_mixin';
export default {
  mixins: [device_mixin],
  components: {
    banner: () => import('components/home/Banner'),
    sliders: () => import('components/home/Sliders'),
    'sub-footer': () => import('components/home/Sub-Footer')
  },
  computed: {
    deviceInfo() {
      let b = !!this.isDesktop ? 'Desktop' : 'Mobile';
      console.log('device info', b);
      return b;
    }
  }
};
</script>

<style scoped></style>
