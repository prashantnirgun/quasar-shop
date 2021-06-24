<template>
  <div>
    <div class="q-pa-sm q-gutter-sm">
      <q-btn color="primary" icon="print" label="Invoice" @click="exportPdf" />
      <q-btn color="secondary" icon="print" label="Receipt" />
    </div>
    <div class="q-ma-sm row flex">
      <div class="col-xs-12 ">
        <div class="q-mt-sm">
          <div
            class="text-h4 text-center bg-primary text-white rounded-borders q-py-sm"
          >
            TAX - INVOICE
          </div>
        </div>

        <div class="q-ma-sm">
          <div class="row q-ma-sm">
            <img
              src="/images/logo-horizontal.png"
              height="60px"
              width="150px"
            />
            <q-space />
          </div>

          <div
            class="fit row wrap justify-around items-start content-start"
            style="overflow: hidden;"
          >
            <div class="my-card1 col-4 q-gutter-md" style="overflow: auto;">
              <q-card class="my-card">
                <div class="text-bold">
                  Billing Addres:
                </div>

                <address>{{ bill.billing_address }}</address>
              </q-card>
            </div>
            <div class="my-card1 col-4 q-gutter-md" style="overflow: auto;">
              <q-card class="my-card">
                <div class="text-bold">
                  Shipping Addres:
                </div>
                <address>{{ bill.delivery_address }}</address>
              </q-card>
            </div>

            <div class="my-card1 col-4 q-gutter-md" style="overflow: auto;">
              <q-card class="my-card">
                <div class="row">
                  <div class="col-4 text-bold">Bill No:</div>
                  <div class="col-8 text-right">
                    {{ bill.sales_bill_id | number }}
                  </div>
                </div>
                <div class="row">
                  <div class="col-4 text-bold">Billi Date:</div>
                  <div class="col-8 text-right">
                    {{ bill.sales_bill_date_time | localDate }}
                  </div>
                </div>
                <div class="row">
                  <div class="col-4 text-bold">Delivery Date:</div>
                  <div class="col-8 text-right">
                    {{ bill.delivery_date_time | localDate }}
                  </div>
                </div>

                <div class="row">
                  <div class="col-4 text-bold">Delivery Time:</div>
                  <div class="col-8 text-right">
                    {{ bill.delivery_date_time | localTime }}
                  </div>
                </div>
              </q-card>
            </div>
          </div>

          <!-- </div> -->

          <div class="row q-ma-sm">
            <q-table
              class="col-12 q-pa-sm"
              dense
              :data="item"
              :columns="columns"
              row-key="sales_bill_item_id"
              title="Inventory Items"
              separator="cell"
              hide-bottom
            >
              <template v-slot:body-cell-sr_no="props">
                <q-td :props="props">
                  {{ props.pageIndex + 1 }}
                </q-td>
              </template>
            </q-table>
          </div>

          <div
            class="fit row wrap justify-around items-start content-start"
            style="overflow: hidden;"
          >
            <div class="col-4 q-gutter-md" style="overflow: auto;">
              <q-card class="summary-card q-pa-sm"> Payment Mode</q-card>
            </div>

            <div class="col-4 q-gutter-md" style="overflow: auto;">
              <q-card class="summary-card q-pa-sm"
                >GST Breakup / Terms & Conditions</q-card
              >
            </div>

            <div class="col-4 q-gutter-md" style="overflow: auto;">
              <q-card class="summary-card q-pa-sm">
                <div class="row q-pa-sm text-bold text-indigo">
                  <div class="col-6">
                    <div class="">Gross Total</div>
                  </div>
                  <div class="col-6 text-right ">
                    <div>{{ bill.gross_amount | currency }}</div>
                  </div>
                </div>

                <div class="row q-pa-sm">
                  <div class="col-6">
                    <div class="text-bold">G.S.T. Total</div>
                  </div>
                  <div class="col-6 text-right">
                    <div>{{ bill.tax_amount | currency }}</div>
                  </div>
                </div>

                <div class="row q-pa-sm">
                  <div class="col-6">
                    <div class="text-bold">Delivery Charges</div>
                  </div>
                  <div class="col-6 text-right">
                    <div>{{ bill.delivery_charges | currency }}</div>
                  </div>
                </div>

                <div class="row q-pa-sm text-bold text-indigo">
                  <div class="col-6">
                    <div class="">Net Amount</div>
                  </div>
                  <div class="col-6 text-right">
                    <div>{{ bill.net_amount | currency }}</div>
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from 'src/services/DataService';
import common_mixin from 'src/mixins/common_mixin';
import { date } from 'quasar';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
      }
    ]
  }
};

