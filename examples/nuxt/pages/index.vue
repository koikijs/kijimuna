<template>
  <LoginPopup />
</template>

<script>
import LoginPopup from "~/components/LoginPopup.vue";

export default {
  components: {
    LoginPopup
  },
  async fetch({ store, params, req, redirect }) {
    await store.dispatch("user/fetchUser", { req });
    await store.dispatch("group/fetchGroups", { req, redirect });
  }
};
</script>
