<template>
  <div class="row wrap justify-start q-pa-sm q-gutter-sm">
    <q-btn
      v-for="item in data"
      :key="item.size"
      dense
      :outline="item.size !== current.size"
      unelevated
      :class="[item.size !== current.size ? '' : 'bg-green', 'bg-white']"
      @click="selcted(item)"
    >
      {{ item.size }}
    </q-btn>
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
      //console.log('item selected', item);
      this.$emit('updatedItem', item);
    }
  },
  mounted() {
    this.current = this.data[0];
  }
};
</script>
