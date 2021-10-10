<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="fw600-fff">
          {{ headerTitle }}
        </q-toolbar-title>

        <div>
          <q-icon
            class="cursor-pointer"
            name="favorite"
            size="24px"
          />
          <q-icon
            class="cursor-pointer"
            name="more_vert"
            size="24px"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          class="txt20-000"
          header
        >
        Hi, {{ user }}
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.key"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Admin',
    caption: 'Menu for admin',
    icon: 'admin_panel_settings',
    link: 'admin',
  },
  {
    title: 'List Post',
    caption: 'Display list of posts',
    icon: 'people_alt',
    link: 'post',
  },
  {
    title: 'Logout',
    caption: 'Logout from device',
    icon: 'logout',
    link: 'logout',
  },
];

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  computed: {
    user() {
      const v = JSON.parse(localStorage.getItem('userInfo'));
      return v.name;
    },

    headerTitle() {
      let v = 'User';
      if (this.$route.name.toUpperCase() === 'ADMIN') v = 'Admin';
      return v;
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
