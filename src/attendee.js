import request from 'superagent';
import service from './service';
import validate from './validate';

const KIJIMUNA_CHAUS_CLIENT_ID = process.env.KIJIMUNA_CHAUS_CLIENT_ID;
const KIJIMUNA_CHAUS_SECRET_ID = process.env.KIJIMUNA_CHAUS_SECRET_ID;
const headers = {
  'x-chaus-client': KIJIMUNA_CHAUS_CLIENT_ID,
  'x-chaus-secret': KIJIMUNA_CHAUS_SECRET_ID
};

export function gets({ req }) {
  return request
    .get('https://chaus.now.sh/apis/kijimuna/attendees')
    .set(headers)
    .send({
      service: service.get(req),
      group: req.body.group,
      user: req.body.user
    })
    .then(response => response.body.items);
}

export function post({ req }) {
  return request
    .post('https://chaus.now.sh/apis/kijimuna/attendees')
    .set(headers)
    .send({
      service: service.get(req),
      group: req.params.id,
      user: req.body.user
    });
}

export default {
  gets,
  post
};
