<template>
  <div>
    <q-table
      :data="sortedLists"
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

          <q-btn
            dense
            rounded
            color="primary"
            icon="filter_alt"
            @click="modal = true"
          />

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
                    val="sale_rate"
                    checked-icon="check"
                    unchecked-icon="clear"
                    @input="sort('sale_rate')"
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
                    val="sale_rate desc"
                    checked-icon="check"
                    unchecked-icon="clear"
                    @input="sort('sale_rate desc')"
                  />
                </q-item-section>
              </q-item>
              <!-- <q-item>
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
                  @input="sort('rating')"
                />
              </q-item-section>
            </q-item> -->
              <q-item>
                <q-item-section>
                  <q-toggle
                    dense
                    left-label
                    color="blue"
                    label="Saving Low to High"
                    v-model="selection"
                    val="saving"
                    checked-icon="check"
                    unchecked-icon="clear"
                    @input="sort('saving')"
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
                    val="saving desc"
                    checked-icon="check"
                    unchecked-icon="clear"
                    @input="sort('saving desc')"
                  />
                </q-item-section>
              </q-item>
              <!-- <q-item>
              <q-btn dense color="warning" label="Reset" />
              <q-space />
              <q-btn dense color="secondary" label="Apply" />
            </q-item> -->
            </q-list>
          </q-btn-dropdown>
        </q-btn-group>
      </template>
      <template v-slot:item="props">
        <div :class="outer">
          <!-- {{ props.row.product_name }} -->
          <card :data="props.row" :horizontal="horizontal" />
        </div>
      </template>
    </q-table>
    <product-filter :show="modal" @close="modal = false" />
  </div>
</template>

<script>
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';

export default {
  mixins: [device_mixin],
  components: {
    card: () => import('./Card'),
    'product-filter': () => import('./Product_filter')
  },
  data() {
    return {
      eclair: true,
      modal: false,
      selection: ['saving desc'],
      //selection: 'Saving High to Low',
      sortByHighToLow: true,
      sortByLowToHigh: false,

      mode: 'grid',
      horizontal: this.isMobile ? true : false,
      loading: true,
      lists: [],
      sortedLists: [],
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
    sort(value) {
      this.selection = [];
      this.selection[0] = value;
      let data = [];
      //console.log('sort', value);
      switch (value) {
        case 'sale_rate':
          data = this.lists.sort((a, b) => a.sale_rate - b.sale_rate);
          break;
        case 'sale_rate desc':
          data = this.lists.sort((a, b) => b.sale_rate - a.sale_rate);
          break;
        case 'sale_rate':
          data = this.lists.sort((a, b) => a.saving - b.saving);
          break;
        default:
          data = this.lists.sort((a, b) => b.saving - a.saving);
          break;
      }

      this.buildList(JSON.parse(JSON.stringify(data)));
      //console.log('new data', this.sortedLists);
      //this.sortedLists = data;
    },
    buildList(rawData) {
      let datas = [];
      let count = 0;
      rawData.map(row => {
        if (row.primary_product_id === 0) {
          let index = datas.findIndex(
            data => parseInt(data.product_id) === parseInt(row.product_id)
          );
          //if not found then insert
          if (index === -1) {
            const a = JSON.parse(JSON.stringify(row));
            a.children = [JSON.parse(JSON.stringify(row))];
            datas.push(a);
          }
          // If found then 01 update and 02 insert himself as child rows
          else {
            //01 Updating values
            Object.keys(row).map(col => {
              datas[index][col] = row[col];
            });

            //02 Inserting himself as child row
            const childRow = JSON.parse(JSON.stringify(row));
            datas[index].children.push(childRow);
          }
        } else {
          const index = datas.findIndex(
            data =>
              parseInt(data.product_id) === parseInt(row.primary_product_id)
          );
          if (index === -1) {
            let c = {
              product_id: row.primary_product_id,
              children: [JSON.parse(JSON.stringify(row))]
            };
            datas.push(c);
          } else {
            datas[index].children.push(JSON.parse(JSON.stringify(row)));
          }
        }
      });
      this.sortedLists = datas;
    }
  },
  created() {
    const category_id = parseInt(this.$route.params.category_id);
    this.horizontal = !!this.isMobile;
    DataService.get(`product?where=category_id=${category_id}`)
      .then(response => {
        this.loading = false;
        let data = [];
        //console.log('raw data', JSON.parse(JSON.stringify(response.data.rows)));
        this.lists = JSON.parse(JSON.stringify(response.data.rows));
        this.totalProducts = response.data.total_rows;
        this.buildList(this.lists);
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
