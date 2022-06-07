<template>
  <div>{{ appMessage }}</div>

  <router-link to="/home">home</router-link>
  <router-link to="/about">about</router-link>
  <router-link to="/user/lczmx">user</router-link>

  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const appMessage = 'App元件';
    return {
      appMessage,
    };
  },
});
</script>

<style>
#app {
  text-align: center;
  margin-top: 50px;
}

a {
  margin: 30px;
  display: inline-block;
}
</style>
