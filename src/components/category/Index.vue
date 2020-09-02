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
     
      price_range :[
        { name : '₹1 - ₹250', min : 1, max : 250, counter : 0, apply: false, disable : true},
        { name : '₹251 - ₹500', min : 251, max : 500, counter : 0, apply: false, disable : true},
        { name : '₹501 - ₹750', min : 501, max : 750, counter : 0, apply: false, disable : true},
        { name : '₹751 - ₹1,000', min : 751, max : 1000, counter : 0, apply: false, disable : true},
        { name : '₹1,001 - ₹1,050', min : 1001, max : 1500, counter : 0, apply: false, disable : true},
        { name : '₹1,501 - ₹2,000', min : 1501, max : 2500, counter : 0, apply: false, disable : true},
        { name : '₹2,001 - ₹9,999', min : 2001, max : 9999, counter : 0, apply: false, disable : true}
      ],
      packings :[],
      offers : []
    };
  },
  computed: {
    selectedOffers(){
      return this.offers.filter(obj=> obj.apply === true)
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
    setFilter(payload){
      payload.offers.map(obj=>{
        let found = this.offers.filter(item=>obj.name === item.name)
        if(found){
          found.apply = obj.apply
        }
      })

      let rawData = JSON.parse(JSON.stringify(this.lists));
      let data = rawData.filter(
        item =>{
          let rate_filter = false;
          let size_filter = false;
          let offer_filter = false;
          
          //01 Apply Price Filter
          if(payload.rates.length > 0){
            rate_filter = payload.rates.find(obj=> 
              parseFloat(item.sale_rate) >= parseFloat(obj.min) &&
              parseFloat(item.sale_rate) <= parseFloat(obj.max))
          }else{
            rate_filter = true
          }

          //02 Apply Size Filter
          if(payload.size.length > 0){
            size_filter = payload.size.find(obj=> item.unit_name == obj.unit_name && obj.size == item.size)
          }else{
            size_filter = true
          }

          //03 Apply Offer Filter
          if(payload.offers.length > 0){
            offer_filter = payload.offers.find(obj=> String(item.tag).indexOf(String(obj.name)) >= 0 ? true : false )
          }else{
            offer_filter = true
          }

          return size_filter && rate_filter && offer_filter
        }
      );
      this.sort(this.selection[0], data);

    },
    removeOffer(data) {
      this.offers.filter(obj=> obj.name === data).apply = false
     // console.log('data to be removed', data, this.offers);
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

      this.buildList(JSON.parse(JSON.stringify(data)));
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
            const obj = JSON.parse(JSON.stringify(row));
            obj.children = [JSON.parse(JSON.stringify(row))];
            datas.push(obj);
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
            let obj = {};
            Object.keys(row).map(col => {
              obj[col] = row[col];
            });

            obj.children = [JSON.parse(JSON.stringify(row))];            
            datas.push(obj);
          } else {
            datas[index].children.push(JSON.parse(JSON.stringify(row)));
          }
        }

        //Prepare list packing
        let found = this.packings.find(packing=> packing.unit_name === row.unit_name && packing.size === row.size)
        //console.log('packing list', row.unit_name, row.size, row.option, found)
        if (typeof found == "undefined") {
          this.packings.push({unit_name : row.unit_name, size : row.size, apply : false })
        }

      });
      this.packings.sort((first, next)=>{
        if (first.unit_name > next.unit_name) return 1;
        if (first.unit_name < next.unit_name) return -1;
        if (parseInt(first.size) > parseInt(next.size)) return 1;
        if (parseInt(first.size) < parseInt(next.size)) return -1;
      })
      //console.log('packings', this.packings);
      this.sortedLists = datas;
    }
  },
  created() {
    const category_slug = this.$route.params.category_slug;

    this.horizontal = !!this.isMobile;
    DataService.get(`category/${category_slug}`)
      .then(response => {
        this.loading = false;
        //console.log('raw data', JSON.parse(JSON.stringify(response.data.rows)));
        this.lists = JSON.parse(JSON.stringify(response.data.rows));
        this.totalProducts = response.data.total_rows;
        let tempOffer = []
        //Build filter data
        this.lists.map(data => {          
          //Offer List
          if (data.tag != null) {
            data.tag.split(',').map(item => {
              tempOffer.push(item);
            });
          }         
          
          let a = this.price_range.find(el=>{
            if(data.sale_rate >= el.min && data.sale_rate <= el.max ){
              el.counter++;
              el.apply = false;
              el.disable = false;
              return true;
            }else{return false}
          })
         
        });
        
        let tempSet = new Set(tempOffer)
        tempSet = [...tempSet]
        tempSet.map(obj=> this.offers.push({name : obj, apply : false}))
        
        //proudct_filter component will apply filter and then data will get displayed

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
