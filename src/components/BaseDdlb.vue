<template>
  <q-select
    outlined
    v-model="dataList"
    dense
    use-input
    fill-input
    hide-selected
    input-debounce="0"
    :label="title"
    :options="options"
    emit-value
    map-options
    @filter="(val, update) => filter(val, update)"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
export default {
  props: ['list', 'value', 'title'],
  data() {
    return {
      options: [],
      id: this.value
    };
  },
  watch: {
    value(val) {
      //console.log('value changed', old, this.id);
      this.id = val;
    }
  },

  methods: {
    filter(val, update) {
      if (val === '') {
        update(() => {
          this.options = this.list;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = this.list.filter(v => {
          if (typeof v.label === 'number') {
            v.label = v.label.toString();
          }
          return v.label.toLowerCase().indexOf(needle) > -1;
        });
      });
    }
  },
  computed: {
    dataList: {
      get() {
        const rs = this.list.filter(row => row.value === this.id);
        return rs.length === 1 ? rs[0] : rs;
      },
      set(v) {
        this.id = v;
        //console.log('inside dataList', this.id);
        this.$emit('changed', this.id);
      }
    }
  }
};
</script>
