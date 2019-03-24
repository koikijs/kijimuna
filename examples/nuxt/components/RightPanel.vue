<template>
  <div class="right-panel-container">
    <Header v-bind:icon="group.icon" v-bind:title="group.id" />
    <ul class="right-panel-messages">
      <li class="right-panel-message" v-for="message in messages">
        <div class="right-panel-user">
          <div
            class="right-panel-icon"
            v-bind:style="{
              backgroundImage: `url(${
                (
                  group.attendees.find(
                    attendee => attendee.id === message.posted
                  ) || {}
                ).icon
              })`
            }"
          />
          <div class="right-panel-name">{{ message.posted }}</div>
        </div>
        <div class="right-panel-text">
          <vue-markdown>{{ message.message }}</vue-markdown>
        </div>
      </li>
    </ul>
    <SendMessage v-bind:websocket="websocket" />
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import config from "~/config";
import Header from "~/components/Header";
import SendMessage from "~/components/SendMessage";
import ws from "~/helpers/ws";

const connect = (_this, props, store) => {
  console.log("kitemasu", props.token);
  if (props.token) {
    const websocket = ws(`${config.kijimuna.ws}/ws/connects/${props.token}`);
    websocket.onopen = () => {
      store.dispatch("ws/open");
    };
    websocket.onclose = () => {
      store.dispatch("ws/close");
    };
    websocket.onmessage = message => {
      let json = {};
      try {
        json = JSON.parse(message.data);
      } catch (e) {}
      store.dispatch("ws/receive", { data: json });
    };
    _this.websocket = websocket;
  }
};

export default {
  props: ["user", "group", "messages", "token"],
  data() {
    return {
      websocket: undefined
    };
  },
  components: {
    VueMarkdown,
    Header,
    SendMessage
  },
  mounted() {
    connect(
      this,
      this.$props,
      this.$store
    );
  }
};
</script>

<style>
.right-panel-container {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  width: calc(100% - 250px);
  flex-direction: column;
}

.right-panel-messages {
  color: #ec576b;
  background-color: #ffffff;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
}

.right-panel-message {
  margin-bottom: 20px;
}

.right-panel-user {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.right-panel-name {
  font-weight: bold;
}

.right-panel-icon {
  width: 25px;
  height: 25px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin-right: 10px;
  background-position: center;
  background-color: #ffffff;
}

.right-panel-text {
  margin-left: 35px;
  font-weight: 300;
  color: #000000;
  font-size: 1.2em;
  font-family: Roboto;
}
.right-panel-text ul {
  list-style-type: disc;
}

.right-panel-image {
  background-repeat: none;
  background-color: none;
  background-position: center;
  background-size: contain;
  width: 250px;
  height: 250px;
}
</style>
