<template>
  <div>
    <div class="q-pa-sm q-gutter-sm">
      <q-btn color="primary" icon="print" label="Invoice" />
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
                  <div class="col-4 text-bold">Billi No:</div>
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
export default {
  props: ['id'],
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
          name: 'unit_name',
          label: 'Unit',
          align: 'left',
          field: 'unit_name',
          sortable: true
        },
        {
          name: 'quantity',
          label: 'Quanity',
          align: 'right',
          field: 'quantity',
          sortable: true
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
          name: 'rate',
          label: 'Rate',
          align: 'right',
          field: 'rate',
          sortable: true,
          format: val =>
            val.toLocaleString('en-IN', {
              maximumFractionDigits: 2,
              style: 'currency',
              currency: 'INR'
            })
        },
        {
          name: 'amount',
          label: 'Amount',
          align: 'right',
          field: 'amount',
          sortable: true,
          format: val =>
            val.toLocaleString('en-IN', {
              maximumFractionDigits: 2,
              style: 'currency',
              currency: 'INR'
            })
        }
      ]
    };
  },
  // filters: {
  //   localDate: function(value) {
  //     if (!value) return '';
  //     value = value.toString();
  //     return date.formatDate(new Date(value), 'DD-MM-YYYY hh:mm A');
  //   }
  // },
  async mounted() {
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
