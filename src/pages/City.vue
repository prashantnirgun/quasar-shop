<template>
  <q-page class="q-pa-sm">
    <q-table
      title="Area of Operation"
      :data="data"
      :hide-header="mode === 'grid'"
      :columns="columns"
      row-key="name"
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
    </q-table>
  </q-page>
</template>

<script>
import { exportFile } from 'quasar';
import DataService from 'src/services/DataService';
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  data() {
    return {
      filter: '',
      mode: 'list',
      columns: [
        {
          name: 'city',
          required: true,
          label: 'Region',
          align: 'left',
          field: 'region',
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
          name: 'state',
          align: 'left',
          label: 'State',
          field: 'state',
          sortable: true
        },
        {
          name: 'delivery_charges_type',
          align: 'left',
          label: 'Type of Rate',
          field: 'delivery_charges_type',
          sortable: true
        },
        {
          name: 'delivery_charges',
          align: 'right',
          label: 'Delivery Charges',
          field: 'delivery_charges',
          sortable: true,
          format: val =>
            val.toLocaleString('en-IN', {
              maximumFractionDigits: 2,
              style: 'currency',
              currency: 'INR'
            })
        },
        {
          name: 'minimum_order',
          align: 'right',
          label: 'Minimum Order',
          field: 'minimum_order',
          sortable: true,
          format: val =>
            val.toLocaleString('en-IN', {
              maximumFractionDigits: 2,
              style: 'currency',
              currency: 'INR'
            })
        }
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
    let result = await DataService.get(`city`);
    //console.log('data', result.data.rows);
    this.data = result.data.rows;
    this.$q.loading.hide();
  }
};
</script>
