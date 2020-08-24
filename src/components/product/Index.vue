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
          v-for="offer in filterOptionsSelected.offers"
          :key="offer"
          size="md"
          class="q-py-md"
          :value="offer"
          removable
          @remove="removeOffer"
          v-model="filterOptionsSelected.offers"
          color="teal"
          text-color="white"
          icon="bookmark"
        >
          {{ offer }}
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
                    @input="applySort('sale_rate')"
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
                    @input="applySort('sale_rate desc')"
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
                    @input="applySort('saving')"
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
                    @input="applySort('saving desc')"
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
    <product-filter
      :show="modal"
      @close="modal = false"
      :options="filterOptions"
      @rangeUpdate="rangeFilter"
      @offerUpdate="offerFilter"
    />
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
      filterOptions: {
        min: 0,
        max: 0,
        step: 250,
        offers: [],
        sizes: []
      },
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 2,
        rowsPerPage: 0
      },
      filterOptionsSelected: {
        offers: []
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
    removeOffer(data) {
      console.log('data to be removed', data);
    },
    offerFilter(offerData) {
      this.filterOptionsSelected.offers = offerData;
      console.log('offer selected', offerData);
      let data = [];
      if (offerData.length > 0) {
        let rawData = JSON.parse(JSON.stringify(this.lists));
        data = rawData.filter(item => {
          return offerData.indexOf(item.tag) >= 0;
        });
      } else {
        data = JSON.parse(JSON.stringify(this.lists));
      }

      //console.log('data', data);
      this.sort(this.selection[0], data);
    },
    rangeFilter(filterData) {
      let rawData = JSON.parse(JSON.stringify(this.lists));
      let data = rawData.filter(
        item =>
          parseFloat(item.sale_rate) >= parseFloat(filterData.min) &&
          parseFloat(item.sale_rate) <= parseFloat(filterData.max)
      );
      this.sort(this.selection[0], data);
    },
    applySort(value) {
      this.selection = [];
      this.selection[0] = value;
      this.sort(value, JSON.parse(JSON.stringify(this.Lists)));
    },
    sort(value, lists) {
      let data = [];
      //console.log('sort', value);
      switch (value) {
        case 'sale_rate':
          data = lists.sort(
            (a, b) => parseFloat(a.sale_rate) - parseFloat(b.sale_rate)
          );
          break;
        case 'sale_rate desc':
          data = lists.sort(
            (a, b) => parseFloat(b.sale_rate) - parseFloat(a.sale_rate)
          );
          break;
        case 'saving':
          data = lists.sort(
            (a, b) => parseFloat(a.saving) - parseFloat(b.saving)
          );
          break;
        default:
          data = lists.sort(
            (a, b) => parseFloat(b.saving) - parseFloat(a.saving)
          );
          break;
      }

      //console.log('data is sorted', value, data);
      this.buildList(JSON.parse(JSON.stringify(data)));
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
            let c = {};
            Object.keys(row).map(col => {
              c[col] = row[col];
            });

            //c.product_id = row.primary_product_id
            c.children = [JSON.parse(JSON.stringify(row))];

            // let c = {

            //   product_id: row.primary_product_id,
            //   children: [JSON.parse(JSON.stringify(row))]
            // };
            datas.push(c);
          } else {
            datas[index].children.push(JSON.parse(JSON.stringify(row)));
          }
        }
      });
      //console.log('sorted DAta', datas);
      this.sortedLists = datas;
    }
  },
  created() {
    const category_id = parseInt(this.$route.params.category_id);
    this.horizontal = !!this.isMobile;
    DataService.get(`product?where=category_id=${category_id}`)
      .then(response => {
        this.loading = false;
        //console.log('raw data', JSON.parse(JSON.stringify(response.data.rows)));
        this.lists = JSON.parse(JSON.stringify(response.data.rows));
        this.totalProducts = response.data.total_rows;

        //Build filter data
        this.lists.map(data => {
          this.filterOptions.max =
            data.sale_rate > this.filterOptions.max
              ? data.sale_rate
              : this.filterOptions.max;

          this.filterOptions.min =
            this.filterOptions.min === 0
              ? data.sale_rate
              : this.sales_rate < this.filterOptions.min
              ? this.sales_rate
              : this.filterOptions.min;

          if (data.tag != null) {
            data.tag.split(',').map(item => {
              this.filterOptions.offers.push(item);
            });
          }
          this.filterOptions.sizes.push(data.size);
        });

        this.filterOptions.offers = [...new Set(this.filterOptions.offers)];
        this.filterOptions.sizes = [...new Set(this.filterOptions.sizes)];

        // let len = this.filterOptions.max.toString().length;
        // len = '1'.padEnd(len, '0');
        // this.filterOptions.max =
        //   (parseInt(this.filterOptions.max.toString().substring(0, 1)) + 1) *
        //   parseInt(len);
        // len = this.filterOptions.min.toString().length;
        // len = '1'.padEnd(len, '0');
        // this.filterOptions.min =
        //   parseInt(this.filterOptions.min.toString().substring(0, 1)) *
        //   parseInt(len);

        console.log(
          //   this.filterOptions.min,
          //   this.filterOptions.max,
          //   this.filterOptions.max / 5,
          this.filterOptions.offers
          //   this.filterOptions.sizes,
          //   JSON.parse(JSON.stringify(this.lists))
        );

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
