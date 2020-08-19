<template>
  <div class="row wrap justify-start q-pa-sm">
    <div v-for="item in data" :key="item.product_id">
      <q-btn
        v-if="item.size === current.size"
        dense
        unelevated
        color="green"
        class="col-auto q-mr-md"
        @click="selcted(item)"
      >
        {{ item.size }}
      </q-btn>

      <q-btn
        v-else
        dense
        unelevated
        class="col-auto q-mr-md bg-white"
        outline
        color="black"
        @click="selcted(item)"
      >
        {{ item.size }}
      </q-btn>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {
      current: {}
    };
  },
  methods: {
    selcted(item) {
      this.current = item;
      //console.log('item selected', item);
      this.$emit('updatedItem', item);
    }
  },
  mounted() {
    //let found = this.data.find(item => item.primary_product_id === 0);
    //  console.log('what is my data', this.data);
    this.current = this.data[0];

    //this.current = found;
  }
};
</script>
<style lang="sass" scoped></style>
