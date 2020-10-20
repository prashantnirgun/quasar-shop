import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  methods: {
    ...mapActions('cart', [
      'addProductToCart',
      'updateProductQuantity',
      'removeFromCart'
    ]),
    setQuantity(data, quantity) {
      this.updateProductQuantity(this.extractData(data, quantity));
      // this.updateProductQuantity({
      //   product_id: data.product_id,
      //   category_id: data.category_id,
      //   product_name: data.product_name,
      //   category_name: data.category_name,
      //   rate: data.sale_rate,
      //   quantity: quanatity,
      //   amount: quanatity * data.sale_rate,
      //   gst_rate: data.gst_rate,
      //   mrp: data.mrp,
      //   image_filename: data.image_filename,
      //   saving: quanatity * data.mrp - quanatity * data.sale_rate
      // });
    },
    increment(data, quantity) {
      this.addProductToCart(this.extractData(data, quantity));
      // this.addProductToCart({
      //   product_id: data.product_id,
      //   category_id: data.category_id,
      //   product_name: data.product_name,
      //   category_name: data.category_name,
      //   rate: data.sale_rate,
      //   quantity,
      //   amount: quantity * data.sale_rate,
      //   baseAmount: this.removeGST(quantity * data.sale_rate, data.gst_rate),
      //   gst_rate: data.gst_rate,
      //   mrp: data.mrp,
      //   image_filename: data.image_filename,
      //   saving: quantity * data.mrp - quantity * data.sale_rate
      // });
    },
    decrement(data, quantity) {
      this.updateProductQuantity(this.extractData(data, quantity));
      // this.updateProductQuantity({
      //   product_id: data.product_id,
      //   product_name: data.product_name,
      //   quantity,
      //   amount: quantity * data.sale_rate,
      //   saving: quantity * data.mrp - quantity * data.sale_rate,
      //   message: false
      // });
    },
    removeGST(amount, gstRate) {
      if (gstRate === 0) {
        return amount;
      } else {
        const gstAmount = amount - amount * (100 / (100 + gstRate));
        return (amount - gstAmount).toFixed(2);
      }
    },
    extractData(data, quantity) {
      return {
        product_id: data.product_id,
        category_id: data.category_id,
        product_name: data.product_name,
        category_name: data.category_name,
        rate: data.sale_rate,
        quantity,
        amount: quantity * data.sale_rate,
        baseAmount: this.removeGST(quantity * data.sale_rate, data.gst_rate),
        gst_rate: data.gst_rate,
        mrp: data.mrp,
        image_filename: data.image_filename,
        saving: quantity * data.mrp - quantity * data.sale_rate
      };
    }
  }
};
