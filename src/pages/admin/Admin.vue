<template>
   <post-list />
</template>

<script>
import { defineComponent } from 'vue';
import PostList from '../post/Post.vue';

export default defineComponent({
  name: 'Admin',

  components: {
    PostList,
  },
});
</script>
