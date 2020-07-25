<template>
  <div class="column">
    <q-input
      class="float-left q-ml-xl"
      style="width: 300px;"
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
