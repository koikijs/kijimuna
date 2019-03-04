const port = process.env.PORT || 3000;
const isDev = process.env.NODE_DEV !== "production";
const origin = isDev
  ? `http://localhost:${port}`
  : "https://kijimuna-github-example.now.sh";

module.exports = {
  port,
  isDev,
  origin,
  kijimuna: {
    url: "https://kijimuna.now.sh",
    auth: {
      client: process.env.KIJIMUNA_EXAMPLE_CLIENT,
      secret: process.env.KIJIMUNA_EXAMPLE_SECRET
    }
  },
  github: {
    auth: {
      client: process.env.KIJIMUNA_GITHUB_EXAMPLE_CLIENT,
      secret: process.env.KIJIMUNA_GITHUB_EXAMPLE_SECRET
    }
  }
};
