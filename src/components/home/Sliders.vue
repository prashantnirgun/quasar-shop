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
export default {
  props: ['device'],
  components: {
    'sale-slider': () => import('components/home/Sale-Horizontal-Slider'),
    'new-arrivals-slider': () =>
      import('components/home/New-Arrivals-Horizontal-Slider'),
    // 'category-slider': () =>
    //   import('components/home/Category-Horizontal-Slider'),
    category: () => import('components/home/Category')
  },
  mounted() {
    //console.log('props recived', this.device);
    console.log('screen width', this.$q.screen.width);
  }
};
</script>
