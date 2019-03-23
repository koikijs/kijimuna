import config from "../config";
import getHeaders from "../helpers/header";

export const FETCH_USER = "FETCH_USER";

export default function reducer(state = { item: undefined }, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        item: action.user
      };
    default:
      return state;
  }
}

export function fetchUser({ req, group }) {
  return async (dispatch, getState) => {
    const res = await fetch(`${config.origin}/auth`, {
      headers: getHeaders({ req })
    });
    const json = await res.json();
    if (res.ok) {
      return dispatch({
        type: FETCH_USER,
        user: json
      });
    }
  };
}
