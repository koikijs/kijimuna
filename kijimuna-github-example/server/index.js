const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passporter = require("./passporter");
const api = require("./api");
const config = require("../config");
const nextApp = next({ dev: config.isDev });
const handle = nextApp.getRequestHandler(); //part of next config

nextApp.prepare().then(() => {
  // express code here
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  passporter(app, config.github.auth, config.origin);
  api(app);
  app.get("*", (req, res) => {
    return handle(req, res); // for all the react stuff
  });
  app.listen(config.port, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${config.port}`);
  });
});
