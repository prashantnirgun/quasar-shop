<template>
  <div class="row wrap justify-evenly" style="overflow: hidden;">
    <q-card
      class="q-gutter-md"
      style="width: 400px"
      v-show="loading"
      v-for="no in [1, 2, 3, 4, 5, 6, 7, 8]"
      :key="no"
    >
      <q-skeleton height="300px" square />

      <q-card-actions align="right" class="q-gutter-md">
        <q-skeleton type="QBtn" />
        <q-skeleton type="QBtn" />
      </q-card-actions>
    </q-card>

    <div
      class="col-xs-12 col-sm-6 col-md-3 q-pa-sm"
      v-for="data in lists"
      :key="data.product_id"
      v-show="!loading"
    >
      <q-card
        @click="$router.push(`/product-details/${data.product_id}`)"
        class="cursor-pointer"
        transition-show="“flip-up”"
        transition-hide="“flip-down”"
      >
        <q-img :src="data.image_filename">
          <q-badge v-if="data.tag" class="transparent no-margin no-padding">
            <q-chip icon="star" color="yellow" text-color="black">{{
              data.tag
            }}</q-chip>
          </q-badge>
        </q-img>
        <q-card-section class="q-pb-xs q-pt-md">
          <div class="row no-wrap items-center">
            <div class="col text-subtitle2 ellipsis-2-lines text-grey-10">
              {{ data.product_name }}
            </div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            ></div>
          </div>

          <q-rating
            v-model="stars"
            color="orange"
            :max="5"
            readonly
            size="17px"
          ></q-rating>
        </q-card-section>

        <q-card-section class="q-py-sm">
          <div>
            <div class="text-caption text-green-8 text-weight-bolder">
              Special Price
            </div>
            <span class="text-h6">₹3,149</span
            ><span
              class="q-ml-sm text-grey-6"
              style="text-decoration: line-through"
              >₹{{ data.sale_rate }}</span
            >
            <span
              class="q-ml-md text-caption text-green-8 text-weight-bolder q-mt-md"
              >20% off</span
            >
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn
            flat
            class="text-weight-bold text-capitalize"
            dense
            color="primary"
          >
            View details
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';

export default {
  data() {
    return {
      stars: 4,
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
    this.$q.loading.show();
    //console.time('Timer name');
    DataService.get('data/product.json')
      .then(response => {
        this.lists = response.data.filter(
          row => parseInt(row.category_id) === category_id

          // && parseInt(row.primary_product_id) === 0
        );
        this.loading = false;
        this.$q.loading.hide();
        console.log('data', this.lists);
        //console.timeEnd('Timer name');
      })
      .catch(error => {
        console.log('DataService.get Error', error);
      });
  }
};
</script>
