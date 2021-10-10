<template>
  <q-dialog v-model="isShow" persistent>
    <q-layout view="Lhh lpR fff" container class="bg-white" style="height: 320px">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>{{ modalTitle }}</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" @click="closeDialog" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <q-form>
            <q-input
              v-model="postTitle"
              label="Title"
              autocomplete="off"
              spellcheck="false"
              lazy-rules
              autofocus
              :rules="[val => val && val.length > 0 || 'This field is required']"
            />
            <q-input
              v-model="postContent"
              label="Body"
              autocomplete="off"
              spellcheck="false"
              lazy-rules
              autofocus
              :rules="[val => val && val.length > 0 || 'This field is required']"
            />

            <div class="row justify-end q-mt-lg">
              <div>
                <q-btn label="Save" type="submit" color="primary" />
              </div>
            </div>
          </q-form>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PostModify',

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    postData: {
      type: Object,
      default: null,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    isEdit: {
      immediate: true,
      handler(v) {
        if (v) {
          this.modalTitle = 'Edit Post';
          this.mappingCurrentValue();
        } else {
          this.modalTitle = 'Create Post';
        }
      },
    },
  },

  computed: {
    isShow() {
      let v = false;
      if (this.show) v = true;

      return v;
    },
  },

  data: () => ({
    modalTitle: 'Create Post',
    postTitle: '',
    postContent: '',
  }),

  methods: {
    closeDialog() {
      this.postTitle = '';
      this.postContent = '';
      this.$emit('close');
    },

    mappingCurrentValue() {
      this.postTitle = this.postData.title;
      this.postContent = this.postData.body;
    },
  },
});
</script>
