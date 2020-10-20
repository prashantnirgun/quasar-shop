<template>
  <div></div>
</template>

<script>
import DataService from 'src/services/DataService';
export default {
  mounted() {
    DataService.get('guest').then(response => {
      console.log('resp', response.data);
    });
  }
};
</script>

<style></style>
