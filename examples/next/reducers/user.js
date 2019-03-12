export const SET_USER = "SET_USER";

export default function reducer(state = { item: undefined }, action) {
  switch (action.type) {
    case SET_USER:
      console.log(action.type, action.user);
      return {
        ...state,
        item: action.user
      };
    default:
      return state;
  }
}

export function set(user) {
  return {
    type: SET_USER,
    user
  };
}
