import axios from "axios";
import config from "../config";
import getHeaders from "../helpers/header";

export const state = () => ({
  item: undefined
});

export const mutations = {
  setUser(state, user) {
    state.item = user;
  }
};

export const actions = {
  async fetchUser({ commit }, { req }) {
    const res = await axios({
      method: "get",
      url: `${config.origin}/auth`,
      headers: getHeaders({ req })
    }).then(res => res, res => res.response);
    commit("setUser", res.data);
  }
};
