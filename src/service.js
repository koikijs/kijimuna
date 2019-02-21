import request from "superagent";

const KIJIMUNA_CHAUS_CLIENT_ID = process.env.KIJIMUNA_CHAUS_CLIENT_ID;
const KIJIMUNA_CHAUS_SECRET_ID = process.env.KIJIMUNA_CHAUS_SECRET_ID;

const services = {};
export function init() {
  return request
    .get("https://chaus.now.sh/apis/kijimuna/services")
    .set({
      "x-chaus-client": KIJIMUNA_CHAUS_CLIENT_ID,
      "x-chaus-secret": KIJIMUNA_CHAUS_SECRET_ID
    })
    .then(
      response => {
        response.body.items.forEach(service => {
          services[`${service.client}-${service.secret}`] = {
            ...service
          };
        });
      },
      error => {
        console.log(error);
      }
    );
}

export function set(service) {
  services[`${service.client}-${service.secret}`] = {
    ...service
  };
}

export function get(req) {
  const client = req.get("kijimuna-client");
  const secret = req.get("kijimuna-secret");
  return (services[`${client}-${secret}`] || {}).id;
}

export default {
  init,
  set,
  get
};
