<template>
  <q-item
    clickable
    tag="a"
    @click="action(link)"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },
  },

  methods: {
    action(p) {
      if (p === 'admin') {
        this.$router.push({ name: 'Admin' });
      }
      if (p === 'post') {
        this.$router.push({ name: 'Post' });
      }
      if (p === 'logout') {
        localStorage.clear();
        this.$router.push({ name: 'Login' });
      }
    },
  },
});
</script>
