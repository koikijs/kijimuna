const axios = require("axios");
const config = require("../config");
const headers = {
  "Content-Type": "application/json",
  ...config.kijimuna.auth
};

// TODO: Refactoring logic cuz dirty shit...
module.exports = function(app) {
  app.get("/api/groups/:id", (req, res) => {
    if (req.user && req.user.username) {
      axios({
        method: "get",
        url: `${config.kijimuna.url}/api/groups/${encodeURIComponent(
          req.params.id
        )}`,
        headers
      }).then(({ data }) => res.json(data));
    } else {
      res.status(401).json({});
    }
  });
  app.post("/api/token", (req, res) => {
    if (req.user && req.user.username) {
      axios({
        method: "post",
        url: `${config.kijimuna.url}/api/token`,
        headers,
        data: {
          group: req.body.group,
          user: req.user.username
        }
      }).then(({ data }) => res.json(data));
    } else {
      res.status(401).json({});
    }
  });
  app.get("/api/me", (req, res) => {
    if (req.user && req.user.username) {
      axios({
        method: "get",
        url: `${config.kijimuna.url}/api/users/${encodeURIComponent(
          req.user.username
        )}`,
        headers
      }).then(({ data }) => res.json(data));
    } else {
      res.status(401).json({});
    }
  });
};
