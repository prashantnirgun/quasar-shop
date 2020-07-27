<template>
  <div class="text-grey-9 text-weight-bold">
    <div class="row items-center q-mx-sm">
      <sale-slider />
      <new-arrivals-slider />
      <category-slider />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'sale-slider': () => import('components/home/Sale-Horizontal-Slider'),
    'new-arrivals-slider': () =>
      import('components/home/New-Arrivals-Horizontal-Slider'),
    'category-slider': () =>
      import('components/home/Category-Horizontal-Slider')
  }
};
</script>
