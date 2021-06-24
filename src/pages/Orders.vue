<template>
  <q-page class="q-pa-sm">
    <q-table
      title="Your Orders"
      :data="data"
      :hide-header="mode === 'grid'"
      :columns="columns"
      :visible-columns="visibleColumn"
      dense
      row-key="bill_no"
      :grid="mode === 'grid'"
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

        <q-btn
          color="secondary"
          icon="print"
          label="List"
          class="q-ml-sm"
          @click="exportPdf"
        />
      </template>

      <template v-slot:body-cell-c_bill_status="props">
        <q-td :props="props">
          <q-badge color="teal" class="q-py-sm" outline
            >{{ props.row.c_bill_status }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <!-- <q-td>
          <q-btn
            dense
            style="background: goldenrod; color: white"
            icon-right="replay"
            class="text-capitalize"
            >Buy Again
            <tooltip>Repeat Order</tooltip>
          </q-btn>
        </q-td> -->
        <q-td :props="props">
          <q-select
            emit-value
            map-options
            dense
            outlined
            v-model="props.row.action"
            :options="options"
          />
          <!-- {{ props.row.action }} -->
        </q-td>

        <!-- <q-btn dense round flat color="primary" icon="receipt">
            <tooltip>Invoice Copy</tooltip>
          </q-btn>
          <q-btn dense round flat color="primary" icon="assignment">
            <tooltip>Receipt Copy</tooltip>
          </q-btn>
          <q-btn dense round flat color="primary" icon="push_pin">
            <tooltip>Raised Dispute</tooltip>
          </q-btn> -->

        <q-td>
          <q-btn
            dense
            color="primary"
            class="text-capitalize q-px-sm"
            @click="doAction(props.row)"
            >Go
            <tooltip>Go to {{ callForAction }}</tooltip>
          </q-btn>
        </q-td>

        <!-- <q-btn
            dense
            round
            flat
            color="secondary"
            icon="follow_the_signs"
            @click="displayEvents(props.row.bill_no)"
            ><tooltip>Track Order</tooltip></q-btn
          > -->
      </template>
    </q-table>
    <order-track
      :show="show"
      :sales_bill_id="salesBillId"
      @close="show = false"
    />
  </q-page>
</template>

<script>
import { exportFile, date } from 'quasar';
import DataService from 'src/services/DataService';
import { mapGetters } from 'vuex';
import cart_mixin from 'src/mixins/cart_mixin';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//var testImage = 'https://picsum.photos/seed/picsum/200/300';

var docDefinition = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  pageMargins: [20, 50, 20, 20],
  // eslint-disable-next-line no-unused-vars
  footer: function(page, pages) {
    return {
      text: [
        { text: 'Page No ' + pages.toString(), style: 'defaultStyle' },
        { text: ' / ' + page.toString(), style: 'defaultStyle' }
      ],
      margin: [10, 0]
    };
  },
  images: {
    //testImage: 'https://picsum.photos/seed/picsum/200/300',
    testImage: process.env.DOMAIN + '/images/logo-horizontal.png'
  },
  header: {
    stack: [
      {
        image: 'testImage',
        width: 80,
        height: 40,
        alignment: 'left',
        absolutePosition: { x: 15, y: 5 }
      },
      {
        text: 'SKE',
        style: { Size: 18, bold: true },
        alignment: 'center',
        margin: [0, 5, 0, 0]
      },
      {
        text: 'Order List',
        style: { Size: 12 },
        alignment: 'center'
      }
    ]
  }
};

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  mixins: [cart_mixin],
  components: {
    tooltip: () => import('components/BaseTooltip'),
    'order-track': () => import('components/TrackOrder')
  },
  data() {
    return {
      callForAction: 'View Order',
      options: [
        { value: 'OG', label: 'Order Again' },
        { value: 'VO', label: 'View Order' },
        { value: 'TO', label: 'Track Order' },
        { value: 'F', label: 'Feedback' },
        { value: 'RD', label: 'Raised Dispute' }
      ],
      filter: '',
      mode: 'list',
      show: false,
      salesBillId: 0,
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
          format: val =>
            date.formatDate(
              new Date(val),
              this.$q.platform.is.desktop ? 'DD-MM-YYYY hh:mm A' : 'DD-MM-YY'
            )
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
              : date.formatDate(new Date(val), 'DD-MM-YYYY hh:mm A')
        },
        {
          name: 'c_bill_status',
          align: 'left',
          label: 'Status',
          field: 'c_bill_status',

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
        {
          name: 'count',
          align: 'right',
          label: 'Item Count',
          field: 'count',
          sortable: true
        },
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ],
      data: [],
      pagination: {
        rowsPerPage: 10
      }
    };
  },
  computed: {
    ...mapGetters('user', ['quotationPartyId']),
    visibleColumn() {
      if (this.$q.platform.is.desktop) {
        return [
          'bill_no',
          'bill_date',
          'delivery_date',
          'c_bill_status',
          'pincode',
          'net_amount',
          'count',
          'actions'
        ];
      } else {
        return ['bill_no', 'bill_date', 'c_bill_status', 'actions'];
      }
    }
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
      });
    },
    exportPdf() {
      docDefinition['content'] = [];
      let tbody = [];
      let trow = [];
      //Adding Table Headings
      /*

      this.columns.map(column => {
        trow.push({ text: column.label, style: "defaultStyle" });
      });

      */
      trow = [
        { text: 'Bill No', style: 'tableHeader' },
        { text: 'Bill Date', style: 'tableHeader' },
        { text: 'Delivery Date', style: 'tableHeader' },
        { text: 'Status', style: 'tableHeader' },
        { text: 'Amount', style: 'tableHeader' }
      ];

      tbody.push(trow);
      //Adding Table Data
      this.data.map(row => {
        let columns = [
          {
            text: row['bill_no'],
            style: 'defaultStyle'
          },
          {
            text: date.formatDate(new Date(row['bill_date']), 'DD-MM-YYYY'),
            style: 'defaultStyle'
          },
          {
            text:
              row['delivery_date'] == null
                ? ''
                : date.formatDate(new Date(row['delivery_date']), 'DD-MM-YYYY'),
            style: 'defaultStyle'
          },
          {
            text: row['c_bill_status'],
            alignment: 'left'
          },
          {
            text: this.formatCurrency(row['net_amount']),
            style: 'defaultStyle',
            alignment: 'right'
          }
        ];
        /*
        Object.keys(row).map(column => {
          columns.push({ text: row[column], style: "defaultStyle" });
        });
        */
        tbody.push(columns);
      });

      // Adding Tables to content
      docDefinition.content.push({
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*', '*'],
          body: tbody
        }
      });

      //Adding Styles
      docDefinition.styles = {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 0, 0, 0]
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'black'
        },
        defaultStyle: { alignment: 'center' }
      };

      pdfMake.createPdf(docDefinition).download('Order-List.pdf');
    },

    doAction(row) {
      switch (row.action) {
        case 'VO': //View Order
          this.$router.push({
            name: 'order', //+ row.bill_no,
            params: { id: row.bill_no }
          });
          break;
        case 'TO': //Track Order
          this.displayEvents(row.bill_no);
          break;
        case 'OG': //Order Again
          this.orderAgain(row.bill_no);
          break;
        default:
          break;
      }
      console.log('action', row);
    },
    displayEvents(id) {
      this.salesBillId = id;
      this.show = true;
    },
    async orderAgain(id) {
      this.$q.loading.show();
      try {
        let result = await DataService.get(
          `order-again/${id}?quotation_party_id=${this.quotationPartyId}`
        );

        result.data.rows.map(row => {
          const order = {
            amount: row.amount,
            category_id: row.category_id,
            category_name: row.category_name,
            gst_rate: row.gst_rate,
            image_filename: row.image_filename,
            mrp: row.mrp,
            product_id: row.product_id,
            product_name: row.product_name,
            quantity: row.quantity_ordered,
            rate: row.rate,
            saving: row.saving
          };
          this.increment(order, row.quantity_ordered);
          //console.log('order', order);
        });
        // this.data = result.data.rows;
      } catch (error) {
        console.log('data', result.data.rows);
        this.$q.notify({
          message: 'Sorry its seems you have not logged in to system',
          color: 'negative',
          icon: 'warning'
        });

        this.$router.push('/');
      } finally {
        this.$q.loading.hide();
      }
    },
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
