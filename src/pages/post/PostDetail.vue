<template>
  <div v-if="post" class="q-py-md">
    <div class="row q-px-md txt24-000">
      <div>
        {{ post.title }}
      </div>
    </div>

    <div class="row q-px-md">
      {{ post.content }}
    </div>

    <div class="q-mt-md">
      <div class="row q-ml-md txt20-000">
        Comments
      </div>
      <q-list>
        <q-item
          v-for="(v, i) in comments"
          :key="i"
        >
          <q-item-section>
            <q-item-label class="txt18-000">
              {{ v.name }}
            </q-item-label>
            <q-item-label caption lines="2">
              {{ v.body }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'PostDetail',

  props: {
    postData: {
      type: Object,
      default: null,
    },
  },

  watch: {
    postData: {
      immediate: true,
      deep: true,
      handler(x) {
        this.initialize(x);
      },
    },
  },

  data: () => ({
    post: {
      title: '',
      content: '',
    },
    comments: [],
  }),

  methods: {
    initialize(p) {
      this.post.title = p.title;
      this.post.content = p.body;
      this.getComments(p.id);
    },

    getComments(p) {
      api.get('/comments', {
        params: {
          postId: p,
        },
      })
        .then((res) => {
          this.comments = res.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
});
</script>
