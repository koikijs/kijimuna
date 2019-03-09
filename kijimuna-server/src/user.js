import request from 'superagent'
import service from './service'
import validate from './validate'

const KIJIMUNA_CHAUS_CLIENT_ID = process.env.KIJIMUNA_CHAUS_CLIENT_ID
const KIJIMUNA_CHAUS_SECRET_ID = process.env.KIJIMUNA_CHAUS_SECRET_ID
const headers = {
  'x-chaus-client': KIJIMUNA_CHAUS_CLIENT_ID,
  'x-chaus-secret': KIJIMUNA_CHAUS_SECRET_ID
}
export function gets ({ req }) {
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
        id: item.name,
        icon: item.icon,
        custom: item.custom ? JSON.stringify(item.custom) : null
      }))
    }))
}

export function getByName ({ req, params = {} }) {
  return request
    .get('https://chaus.now.sh/apis/kijimuna/users')
    .set(headers)
    .query({
      service: params.service || service.get(req),
      name: params.id || req.params.id,
      fields: 'id,name,icon,custom'
    })
    .then(users => users.body.items[0])
}

export function get ({ req }) {
  return getByName({ req })
    .then(user =>
      Promise.all([
        request
          .get(`https://chaus.now.sh/apis/kijimuna/users/${user.id}`)
          .set(headers)
          .query({
            service: service.get(req),
            fields: 'id,name,icon,custom'
          }),
        request
          .get('https://chaus.now.sh/apis/kijimuna/attendees')
          .set(headers)
          .query({
            service: service.get(req),
            expands: 'group',
            user: user.id,
            limit: 1000
          })
      ])
    )
    .then(([{ body: { id, name, icon, custom } }, { body: { items } }]) => ({
      id,
      name,
      icon,
      custom,
      groups: items.map(item => ({
        id: item.group.name,
        icon: item.group.icon,
        custom: item.group.custom ? JSON.stringify(item.group.custom) : null
      }))
    }))
}

export function post ({ req }) {
  return request
    .post('https://chaus.now.sh/apis/kijimuna/users')
    .set(headers)
    .send({
      service: service.get(req),
      name: req.body.id,
      icon: req.body.icon,
      custom: req.body.custom ? JSON.stringify(req.body.custom) : null
    })
    .then(({ body: { id } }) =>
      request
        .get(`https://chaus.now.sh/apis/kijimuna/users/${id}`)
        .set(headers)
        .send()
        .then(({ body }) => ({ id: body.name }))
    )
}

export function patch ({ req }) {
  return getByName({ req }).then(user =>
    request
      .patch(`https://chaus.now.sh/apis/kijimuna/users/${user.id}`)
      .set(headers)
      .send({
        icon: req.body.icon,
        custom: req.body.custom ? JSON.stringify(req.body.custom) : null
      })
  )
}

export function remove ({ req }) {
  return getByName({ req }).then(user =>
    request
      .post(`https://chaus.now.sh/apis/kijimuna/users/${req.params.id}`)
      .set(headers)
      .send()
  )
}
export default {
  gets,
  get,
  post,
  patch,
  remove,
  getByName
}
