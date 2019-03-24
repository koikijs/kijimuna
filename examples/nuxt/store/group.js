import axios from "axios";
import config from "../config";
import getHeaders from "../helpers/header";

export const state = () => ({
  item: undefined,
  items: []
});

export const mutations = {
  setGroup(state, group) {
    state.item = group;
  },
  setGroups(state, groups) {
    state.items = groups;
  }
};

export const actions = {
  async fetchGroup({ commit }, { req, group }) {
    const res = await axios({
      method: "get",
      url: `${config.origin}/api/groups/${encodeURIComponent(group)}`,
      headers: getHeaders({ req })
    }).then(res => res, res => res.response);
    commit("setGroup", res.data);
  },
  async fetchGroups({ commit }, { req, redirect }) {
    const response = await axios({
      method: "get",
      url: `${config.origin}/api/me`,
      headers: getHeaders({ req })
    }).then(res => res, res => res.response);
    if (redirect && response.data.groups && response.data.groups.length) {
      redirect(302, `${config.origin}/groups/${response.data.groups[0].id}`);
    }
    commit("setGroups", response.data.groups);
  }
};
