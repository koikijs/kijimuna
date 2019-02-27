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
    .get('https://chaus.now.sh/apis/kijimuna/users')
    .set(headers)
    .query({
      service: service.get(req),
      offset: req.query.offset || 0,
      limit: req.query.limit || 20,
      fields: 'id,name,icon,custom'
    })
    .then(({ body: { offset, limit, size, items } }) => ({
      offset,
      limit,
      size,
      items: items.map(item => ({
        ...item,
        custom: item.custom ? JSON.stringify(item.custom) : null
      }))
    }));
}

export function post({ req }) {
  return request
    .post('https://chaus.now.sh/apis/kijimuna/users')
    .set(headers)
    .send({
      service: service.get(req),
      name: req.body.name,
      icon: req.body.icon,
      custom: req.body.custom ? JSON.stringify(req.body.custom) : null
    });
}
export default {
  gets,
  post
};
