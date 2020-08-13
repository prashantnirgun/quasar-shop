<template>
  <div class="text-grey-9 text-weight-bold">
    <div class="row items-center q-mx-sm">
      <sale-slider :device="device" />
      <new-arrivals-slider :device="device" />
      <category :device="device" />
    </div>
  </div>
</template>

<script>
//import vueAwesomeCountdown from 'vue-awesome-countdown';

export default {
  props: ['device'],
  components: {
    'sale-slider': () => import('components/home/Sale-Horizontal-Slider'),
    'new-arrivals-slider': () =>
      import('components/home/New-Arrivals-Horizontal-Slider'),
    category: () => import('components/home/Category')
    //countdown: vueAwesomeCountdown
  },
  mounted() {
    console.log('screen width', this.$q.screen.width);
  }
};
</script>
