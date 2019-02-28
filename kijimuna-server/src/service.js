import request from 'superagent';
import uuidv4 from 'uuid/v4';

const KIJIMUNA_CHAUS_CLIENT_ID = process.env.KIJIMUNA_CHAUS_CLIENT_ID;
const KIJIMUNA_CHAUS_SECRET_ID = process.env.KIJIMUNA_CHAUS_SECRET_ID;
const headers = {
  'x-chaus-client': KIJIMUNA_CHAUS_CLIENT_ID,
  'x-chaus-secret': KIJIMUNA_CHAUS_SECRET_ID
};

const services = {};
export function init() {
  return request
    .get('https://chaus.now.sh/apis/kijimuna/services')
    .set(headers)
    .then(
      response => {
        response.body.items.forEach(service => {
          services[`${service.client}-${service.secret}`] = {
            ...service
          };
        });
        return services;
      },
      error => {
        console.error(error);
      }
    );
}

export function issue() {
  const data = {
    client: uuidv4(),
    secret: uuidv4()
  };
  return request
    .post('https://chaus.now.sh/apis/kijimuna/services')
    .set(headers)
    .send(data)
    .then(response => {
      set({
        ...data,
        ...response.body
      });
      return {
        ...data,
        ...response.body
      };
    });
}

export function set(service) {
  services[`${service.client}-${service.secret}`] = {
    ...service
  };
}

export function get(req) {
  const client = req.get('client');
  const secret = req.get('secret');
  return (services[`${client}-${secret}`] || {}).id;
}

export default {
  init,
  set,
  get,
  issue
};
