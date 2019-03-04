const fetch = require("isomorphic-unfetch");
const config = require("../config");

// TODO: Refactoring logic cuz dirty shit...
module.exports = function(app) {
  app.get("/api/sync", (req, res) => {
    if (req.user) {
      fetch(`${config.kijimuna.url}/api/users`, {
        method: "POST",
        headers: config.kijimuna.auth,
        body: {
          id: req.user.login
        }
      })
        .catch(() => {})
        .then(() => {
          fetch(req.user._json.organizations_url);
        })
        .then(res => res.json())
        .then(items =>
          Promise.all(
            items.map(item =>
              fetch(`${config.kijimuna.url}/api/groups`, {
                method: "POST",
                headers: config.kijimuna.auth,
                body: {
                  id: item.login
                }
              })
            )
          )
            .catch(() => {})
            .then(() =>
              Promise.all(
                items.map(item =>
                  fetch(`${config.kijimuna.url}/api/groups/attendees`, {
                    method: "POST",
                    headers: config.kijimuna.auth,
                    body: {
                      user: req.user.login,
                      group: item.login
                    }
                  })
                )
              )
            )
        )
        .catch(() => {})
        .then(() => res.json({}));
    } else {
      res.status(401).json({});
    }
  });
};
