<template>
  <div class="send-message-container">
    <textarea v-model="input" class="send-message-textarea" />
    <button class="send-message-send" @click="this.send">
      <i class="fas fa-running" />
    </button>
  </div>
</template>

<script>
import { PROPS, ACTION_ID } from "../constants";

export default {
  data() {
    return { input: "" };
  },
  props: ["websocket"],
  methods: {
    send() {
      this.$props.websocket.send(
        JSON.stringify({
          [PROPS.ACTION]: ACTION_ID.SEND,
          [PROPS.DATA]: {
            [PROPS.MESSAGE]: this.input
          }
        })
      );
      this.input = "";
    }
  }
};
</script>

<style>
.send-message-container {
  background-color: #000000;
  height: 8em;
  display: flex;
  justify-content: stretch;
  align-items: center;
  position: relative;
}

.send-message-textarea {
  width: 100%;
  margin: 0 20px;
  border-radius: 1em;
  height: 2.5em;
  outline: none;
  padding: 10px;
  resize: none;
  font-size: 16px;
}

.send-message-send {
  width: 20px;
  height: 27.5px;
  position: absolute;
  color: #4ec5c1;
  right: 40px;
  font-size: 25px;
}
</style>
