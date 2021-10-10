<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',

  watch: {
    $route(v) {
      if (v.name.toUpperCase() === 'ADMIN') {
        localStorage.setItem('isAdmin', JSON.stringify(true));
      } else {
        localStorage.setItem('isAdmin', JSON.stringify(false));
      }
    },
  },
});
</script>
