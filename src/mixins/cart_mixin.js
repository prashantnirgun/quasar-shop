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
      //   rate: data.rate,
      //   quantity: quanatity,
      //   amount: quanatity * data.rate,
      //   gst_rate: data.gst_rate,
      //   mrp: data.mrp,
      //   image_filename: data.image_filename,
      //   saving: quanatity * data.mrp - quanatity * data.rate
      // });
    },
    increment(data, quantity) {
      this.addProductToCart(this.extractData(data, quantity));
      // this.addProductToCart({
      //   product_id: data.product_id,
      //   category_id: data.category_id,
      //   product_name: data.product_name,
      //   category_name: data.category_name,
      //   rate: data.rate,
      //   quantity,
      //   amount: quantity * data.rate,
      //   baseAmount: this.removeGST(quantity * data.rate, data.gst_rate),
      //   gst_rate: data.gst_rate,
      //   mrp: data.mrp,
      //   image_filename: data.image_filename,
      //   saving: quantity * data.mrp - quantity * data.rate
      // });
    },
    decrement(data, quantity) {
      this.updateProductQuantity(this.extractData(data, quantity));
      // this.updateProductQuantity({
      //   product_id: data.product_id,
      //   product_name: data.product_name,
      //   quantity,
      //   amount: quantity * data.rate,
      //   saving: quantity * data.mrp - quantity * data.rate,
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
      console.log('extactData', data);
      return {
        product_id: data.product_id,
        category_id: data.category_id,
        product_name: data.product_name,
        category_name: data.category_name,
        rate: data.rate,
        quantity,
        amount: quantity * data.rate,
        baseAmount: this.removeGST(quantity * data.rate, data.gst_rate),
        gst_rate: data.gst_rate,
        mrp: data.mrp,
        image_filename: data.image_filename,
        saving: quantity * data.mrp - quantity * data.rate
      };
    }
  }
};
