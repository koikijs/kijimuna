export const SET_GROUPS = "SET_GROUPS";
export const SET_GROUP = "SET_GROUP";
export const SELECT_GROUP = "SELECT_GROUP";

export default function reducer(
  state = { items: [], item: undefined, selected: undefined },
  action
) {
  switch (action.type) {
    case SET_GROUPS:
      return {
        ...state,
        items: action.groups || []
      };
    case SET_GROUP:
      return {
        ...state,
        item: action.group
      };
    case SELECT_GROUP:
      return {
        ...state,
        selected: action.id
      };
    default:
      return state;
  }
}

export function sets(groups) {
  return {
    type: SET_GROUPS,
    groups
  };
}

export function set(group) {
  return {
    type: SET_GROUP,
    group
  };
}

export function select(id) {
  return {
    type: SELECT_GROUP,
    id
  };
}
