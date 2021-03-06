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
      items:
        console.log('#group - gets', items) ||
        items.map(item => ({
          id: item.name,
          icon: item.icon,
          custom: item.custom ? JSON.stringify(item.custom) : null
        }))
    }))
}

export function get ({ req, params = {} }) {
  return getByName({ req, params })
    .then(group =>
      request
        .get('https://chaus.now.sh/apis/kijimuna/attendees?expands=user')
        .set(headers)
        .query({
          service: params.service || service.get(req),
          group: group.id,
          limit: 1000
        })
        .then(attendees => ({
          group,
          attendees: attendees.body
        }))
    )
    .then(({ group, attendees }) => ({
      id: group.name,
      icon: group.icon,
      custom: group.custom ? JSON.stringify(group.custom) : null,
      attendees: attendees.items.map(item => ({
        id: item.user.name,
        icon: item.user.icon,
        custom: item.user.custom ? JSON.stringify(item.user.custom) : null
      }))
    }))
}

export function post ({ req }) {
  return request
    .post('https://chaus.now.sh/apis/kijimuna/groups')
    .set(headers)
    .send({
      service: service.get(req),
      name: req.body.id,
      icon: req.body.icon,
      custom: req.body.custom ? JSON.stringify(req.body.custom) : null
    })
    .then(({ body: { id } }) =>
      request
        .get(`https://chaus.now.sh/apis/kijimuna/groups/${id}`)
        .set(headers)
        .send()
        .then(({ body }) => ({ id: body.name }))
    )
}

export function getByName ({ req, params = {} }) {
  return request
    .get('https://chaus.now.sh/apis/kijimuna/groups')
    .set(headers)
    .query({
      service: params.service || service.get(req),
      name: params.id || req.params.id,
      fields: 'id,name,icon,custom'
    })
    .then(groups => groups.body.items[0])
}

export function patch ({ req }) {
  return getByName({ req }).then(group =>
    request
      .patch(`https://chaus.now.sh/apis/kijimuna/groups/${group.id}`)
      .set(headers)
      .send({
        icon: req.body.icon,
        custom: req.body.custom ? JSON.stringify(req.body.custom) : null
      })
  )
}

export function remove ({ req }) {
  return getByName({ req }).then(group =>
    request
      .delete(`https://chaus.now.sh/apis/kijimuna/groups/${group.id}`)
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
