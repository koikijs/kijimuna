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
    .get('https://chaus.now.sh/apis/kijimuna/groups')
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

export function get({ req, params = {} }) {
  return Promise.all([
    request
      .get(
        `https://chaus.now.sh/apis/kijimuna/groups/${params.group ||
          req.params.id}`
      )
      .set(headers)
      .query({
        service: params.service || service.get(req),
        fields: 'id,name,icon,custom'
      }),
    request
      .get('https://chaus.now.sh/apis/kijimuna/attendees?expands=user')
      .set(headers)
      .query({
        service: params.service || service.get(req),
        group: params.group || req.params.id,
        limit: 1000
      })
  ]).then(([group, attendees]) => ({
    ...group.body,
    custom: group.body.custom ? JSON.stringify(group.body.custom) : null,
    attendees: attendees.body.items.map(item => ({
      id: item.user.id,
      name: item.user.name,
      icon: item.user.icon,
      custom: item.user.custom ? JSON.stringify(item.user.custom) : null
    }))
  }));
}

export function post({ req }) {
  return request
    .post('https://chaus.now.sh/apis/kijimuna/groups')
    .set(headers)
    .send({
      service: service.get(req),
      name: req.body.name,
      icon: req.body.icon,
      custom: req.body.custom ? JSON.stringify(req.body.custom) : null
    });
}

export function patch({ req }) {
  return request
    .patch(`https://chaus.now.sh/apis/kijimuna/groups/${req.params.id}`)
    .set(headers)
    .send({
      icon: req.body.icon,
      custom: req.body.custom ? JSON.stringify(req.body.custom) : null
    });
}

export function remove({ req }) {
  return request
    .delete(`https://chaus.now.sh/apis/kijimuna/groups/${req.params.id}`)
    .set(headers)
    .send();
}

export default {
  gets,
  get,
  post,
  patch,
  remove
};
