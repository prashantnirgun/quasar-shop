<template>
  <q-page class="q-mt-sm">
    <banner />
    <sliders />
    <sub-footer />
  </q-page>
</template>

<script>
export default {
  components: {
    banner: () => import('components/home/Banner'),
    sliders: () => import('components/home/Sliders'),
    'sub-footer': () => import('components/home/Sub-Footer')
  }
};
</script>

<style scoped></style>
