<template>
  <div class="text-grey-9 text-weight-bold">
    <div class="row items-center q-mx-sm">
      <hot-deal-slider :device="device" />
      <new-arrivals-slider :device="device" />
      <category :device="device" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['device'],
  components: {
    'hot-deal-slider': () => import('components/home/Hot-Deal-Slider'),
    'new-arrivals-slider': () =>
      import('components/home/New-Arrivals-Horizontal-Slider'),
    category: () => import('components/home/Category')
  }
};
</script>
