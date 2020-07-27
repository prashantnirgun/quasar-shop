<template>
  <div class="row q-mt-sm q-mx-sm bg-white text-center">
    <div
      class="col-lg-2 col-md-2 col-sm-12 col-xs-12"
      style="border-right: 1px solid lightgrey"
      v-for="(obj, index) in [1, 2, 3, 4, 5, 6]"
      :key="index"
    >
      <img src="/brands/tss.png" width="100" height="100" />
    </div>
  </div>
</template>
