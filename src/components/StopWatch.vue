<template>
  <div>{{ hours }} : {{ minutes }} : {{ seconds }}</div>
</template>
<script>
export default {
  props: ['action'],
  watch: {
    action(newVal) {
      console.log('new aciton', newVal);
      //newVal ? this.setTimer() : clearInterval(this.myTimer);
      if (newVal) {
        this.setTimer();
      } else {
        this.clearTimer();
      }
    }
  },
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      myTimer: ''
    };
  },
  methods: {
    clearTimer() {
      clearInterval(this.myTimer);
      this.$emit('updateTime', {
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds
      });
    },
    setTimer() {
      let v = this;
      this.myTimer = setInterval(() => {
        console.log('inside timer');
        if (v.seconds < 59) {
          v.seconds++;
        } else {
          v.seconds = 0;
          if (v.minutes < 59) {
            v.minutes++;
          } else {
            v.minutes = 0;
            v.hours++;
          }
        }
      }, 1000);
    }
  }
};
</script>
