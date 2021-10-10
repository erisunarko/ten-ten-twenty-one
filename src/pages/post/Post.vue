<template>
  <div class="q-pa-md" style="height: 500px">
    <q-infinite-scroll @load="initialize">
      <div>
        <q-list>
          <q-card
            class="q-my-md mycard"
            v-for="(v, i) in posts"
            :key="i"
          >
            <q-item>
              <q-item-section class="cursor-pointer" @click="toDetail(v)">
                <q-item-label class="txt18-000">
                  {{ v.title }}
                </q-item-label>
                <q-item-label caption lines="2">
                  {{ v.body }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div>
                  <template v-if="isAdmin">
                    <q-icon
                      class="cursor-pointer q-ml-sm"
                      name="delete"
                      size="24px"
                      color="red"
                      @click="confirm = true"
                    />
                    <q-icon
                      class="cursor-pointer q-ml-sm"
                      name="edit"
                      size="24px"
                      color="yellow"
                      @click="toEdit(v)"
                    />
                  </template>
                  <template v-else>
                    <q-icon
                      class="cursor-pointer"
                      name="favorite"
                      size="24px"
                      :color="getColor(v.id)"
                      @click="setFavorite(v.id)"
                    />
                  </template>
                </div>
              </q-item-section>
            </q-item>
          </q-card>
        </q-list>
        <template v-if="isAdmin">
          <q-page-sticky position="bottom-right" :offset="[24, 24]">
            <q-btn fab icon="add" color="primary" @click="toCreate" />
          </q-page-sticky>
        </template>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>

  <q-dialog v-model="showDetail" persistent>
    <q-card>
      <q-card-section>
        <post-detail :postData="postData" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <post-modify
    :postData="postData"
    :isEdit="isEdit"
    :show="modify"
    @close="closeModifyDialog"
  />

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="error" color="red" text-color="white" />
        <span class="q-ml-sm">Are you sure delete this post?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="No" color="primary" v-close-popup />
        <q-btn label="Yes" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { api } from 'boot/axios';
import PostModify from './PostModify.vue';
import PostDetail from './PostDetail.vue';

export default defineComponent({
  name: 'Post',

  components: {
    PostModify,
    PostDetail,
  },

  data: () => ({
    posts: [],
    page: 1,
    limit: 5,
    confirm: false,
    modify: false,
    showDetail: false,
    postData: null,
    isAdmin: false,
    isEdit: false,
  }),

  created() {
    if (JSON.parse(localStorage.getItem('isAdmin'))) this.isAdmin = true;
  },

  methods: {
    toCreate() {
      this.postData = null;
      this.isEdit = false;
      this.modify = true;
    },

    toEdit(p) {
      this.isEdit = true;
      this.postData = { ...p };
      this.modify = true;
    },

    toDetail(p) {
      this.postData = { ...p };
      this.showDetail = true;
    },

    closeModifyDialog() {
      this.postData = null;
      this.isEdit = false;
      this.modify = false;
    },

    getColor(p) {
      let color = 'grey-5';
      if (localStorage.getItem('favorites') !== null) {
        const v = JSON.parse(localStorage.getItem('favorites'));
        if (v.includes(p)) color = 'pink-6';
      }

      return color;
    },

    setFavorite(p) {
      if (localStorage.getItem('favorites') === null) {
        const v = [];
        v.push(p);
        localStorage.setItem('favorites', JSON.stringify(v));
      } else {
        let v = JSON.parse(localStorage.getItem('favorites'));

        if (v.includes(p)) {
          v = v.filter((x) => x !== p);
        } else {
          v.push(p);
        }

        localStorage.setItem('favorites', JSON.stringify(v));
      }
      this.initialize();
    },

    /* eslint no-underscore-dangle: 0 */
    initialize(index, done) {
      const params = {};
      params._page = index;
      params._limit = this.limit;

      api.get('/posts', { params })
        .then((res) => {
          const resLength = res.data.length;
          for (let i = 0; i < resLength; i += 1) {
            this.posts.push(res.data[i]);
          }

          done();
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
});
</script>
