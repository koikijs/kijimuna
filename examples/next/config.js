const port = 3000;
const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  port,
  isDev,
  origin: isDev
    ? `http://localhost:${port}`
    : "https://kijimuna-next-example.now.sh",
  kijimuna: {
    url: isDev ? "http://localhost:3010" : "https://kijimuna.now.sh",
    ws: isDev ? "ws://localhost:3010" : "wss://kijimuna.now.sh",
    // url: "https://kijimuna.now.sh",
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
