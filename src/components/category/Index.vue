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
          v-for="offer in selectedOffers"
          :key="offer.name"
          size="md"
          class="q-py-md"
          :value="offer"
          removable
          @remove="removeOffer(offer.name)"
          v-model="offer.apply"
          color="teal"
          text-color="white"
          icon="bookmark"
        >
          {{ offer.name }}
        </q-chip>

        <q-space />
        <q-btn-group rounded>
          <q-btn
            dense
            rounded
            color="primary"
            icon="list"
            @click="horizontal = true"
          >
          </q-btn>

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
                    val="rate"
                    checked-icon="check"
                    unchecked-icon="clear"
                    @input="applySort('rate')"
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
                    val="rate desc"
                    checked-icon="check"
                    unchecked-icon="clear"
                    @input="applySort('rate desc')"
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
      :offers="offers"
      :price_range="price_range"
      :packings="packings"
      @close="modal = false"
      @applyFilter="setFilter"
    />
  </div>
</template>

<script>
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';
import { mapGetters } from 'vuex';

export default {
  mixins: [device_mixin],
  components: {
    card: () => import('components/product/Card'),
    'product-filter': () => import('components/product/Product_filter')
  },
  data() {
    return {
      eclair: true,
      modal: false,
      selection: ['saving desc'],
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

      price_range: [
        {
          name: '₹1 - ₹250',
          min: 1,
          max: 250,
          counter: 0,
          apply: false,
          disable: true
        },
        {
          name: '₹251 - ₹500',
          min: 251,
          max: 500,
          counter: 0,
          apply: false,
          disable: true
        },
        {
          name: '₹501 - ₹750',
          min: 501,
          max: 750,
          counter: 0,
          apply: false,
          disable: true
        },
        {
          name: '₹751 - ₹1,000',
          min: 751,
          max: 1000,
          counter: 0,
          apply: false,
          disable: true
        },
        {
          name: '₹1,001 - ₹1,050',
          min: 1001,
          max: 1500,
          counter: 0,
          apply: false,
          disable: true
        },
        {
          name: '₹1,501 - ₹2,000',
          min: 1501,
          max: 2500,
          counter: 0,
          apply: false,
          disable: true
        },
        {
          name: '₹2,001 - ₹9,999',
          min: 2001,
          max: 9999,
          counter: 0,
          apply: false,
          disable: true
        }
      ],
      packings: [],
      offers: []
    };
  },
  computed: {
    ...mapGetters('user', ['quotationPartyId']),

    selectedOffers() {
      return this.offers.filter(obj => obj.apply === true);
    },
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
    setFilter(payload) {
      payload.offers.map(obj => {
        let found = this.offers.filter(item => obj.name === item.name);
        if (found) {
          found.apply = obj.apply;
        }
      });
      let rawData = JSON.parse(JSON.stringify(this.lists));
      let data = rawData.filter(item => {
        let rate_filter = false;
        let size_filter = false;
        let offer_filter = false;

        //01 Apply Price Filter
        if (payload.rates.length > 0) {
          rate_filter = payload.rates.find(
            obj =>
              parseFloat(item.rate) >= parseFloat(obj.min) &&
              parseFloat(item.rate) <= parseFloat(obj.max)
          );
        } else {
          rate_filter = true;
        }

        //02 Apply Size Filter
        if (payload.size.length > 0) {
          size_filter = payload.size.find(
            obj => item.unit_name == obj.unit_name && obj.size == item.size
          );
        } else {
          size_filter = true;
        }

        //03 Apply Offer Filter
        if (payload.offers.length > 0) {
          offer_filter = payload.offers.find(obj =>
            String(item.tag).indexOf(String(obj.name)) >= 0 ? true : false
          );
        } else {
          offer_filter = true;
        }

        return size_filter && rate_filter && offer_filter;
      });
      this.sort(this.selection[0], data);
    },
    removeOffer(data) {
      this.offers.filter(obj => obj.name === data).apply = false;
      // console.log('data to be removed', data, this.offers);
    },
    applySort(value) {
      this.selection = [];
      this.selection[0] = value;
      //console.log('sort', value, this.selection);
      this.sort(value, JSON.parse(JSON.stringify(this.lists)));
    },
    sort(value, lists) {
      let data = [];
      //console.log('sort', value, lists);
      switch (value) {
        case 'rate':
          data = lists.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
          break;
        case 'rate desc':
          data = lists.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));
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

      this.buildList(JSON.parse(JSON.stringify(data)));
    },
    buildList(rawData) {
      let datas = [];
      let count = 0;
      rawData
        .filter(data => parseInt(data.primary_product_id) === 0)
        .map(data => {
          datas.push({ ...data, children: [data] });
        });

      rawData
        .filter(data => parseInt(data.primary_product_id) > 0)
        .map(data => {
          datas
            .find(
              row =>
                parseInt(row.product_id) === parseInt(data.primary_product_id)
            )
            .children.push(data);
        });

      //console.log('data', datas);

      /*
      rawData.map(row => {
        if (row.primary_product_id === 0) {
          let index = datas.findIndex(
            data =>
              parseInt(data.primary_product_id) === parseInt(row.product_id)
          );
          //if not found then insert
          if (index === -1) {
            if (parseInt(row.product_id) === 154) {
              console.log('new record not found', row);
            }
            const obj = JSON.parse(JSON.stringify(row));
            obj.children = [JSON.parse(JSON.stringify(row))];
            datas.push(obj);
          }
          // If found then 01 update and 02 insert himself as child rows
          else {
            if (parseInt(row.product_id) === 154) {
              console.log('new record found', row);
            }
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
            let obj = {};
            Object.keys(row).map(col => {
              obj[col] = row[col];
            });

            obj.children = [JSON.parse(JSON.stringify(row))];
            datas.push(obj);
            if (parseInt(row.primary_product_id) === 154) {
              console.log('not found going to insert', row, datas);
            }
          } else {
            datas[index].children.push(JSON.parse(JSON.stringify(row)));
            if (parseInt(row.primary_product_id) === 154) {
              console.log('found going to insert', row, datas);
            }
          }
        }

        //Prepare list packing
        let found = this.packings.find(
          packing =>
            packing.unit_name === row.unit_name && packing.size === row.size
        );
        //console.log('packing list', row.unit_name, row.size, row.option, found)
        if (typeof found == 'undefined') {
          this.packings.push({
            unit_name: row.unit_name,
            size: row.size,
            apply: false
          });
        }
      });
*/
      this.packings.sort((first, next) => {
        if (first.unit_name > next.unit_name) return 1;
        if (first.unit_name < next.unit_name) return -1;
        if (parseInt(first.size) > parseInt(next.size)) return 1;
        if (parseInt(first.size) < parseInt(next.size)) return -1;
      });

      //console.log('datas', datas);
      this.sortedLists = datas;
    }
  },
  created() {
    const category_slug = this.$route.params.category_slug;

    this.horizontal = !!this.isMobile;
    DataService.get(
      `category/${category_slug}?quotation_party_id=${this.quotationPartyId}`
    )
      //DataService.get(`guest`)
      .then(response => {
        this.loading = false;
        //console.log('raw data', JSON.parse(JSON.stringify(response.data.rows)));
        this.lists = JSON.parse(JSON.stringify(response.data.rows));
        this.totalProducts = response.data.total_rows;
        let tempOffer = [];
        //Build filter data
        this.lists.map(data => {
          //Offer List
          if (data.tag != null) {
            data.tag.split(',').map(item => {
              tempOffer.push(item);
            });
          }

          let a = this.price_range.find(el => {
            if (data.rate >= el.min && data.rate <= el.max) {
              el.counter++;
              el.apply = false;
              el.disable = false;
              return true;
            } else {
              return false;
            }
          });
        });

        let tempSet = new Set(tempOffer);
        tempSet = [...tempSet];
        tempSet.map(obj => this.offers.push({ name: obj, apply: false }));
        //proudct_filter component will apply filter and then data will get displayed
        if (this.offers.length === 0) {
          this.buildList(JSON.parse(JSON.stringify(response.data.rows)));
        }
      })
      .catch(error => {
        console.log('DataService.get Error', error);
      });
  }
};
</script>

<style lang="sass" scoped></style>
