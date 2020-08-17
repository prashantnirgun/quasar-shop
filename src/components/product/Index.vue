<template>
  <q-table
    :data="lists"
    hide-header
    row-key="name"
    grid
    hide-bottom
    :pagination="initialPagination"
  >
    <template v-slot:top>
      <q-chip color="primary" text-color="white" size="md" class="q-py-md">
        <q-avatar color="black" text-color="white" class="text-bold">
          {{ totalProducts }}
        </q-avatar>
        {{ categoryName }}
      </q-chip>
      <q-chip
        v-if="isDesktop"
        size="md"
        class="q-py-md"
        removable
        v-model="eclair"
        color="teal"
        text-color="white"
        icon="bookmark"
      >
        Hot Deals
      </q-chip>

      <q-space />
      <q-btn-group rounded>
        <q-btn
          dense
          rounded
          color="primary"
          icon="list"
          @click="horizontal = true"
        />

        <q-btn
          dense
          rounded
          color="primary"
          icon="grid_on"
          @click="horizontal = false"
        />

        <q-btn dense rounded color="primary" icon="filter_alt" />

        <q-btn-dropdown dense auto-close rounded color="primary" icon="sort">
          <q-list
            dense
            bordered
            padding
            class="rounded-borders"
            style="width: 200px"
          >
            <q-item>
              <q-item-section>
                <q-toggle
                  dense
                  left-label
                  color="blue"
                  label="Price Low to High"
                  v-model="selection"
                  val="Low to High"
                  checked-icon="check"
                  unchecked-icon="clear"
                  @input="fireme('High to Low')"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-toggle
                  dense
                  left-label
                  color="blue"
                  label="Price High to Low"
                  v-model="selection"
                  val="High to Low"
                  checked-icon="check"
                  unchecked-icon="clear"
                  @input="fireme('Low to High')"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-toggle
                  dense
                  left-label
                  color="blue"
                  label="Popularity"
                  v-model="selection"
                  val="Poplarity"
                  checked-icon="check"
                  unchecked-icon="clear"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-toggle
                  dense
                  left-label
                  color="blue"
                  label="Saving Low to High"
                  v-model="selection"
                  val="Saving Low to High"
                  checked-icon="check"
                  unchecked-icon="clear"
                  @input="fireme('Saving High to Low')"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-toggle
                  dense
                  left-label
                  color="blue"
                  label="Saving High to Low"
                  v-model="selection"
                  val="Saving High to Low"
                  checked-icon="check"
                  unchecked-icon="clear"
                  @input="fireme('Saving Low to High')"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-btn dense color="warning" label="Reset" />
              <q-space />
              <q-btn dense color="secondary" label="Apply" />
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-btn-group>
    </template>
    <template v-slot:item="props">
      <div :class="outer">
        <card :data="props.row" :horizontal="horizontal" />
      </div>
    </template>
  </q-table>
</template>

<script>
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';

export default {
  mixins: [device_mixin],
  components: {
    card: () => import('./Card')
  },
  data() {
    return {
      eclair: true,
      selection: ['Saving High to Low', 'Poplarity'],
      sortByHighToLow: true,
      sortByLowToHigh: false,

      mode: 'grid',
      horizontal: this.isMobile ? true : false,
      loading: true,
      lists: [],
      variety: 1,
      qty: 1,
      totalProducts: 0,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 2,
        rowsPerPage: 0
      }
    };
  },
  computed: {
    outer() {
      let c =
        'outer col-xs-12 col-sm-6 q-pa-xs ' +
        (!!this.horizontal ? 'hr col-lg-4 col-md-4' : 'vr col-lg-3 col-md-3');
      return c;
    },
    categoryName() {
      return this.lists.length > 0
        ? `${this.lists[0].category_name}`
        : 'Category';
    }
  },
  methods: {
    fireme(value) {
      const index = this.selection.indexOf(value);
      if (index > -1) {
        this.selection.splice(index, 1);
      }
    }
  },
  mounted() {
    const category_id = parseInt(this.$route.params.category_id);
    this.horizontal = !!this.isMobile;
    DataService.get(`product?where=category_id=${category_id}`)
      .then(response => {
        this.loading = false;
        let data = [];
        this.totalProducts = response.length;
        response.data.rows.map(row => {
          if (row.primary_product_id === 0) {
            let found = data.filter(
              record => record.product_id === row.primary_product_id
            );
            if (found.length === 0) {
              row.children = [row];
              data.push(row);
            }
          } else {
            let found = data.filter(
              record => record.product_id === row.primary_product_id
            );
            if (found.length === 0) {
              let c = { product_id: row.primary_product_id, children: [row] };
              data.push(c);
            } else {
              found[0].children.push(row);
            }
          }
        });
        this.lists = data;
      })
      .catch(error => {
        console.log('DataService.get Error', error);
      });
  }
};
</script>

<style lang="sass" scoped>
img
    max-width: 100%
    max-height: 100%
</style>
