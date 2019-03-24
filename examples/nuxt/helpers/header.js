import config from "../config";

export default function getHeaders({ req }) {
  return req && req.headers
    ? {
        "content-type": "application/json",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en",
        "cache-control": "no-cache",
        cookie: decodeURIComponent(req.headers.cookie),
        origin: config.origin,
        pragma: "no-cache",
        "user-agent": req.headers["user-agent"]
      }
    : {
        "content-type": "application/json"
      };
}
