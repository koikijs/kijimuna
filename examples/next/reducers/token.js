import config from "../config";
import getHeaders from "../helpers/header";

export const ISSUE_TOKEN = "ISSUE_TOKEN";

export default function reducer(state = { item: undefined }, action) {
  switch (action.type) {
    case ISSUE_TOKEN:
      return {
        ...state,
        item: action.token
      };
    default:
      return state;
  }
}

export function issueToken({ store, req, group }) {
  return async (dispatch, getState) => {
    const res = await fetch(`${config.origin}/api/token`, {
      method: "POST",
      headers: getHeaders({ req }),
      body: JSON.stringify({
        group
      })
    });
    const json = await res.json();
    return dispatch({
      type: ISSUE_TOKEN,
      token: json.token
    });
  };
}
