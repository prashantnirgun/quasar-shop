<template>
  <q-dialog v-model="show" persistent @show="open" ref="dialog">
    <q-card :style="{ width: size }">
      <q-bar class="bg-primary text-white">
        <q-icon :name="icon" />
        <div>{{ title }}</div>
        <q-space />
        <q-btn dense flat round icon="close" @click="close(false)">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <slot></slot>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    show: {
      default: false
    },
    title: {
      default: '?'
    },
    icon: {
      default: 'search'
    },
    size: {
      default: '500px'
    }
  },

  methods: {
    close: function (payload) {
      this.$emit('close', payload);
    },
    open() {
      this.$emit('open');
    }
  }
};
</script>

<style scoped></style>
