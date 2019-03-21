const fetch = require("isomorphic-unfetch");
const config = require("../config");
const headers = {
  "Content-Type": "application/json",
  ...config.kijimuna.auth
};

// TODO: Refactoring logic cuz dirty shit...
module.exports = function(app) {
  app.get("/api/groups/:id", (req, res) => {
    if (req.user && req.user.username) {
      fetch(
        `${config.kijimuna.url}/api/groups/${encodeURIComponent(
          req.params.id
        )}`,
        {
          headers
        }
      )
        .then(res => res.json())
        .then(json => res.json(json));
    } else {
      res.status(401).json({});
    }
  });
  app.post("/api/token", (req, res) => {
    if (req.user && req.user.username) {
      fetch(`${config.kijimuna.url}/api/token`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          group: req.body.group,
          user: req.user.username
        })
      })
        .then(res => res.json())
        .then(json => res.json(json));
    } else {
      res.status(401).json({});
    }
  });
  app.get("/api/me", (req, res) => {
    if (req.user && req.user.username) {
      fetch(
        `${config.kijimuna.url}/api/users/${encodeURIComponent(
          req.user.username
        )}`,
        {
          headers
        }
      )
        .then(res => res.json())
        .then(json => res.json(json));
    } else {
      res.status(401).json({});
    }
  });
};
