import { PROPS, ID_ACTION } from "../../kijimuna-server/src/constants";
export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE";
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

export default function reducer(
  state = { messages: [], on: [], off: [] },
  action
) {
  console.log(action);
  switch (action.type) {
    case WS_OPEN:
      return {
        ...state,
        messages: []
      };
    case WS_RECEIVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(convert(action.data))
      };
    case WS_FETCH_HISTORY:
      return {
        ...state,
        messages: (action.data[PROPS.HISTORY] || [])
          .map(item => convert(item))
          .concat(state.messages)
      };
    case WS_UPDATE_MEMBER:
      return {
        ...state,
        on: action.data[PROPS.ONLINE_MEMBERS],
        off: action.data[PROPS.OFFLINE_MEMBERS]
      };
    default:
      return state;
  }
}

export function open() {
  return {
    type: WS_OPEN
  };
}

export function send(data) {
  return {
    type: WS_SEND_MESSAGE,
    data
  };
}

export function receive(data) {
  const action = ID_ACTION[data[PROPS.ACTION]];
  return {
    type:
      action === "SEND"
        ? WS_RECEIVE_MESSAGE
        : action === "FETCH_HISTORY"
        ? WS_FETCH_HISTORY
        : action === "ONLINE_MEMBER_UPDATES"
        ? WS_UPDATE_MEMBER
        : WS_OTHERS,
    data: data[PROPS.DATA]
  };
}
