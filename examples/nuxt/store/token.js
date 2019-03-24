import axios from "axios";
import config from "../config";
import getHeaders from "../helpers/header";

export const state = () => ({
  item: undefined
});

export const mutations = {
  setToken(state, token) {
    state.item = token;
  }
};

export const actions = {
  async issueToken({ commit }, { req, group }) {
    const res = await axios({
      method: "post",
      url: `${config.origin}/api/token`,
      headers: getHeaders({ req }),
      data: {
        group
      }
    }).then(res => res, res => res.response);
    commit("setToken", res.data.token);
  }
};