export default {
  props: ['id'],
  mixins: [common_mixin],
  data() {
    return {
      bill: {},
      item: [],
      columns: [
        { name: 'sr_no', label: '#', field: '', align: 'center' },
        {
          name: 'product_name',
          label: 'Product Name',
          align: 'left',
          field: 'product_name',
          sortable: true,
          headerClasses: ''
        },
        {
          name: 'gst_rate',
          label: 'GST Rate',
          align: 'right',
          field: 'gst_rate',
          sortable: true,
          format: val => `${val} %`
        },
        {
          name: 'unit_name',
          label: 'Unit',
          align: 'left',
          field: 'unit_name',
          sortable: true
        },
        {
          name: 'quantity',
          label: 'Quanity',
          align: 'center',
          field: 'quantity',
          sortable: true,
          format: val => this.number_f(val)
        },
        {
          name: 'rate',
          label: 'Rate',
          align: 'right',
          field: 'rate',
          sortable: true,
          format: val => this.currency_f(val)
        },
        {
          name: 'amount',
          label: 'Amount',
          align: 'right',
          field: 'amount',
          sortable: true,
          format: val => this.currency_f(val)
        }
      ]
    };
  },
  methods: {
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
        { text: '#', style: 'tableHeader', margin: [0, 6, 0, 0] },
        { text: 'Product Name', style: 'tableHeader', margin: [0, 6, 0, 0] },
        { text: 'GST Rate', style: 'tableHeader' },
        { text: 'Qty.', style: 'tableHeader', margin: [0, 6, 0, 0] },
        { text: 'Unit', style: 'tableHeader', margin: [0, 6, 0, 0] },
        { text: 'Rate', style: 'tableHeader', margin: [0, 6, 0, 0] },
        { text: 'Amount', style: 'tableHeader', margin: [0, 6, 0, 0] }
      ];

      tbody.push(trow);
      //Adding Table Data
      let quantityTotal = 0;
      this.item.map((row, index) => {
        let columns = [
          {
            text: index + 1,
            style: 'defaultStyle'
          },
          {
            text: row['product_name'],
            alignment: 'left'
          },
          {
            text: row['gst_rate'] + ' %',
            alignment: 'right'
          },
          {
            text: this.number_f(row['quantity']),
            alignment: 'center'
          },
          {
            text: row['unit_name'],
            alignment: 'left'
          },
          {
            text: this.currency_f(row['rate']),
            alignment: 'right'
          },
          {
            text: this.currency_f(row['amount']),
            alignment: 'right'
          }
        ];
        quantityTotal += parseInt(row.quantity);
        tbody.push(columns);
      });

      const gross_sales = [
        { text: 'Totals', colSpan: 3 },
        {},
        {},
        { text: this.number_f(quantityTotal), alignment: 'center', bold: true },
        { text: 'Gross Sales', colSpan: 2, bold: true },
        {},
        {
          text: this.currency_f(this.bill.gross_amount),
          alignment: 'right',
          bold: true
        }
      ];
      const gst = [
        {
          text: '',
          colSpan: 4,
          border: [true, false, false, false]
        },
        {},
        {},
        {},
        { text: 'GST', colSpan: 2 },
        {},
        {
          text: this.currency_f(this.bill.tax_amount),
          alignment: 'right'
        }
      ];

      const delivery_charges = [
        {
          text: '',
          colSpan: 4,
          border: [true, false, false, false]
        },
        {},
        {},
        {},
        { text: 'Shipping Charge', colSpan: 2 },
        {},
        {
          text: this.currency_f(this.bill.delivery_charges),
          alignment: 'right'
        }
      ];

      const net_amount = [
        {
          text: '',
          colSpan: 4,
          border: [true, false, true, true]
        },
        {},
        {},
        {},
        { text: 'Net Amount', colSpan: 2, bold: true },
        {},
        {
          text: this.currency_f(this.bill.net_amount),
          alignment: 'right',
          bold: true
        }
      ];

      tbody.push(gross_sales);
      tbody.push(gst);
      tbody.push(delivery_charges);
      tbody.push(net_amount);
      tbody.push([
        {
          text: 'Rupees :' + this.price_in_words(this.bill.net_amount),
          colSpan: 7,
          bold: true
        },
        {},
        {},
        {},
        {},
        {},
        {}
      ]);
      // Adding Tables to content

      docDefinition.content.push({
        text: 'TAX - INVOICE',
        alignment: 'center',
        style: { fontSize: 28, bold: true },
        color: '#1976D2',
        margin: [20, 20]
      });

      docDefinition.content.push({
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [200, 200, 130],
          body: [
            [
              {
                text: 'Billing Address',
                bold: true,
                border: [true, true, true, false]
              },
              {
                text: 'Shipping Address',
                bold: true,
                border: [, true, true, false, true]
              },
              {
                text: 'Bill No : ' + this.bill.sales_bill_id,
                border: [, true, true, false, true]
              }
            ],
            [
              {
                text: this.bill.billing_address,
                border: [true, false, true, true]
              },
              {
                text: this.bill.delivery_address,
                border: [true, false, true, true]
              },
              {
                text:
                  'Bill Date : ' +
                  date.formatDate(
                    new Date(this.bill.sales_bill_date_time),
                    'DD-MM-YYYY'
                  ),
                border: [true, false, true, true]
              }
            ]
          ]
        }
      });

      docDefinition.content.push({ text: '', margin: [0, 0, 0, 10] });

      docDefinition.content.push({
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: [15, 270, 30, 30, 30, 50, 70],
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
          color: 'black',
          alignment: 'center'
        },
        defaultStyle: { alignment: 'center' }
      };

      pdfMake.createPdf(docDefinition).download('Invoice.pdf');
    }
  },
  // filters: {
  //   localDate: function(value) {
  //     if (!value) return '';
  //     value = value.toString();
  //     return date.formatDate(new Date(value), 'DD-MM-YYYY hh:mm A');
  //   }
  // },
  async mounted() {
    console.log('numbr(12.33)', Number(123.33));
    this.$q.loading.show();
    try {
      let result = await DataService.get(`order/${this.id}`);
      this.data = result.data.rows;
      console.log('data', result.data);
      if (result.data.rows[0].length > 0) {
        this.bill = result.data.rows[0][0];
        this.item = result.data.rows[1];
      }
    } catch (error) {
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

<style lang="sass" scoped>
.my-card
  min-height: 110px
  background-color: $blue-2
  padding: 10px 10px
  border: 1px solid rgba(86,61,124,.2)
  box-shadow: 5px 10px #888888

.summary-card
  min-height: 170px
  background-color: $light-blue-3
</style>
