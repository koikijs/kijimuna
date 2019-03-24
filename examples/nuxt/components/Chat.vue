<template>
  <div class="chat-container">
    <LeftPanel
      v-bind:user="user"
      v-bind:groups="groups"
      v-bind:selected="group"
    />
    <RightPanel
      v-bind:user="user"
      v-bind:group="group"
      v-bind:token="token"
      v-bind:messages="messages"
    />
  </div>
</template>

<script>
import Header from "~/components/Header";
import LeftPanel from "~/components/LeftPanel";
import RightPanel from "~/components/RightPanel";

export default {
  props: ["user", "groups", "group", "token", "messages"],
  components: {
    Header,
    LeftPanel,
    RightPanel
  }
};
</script>

<style>
.chat-container {
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: stretch;
  height: 100%;
}
</style>
