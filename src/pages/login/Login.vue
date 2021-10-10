<template>
    <div class="login-container">
        <div class="login-content row justify-center items-center">
            <div>
              Please login to continue
            </div>
            <q-btn label="login" color="primary" @click="show = true" />
        </div>
    </div>
    <q-dialog v-model="show" persistent>
      <q-card class="q-pa-md">
          <q-card-section>
            <div class="q-my-md txt20-000">Login</div>
            <q-form ref="loginForm">
              <q-input
                v-model="userId"
                label="User ID"
                autocomplete="off"
                spellcheck="false"
                lazy-rules
                autofocus
                :rules="[val => val && val.length > 0 || 'This field is required']"
              />
              <q-input
                v-model="email"
                label="Email"
                autocomplete="off"
                spellcheck="false"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'This field is required']"
              />
            </q-form>
          </q-card-section>

          <q-card-actions class="row justify-end">
            <div>
              <q-btn class="q-mx-sm" label="Cancel" v-close-popup />
              <q-btn color="primary" label="Login" @click="login" />
            </div>
          </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
// import { ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

export default {
  data: () => ({
    show: false,
    userId: '',
    email: '',
  }),

  methods: {
    login() {
      const $q = useQuasar();
      this.$refs.loginForm.validate().then((success) => {
        if (success) {
          api.get(`/users/${this.userId}`)
            .then((res) => {
              this.show = false;
              localStorage.setItem('isAdmin', JSON.stringify(false));
              localStorage.setItem('userInfo', JSON.stringify(res.data));
              this.$router.push({ name: 'Post' });
            })
            .catch(() => {
              $q.notify({
                color: 'negative',
                position: 'top',
                message: 'Login failed',
                icon: 'report_problem',
              });
            });
        }
      });
    },
  },

  //   setup() {
  //     const show = ref(false);
  //     const userId = ref('');
  //     const email = ref('');

//     return {
//       show,
//       userId,
//       email,
//     };
//   },
};
</script>
