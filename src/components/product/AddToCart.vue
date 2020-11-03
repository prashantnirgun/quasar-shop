<template>
  <q-input
    v-model.number="orderQty"
    :rules="[positiveNumber]"
    color="green-6"
    style="width: 135px; height : 30px;"
    dense
    outlined
    class="custom-control col-4"
    @blur="setQuantity(data, orderQty)"
  >
    <template v-slot:prepend>
      <q-btn
        @click="decrement(data, orderQty > 1 ? --orderQty : orderQty)"
        color="green-6"
        icon="remove"
        size="md"
        round
        unelevated
        class="rounded-borders full-height"
      />
    </template>

    <template v-slot:append>
      <q-btn
        @click="increment(data, ++orderQty)"
        color="green-6"
        icon="add"
        size="md"
        round
        unelevated
        class="rounded-borders full-height"
      />
    </template>
  </q-input>
</template>

<script>
import cart_mixin from 'src/mixins/cart_mixin';
import { positiveNumber } from 'src/services/Validation';

export default {
  props: ['data'],
  mixins: [cart_mixin],
  data() {
    return {
      orderQty: this.data.quantity
    };
  },
  computed: {},
  methods: {
    positiveNumber
  }
};
</script>

<style lang="sass" scoped>
::v-deep .custom-control
  & .q-field__control
    padding: 0

  input
    text-align: center
</style>
