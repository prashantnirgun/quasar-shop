<template>
  <div class=" row wrap justify-evenly ">
    <div
      class="column col-2 col-xs-6 col-sm-4 col-md-2 col-lg-2 col-xl-2 q-pa-md items-center content-center"
      style="overflow: auto;"
      v-for="no in [1, 2, 3, 4, 5, 6, 7, 8]"
      :key="no"
    >
      <q-img class="" src="/brands/tss.png" height="100px" width="100px" />
    </div>
  </div>
</template>
