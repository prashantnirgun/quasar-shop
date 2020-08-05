<template>
  <div class="row wrap justify-start q-pt-non q-px-sm q-pb-sm q-gutter-sm">
    <div v-for="item in data" :key="item.size">
      <q-btn
        v-if="item.size === current.size"
        dense
        unelevated
        color="green"
        class="col-auto"
        @click="selcted(item)"
      >
        {{ item.size }}
      </q-btn>

      <q-btn
        v-else
        dense
        unelevated
        class="col-auto"
        outline
        color="green"
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
      console.log('item selected', item);
      this.$emit('updatedItem', item);
    }
  },
  mounted() {
    this.current = this.data[0];
  }
};
</script>
<style lang="sass" scoped></style>
