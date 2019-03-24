import config from "../config";
import getHeaders from "../helpers/header";

export const FETCH_GROUPS = "FETCH_GROUPS";
export const FETCH_GROUP = "FETCH_GROUP";
export const SELECT_GROUP = "SELECT_GROUP";

export default function reducer(
  state = { items: [], item: undefined },
  action
) {
  switch (action.type) {
    case FETCH_GROUPS:
      return {
        ...state,
        items: action.groups || []
      };
    case FETCH_GROUP:
      return {
        ...state,
        item: action.group
      };
    default:
      return state;
  }
}

export function fetchGroup({ req, group }) {
  return async (dispatch, getState) => {
    const res = await fetch(
      `${config.origin}/api/groups/${encodeURIComponent(group)}`,
      {
        headers: getHeaders({ req })
      }
    );
    const json = await res.json();
    return dispatch({
      type: FETCH_GROUP,
      group: json
    });
  };
}

export function fetchGroups({ req, res, group }) {
  return async (dispatch, getState) => {
    const response = await fetch(`${config.origin}/api/me`, {
      headers: getHeaders({ req })
    });
    const json = await response.json();
    if (!group && json.groups && json.groups.length) {
      if (res) {
        res.writeHead(302, {
          Location: `${config.origin}/groups/${json.groups[0].id}`
        });
        res.end();
      } else {
        Router.replace({
          pathname: "/",
          query: { group: json.groups[0].id },
          asPath: `/groups/${json.groups[0].id}`
        });
      }
    }
    return dispatch({
      type: FETCH_GROUPS,
      groups: json.groups
    });
  };
}
