<template>
  <q-card>
    <card-info :data="current" :horizontal="horizontal" />
    <div class="bg-grey-4">
      <card-options
        :data="data.children"
        @updatedItem="runme"
        v-if="data.children.length > 1"
      />
    </div>
  </q-card>
</template>
<script>
import device_mixin from 'src/mixins/device_mixin';
export default {
  props: ['data', 'horizontal'],
  mixins: [device_mixin],
  components: {
    'card-info': () => import('./Card_info'),
    'card-options': () => import('./Card_options')
  },
  data() {
    return {
      current: {}
    };
  },
  watch: {
    data(newVal, oldVal) {
      //console.log('something is changed here', newVal, oldVal);
      this.current = newVal;
    }
  },
  methods: {
    runme(item) {
      this.current = item;
      //console.log('item recieved', item.product_id, this.current.product_id);
    }
  },
  mounted() {
    this.current = this.data;
  }
};
</script>
