<template>
  <div class="row">
    <div
      id="parent"
      class="row wrap justify-evenly  "
      style="overflow: hidden;"
    >
      <div
        class="column col-6col-lg-2 col-md- 2 q-ma-sm items-center content-center"
        style="overflow: auto;"
        v-for="no in [1, 2, 3, 4, 5, 6, 7, 8]"
        :key="no"
      >
        <q-img
          class="col "
          src="/brands/tss.png"
          height="200px"
          width="200px"
        />
      </div>
    </div>
  </div>
</template>
