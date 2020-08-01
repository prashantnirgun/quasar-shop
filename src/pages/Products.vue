<template>
  <q-table title="Treats" :data="lists" hide-header row-key="name" grid>
    <template v-slot:top="props">
      <q-btn
        flat
        round
        dense
        :icon="mode === 'grid' ? 'list' : 'grid_on'"
        @click="horizontal = !horizontal"
        v-if="!props.inFullscreen"
      >
        <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>{{
          mode === 'grid' ? 'List' : 'Grid'
        }}</q-tooltip>
      </q-btn>
    </template>
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <q-card>
          <q-card-section :horizontal="horizontal">
            <q-card-section class="col-2">
              <q-img :src="props.row.image_filename"></q-img>
            </q-card-section>
            <q-card-section class="col-5">
              <div>{{ props.row.product_name }}</div>
              <div>{{ props.row.product_name }}</div>
            </q-card-section>
            <q-card-section class="col-5">
              <div>{{ props.row.sale_rate }}</div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script>
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';

export default {
  data() {
    return {
      stars: 4,
      mode: 'list',
      horizontal: true,
      loading: true,
      class_val: 'shadow-1 my-card',
      lists: []
    };
  },
  computed: {
    getSize() {
      return this.isDesktop ? '200px' : '300px';
    }
  },
  mounted() {
    const category_id = parseInt(this.$route.params.category_id);
    //this.$q.loading.show();
    //console.time('Timer name');
    DataService.get('data/product.json')
      .then(response => {
        this.lists = response.data.filter(
          row => parseInt(row.category_id) === category_id

          // && parseInt(row.primary_product_id) === 0
        );
        this.loading = false;
        //this.$q.loading.hide();
        console.log('data', this.lists);
        //console.timeEnd('Timer name');
      })
      .catch(error => {
        console.log('DataService.get Error', error);
      });
  }
};
</script>
