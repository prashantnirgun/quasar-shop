<template>
  <q-page class="q-pa-sm">
    <q-table
      title="Your Orders"
      :data="data"
      :hide-header="mode === 'grid'"
      :columns="columns"
      row-key="bill_no"
      :grid="mode == 'grid'"
      :filter="filter"
      :pagination.sync="pagination"
    >
      <template v-slot:top-right="props">
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          v-if="mode === 'list'"
        >
          <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
            >{{ props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen' }}
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          dense
          :icon="mode === 'grid' ? 'list' : 'grid_on'"
          @click="
            mode = mode === 'grid' ? 'list' : 'grid';
            separator = mode === 'grid' ? 'none' : 'horizontal';
          "
          v-if="!props.inFullscreen"
        >
          <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
            >{{ mode === 'grid' ? 'List' : 'Grid' }}
          </q-tooltip>
        </q-btn>

        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>

      <template v-slot:body-cell-bill_status="props">
        <q-td :props="props">
          <q-chip
            :color="
              props.row.bill_status == 'Delivered'
                ? 'green'
                : props.row.status == 'Not Confirmed'
                ? 'yellow'
                : 'blue'
            "
            text-color="white"
            dense
            class="text-weight-bolder"
            square
            >{{ props.row.bill_status }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          {{ props.row.delivery_date }}
          <q-btn dense round flat color="primary" icon="receipt">
            <tooltip>Invoice Copy</tooltip>
          </q-btn>
          <q-btn dense round flat color="primary" icon="assignment">
            <tooltip>Receipt Copy</tooltip>
          </q-btn>
          <q-btn dense round flat color="primary" icon="push_pin">
            <tooltip>Raised Dispute</tooltip>
          </q-btn>
          <q-btn dense round flat color="primary" icon="replay">
            <tooltip>Repeat Order</tooltip>
          </q-btn>
          <q-btn
            dense
            round
            flat
            color="secondary"
            icon="follow_the_signs"
            @click="show = true"
            ><tooltip>Track Order</tooltip></q-btn
          >
        </q-td>
      </template>
    </q-table>
    <order-track :show="show" @close="show = false" />
  </q-page>
</template>

<script>
import { exportFile, date } from 'quasar';
import DataService from 'src/services/DataService';
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  components: {
    tooltip: () => import('components/BaseTooltip'),
    'order-track': () => import('components/TrackOrder')
  },
  data() {
    return {
      filter: '',
      mode: 'list',
      show: false,
      columns: [
        {
          name: 'bill_no',
          required: true,
          label: 'Order Id',
          align: 'right',
          field: 'bill_no',
          sortable: true
        },
        {
          name: 'bill_date',
          align: 'left',
          label: 'Bill Date',
          field: 'bill_date',
          sortable: true,
          format: val => date.formatDate(new Date(), 'DD-MM-YYYY hh:mm A')
        },
        {
          name: 'delivery_date',
          align: 'left',
          label: 'Delivery Date',
          field: 'delivery_date',
          sortable: true,
          format: val =>
            val == null
              ? 'Not Dlivered'
              : date.formatDate(new Date(), 'DD-MM-YYYY hh:mm A')
        },
        {
          name: 'bill_status',
          align: 'left',
          label: 'Status',
          field: 'bill_status',
          sortable: true
        },
        {
          name: 'pincode',
          align: 'left',
          label: 'Pincode',
          field: 'pincode',
          sortable: true
        },
        {
          name: 'net_amount',
          align: 'right',
          label: 'Amount',
          field: 'net_amount',
          sortable: true,
          format: val =>
            val.toLocaleString('en-IN', {
              maximumFractionDigits: 2,
              style: 'currency',
              currency: 'INR'
            })
        },
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ],
      data: [],
      pagination: {
        rowsPerPage: 10
      }
    };
  },
  methods: {
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.data.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(',')
          )
        )
        .join('\r\n');

      const status = exportFile('customer-management.csv', content, 'text/csv');

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        });
      }
    }
  },
  async mounted() {
    this.$q.loading.show();
    try {
      let result = await DataService.get(`orders`);
      this.data = result.data.rows;
    } catch (error) {
      //console.log('data', result.data.rows);
      this.$q.notify({
        message: 'Sorry its seems you have not logged in to system',
        color: 'negative',
        icon: 'warning'
      });

      this.$router.push('/');
    } finally {
      this.$q.loading.hide();
    }
  }
};
</script>
