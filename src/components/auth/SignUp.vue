<template>
  <div>
    <q-input
      class="q-pa-xs"
      dense
      outlined
      v-model="username"
      label="Username*"
      lazy-rules
    ></q-input>
    <div class="row">
      <q-input
        dense
        class="q-pa-xs col-lg-6 col-md-6 col-sm-12 col-xs-12"
        type="password"
        outlined
        v-model="password"
        label="Password*"
        lazy-rules
      ></q-input>
      <q-input
        dense
        class="q-pa-xs col-lg-6 col-md-6 col-sm-12 col-xs-12"
        type="password"
        outlined
        v-model="password2"
        label="Confirm Password*"
        lazy-rules
      ></q-input>
    </div>
    <q-input
      dense
      class="q-pa-xs"
      type="email"
      outlined
      v-model="email"
      label="Email Address*"
      lazy-rules
    ></q-input>
    <q-input
      dense
      class="q-pa-xs"
      outlined
      type="number"
      v-model.number="telephone"
      label="Mobile Number*"
      lazy-rules
    ></q-input>

    <q-btn
      label="Signup"
      @click="login"
      color="teal"
      class="text-capitalized float-right"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      password2: null,
      email: null,
      telephone: null
    };
  }
};
</script>

<style></style>
