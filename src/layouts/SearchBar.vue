<template>
  <div class="row">
    <!-- <q-btn flat padding="" label="" class="mx-lg" /> -->
    <q-input
      class="float-left q-ml-xl col-md-10"
      bg-color="white"
      dense
      outlined
      rounded
      v-model="text"
      label="Search for products, brands and more..."
    >
      <template v-slot:append>
        <q-icon name="close" @click="text = ''" class="cursor-pointer" />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: null
    };
  }
};
</script>
