<template>
  <div>
    <q-list class="rounded-borders" v-for="option in model" :key="option.label">
      <q-expansion-item
        v-if="!!option.children"
        expand-separator
        :icon="option.icon"
        :label="option.label"
        :header-inset-level="0"
        :content-inset-level="option.level"
      >
        <Drawer :model="option.children" :depth="option.children" />
      </q-expansion-item>

      <q-list v-else>
        <q-item clickable v-ripple :to="option.to">
          <q-item-section avatar>
            <q-icon :name="option.icon" />
          </q-item-section>
          <q-item-section>{{ option.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Drawer',
  props: ['model', 'depth'],
  data() {
    return {
      expanded: false,
      start: 0
      //   model: []
    };
  },

  computed: {
    //   ...mapGetters(['sidebar'])
  },
  created() {
    console.log('inside sidebar created', this.model);
    //this.model = this.sidbar;
    // console.log('inside drawer created', this.model);
  }
};
</script>
