export const SET_TOKEN = "SET_TOKEN";

export default function reducer(state = { item: undefined }, action) {
  switch (action.type) {
    case SET_TOKEN:
      console.log(action.type, action.user);
      return {
        ...state,
        item: action.token
      };
    default:
      return state;
  }
}

export function set(token) {
  return {
    type: SET_TOKEN,
    token
  };
}
