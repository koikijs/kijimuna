import request from 'superagent';
import service from './service';
import validate from './validate';

const KIJIMUNA_CHAUS_CLIENT_ID = process.env.KIJIMUNA_CHAUS_CLIENT_ID;
const KIJIMUNA_CHAUS_SECRET_ID = process.env.KIJIMUNA_CHAUS_SECRET_ID;
const headers = {
  'x-chaus-client': KIJIMUNA_CHAUS_CLIENT_ID,
  'x-chaus-secret': KIJIMUNA_CHAUS_SECRET_ID
};
export function gets(req) {
  return request
    .get('https://chaus.now.sh/apis/kijimuna/groups')
    .set(headers)
    .query({
      service: service.get(req),
      offset: req.query.offset || 0,
      limit: req.query.limit || 20,
      fields: 'id,name'
    })
    .then(({ body: { offset, limit, size, items } }) => ({
      offset,
      limit,
      size,
      items
    }));
}

export function get(req) {
  console.log(req.params.id);
  return Promise.all([
    request
      .get(`https://chaus.now.sh/apis/kijimuna/groups/${req.params.id}`)
      .set(headers)
      .query({
        service: service.get(req),
        fields: 'id,name'
      }),
    request
      .get('https://chaus.now.sh/apis/kijimuna/attendees')
      .set(headers)
      .query({
        service: service.get(req),
        group: req.params.id,
        limit: 1000
      })
  ]).then(
    ([group, attendees]) =>
      console.log(group, attendees) || {
        ...group.body,
        attendees: attendees.body.items.map(item => item.user.id)
      }
  );
}

export function post(req) {
  return request
    .post('https://chaus.now.sh/apis/kijimuna/groups')
    .set(headers)
    .send({
      service: service.get(req),
      name: req.body.name
    });
}

export default {
  gets,
  get,
  post
};
