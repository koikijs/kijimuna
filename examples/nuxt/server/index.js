const express = require("express");
const consola = require("consola");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { Nuxt, Builder } = require("nuxt");
const config = require("../config");
const api = require("./api");
const passporter = require("./passporter");
const app = express();

// Import and Set Nuxt.js options
let nextConfig = require("../nuxt.config.js");
nextConfig.dev = !(process.env.NODE_ENV === "production");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
passporter(app, config.github.auth, config.origin);
api(app);

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(nextConfig);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (nextConfig.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
