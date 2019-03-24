<template>
  <Chat
    v-bind:user="$store.state.user.item"
    v-bind:group="$store.state.group.item"
    v-bind:groups="$store.state.group.items"
    v-bind:messages="$store.state.ws.messages"
    v-bind:token="$store.state.token.item"
  />
</template>

<script>
import config from "~/config";
import Chat from "~/components/Chat";

export default {
  props: ["user", "group", "groups", "token", "messages"],
  components: {
    Chat
  },
  async fetch({ store, params, req, redirect }) {
    const group = params.id;
    await store.dispatch("user/fetchUser", { req });

    if (!store.state.user.item) {
      redirect(302, config.origin);
    }
    await store.dispatch("group/fetchGroups", { req });

    await store.dispatch("group/fetchGroup", { req, group });
    await store.dispatch("token/issueToken", { req, group });
    console.log(store.state);
  }
};
</script>
