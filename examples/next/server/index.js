const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { parse } = require("url");
const passporter = require("./passporter");
const api = require("./api");
const config = require("../config");

function initialize(cb) {
  // express code here
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  passporter(app, config.github.auth, config.origin);
  api(app);
  if (cb) {
    cb(app);
  }
}

if (config.isDev) {
  const nextApp = next({ dev: true });
  const handle = nextApp.getRequestHandler();
  nextApp.prepare().then(
    () => {
      initialize(app => {
        app.get("/groups/:group", (req, res) => {
          req.query.group = req.params.group;
          return nextApp.render(req, res, "/index", req.params);
        });
        app.get("*", (req, res) => {
          return handle(req, res);
        });
        app.listen(config.port);
      });
    },
    error => console.log(error)
  );
} else {
  initialize(app => {
    module.exports = app;
  });
}
