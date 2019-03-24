import axios from "axios";
import config from "~/config";
import getHeaders from "~/helpers/header";
import { PROPS, ID_ACTION } from "~/constants";

export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE";
export const WS_CLEAR_MESSAGE = "WS_CLEAR_MESSAGE";
export const WS_RECEIVE_MESSAGE = "WS_RECEIVE_MESSAGE";
export const WS_FETCH_HISTORY = "WS_FETCH_HISTORY";
export const WS_UPDATE_MEMBER = "WS_UPDATE_MEMBER";
export const WS_OPEN = "WS_OPEN";
export const WS_OTHERS = "WS_OTHERS";

const convert = data => ({
  id: data[PROPS.ID],
  message: data[PROPS.MESSAGE],
  time: data[PROPS.TIME],
  posted: data[PROPS.POSTED]
});

export const state = () => ({
  messages: []
});

export const mutations = {
  open(state) {
    state.messages = [];
  },
  close(state) {
    state.messages = [];
  },
  receive(state, json) {
    const data = json[PROPS.DATA];
    const action = ID_ACTION[json[PROPS.ACTION]];
    switch (action) {
      case "SEND":
        state.messages.push(convert(data));
        break;
      case "FETCH_HISTORY":
        state.messages = (data[PROPS.HISTORY] || [])
          .map(item => convert(item))
          .concat(state.messages);
        break;
      case "ONLINE_MEMBER_UPDATES":
        state.on = data[PROPS.ONLINE_MEMBERS];
        state.off = data[PROPS.OFFLINE_MEMBERS];
        break;
      default:
    }
  }
};

export const actions = {
  open({ commit }) {
    commit("open");
  },
  close({ commit }) {
    commit("close");
  },
  receive({ commit }, { data }) {
    commit("receive", data);
  }
};
