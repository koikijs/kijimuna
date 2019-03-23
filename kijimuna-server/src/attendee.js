import request from 'superagent'
import service from './service'
import validate from './validate'
import group from './group'
import user from './user'

const KIJIMUNA_CHAUS_CLIENT_ID = process.env.KIJIMUNA_CHAUS_CLIENT_ID
const KIJIMUNA_CHAUS_SECRET_ID = process.env.KIJIMUNA_CHAUS_SECRET_ID
const headers = {
  'x-chaus-client': KIJIMUNA_CHAUS_CLIENT_ID,
  'x-chaus-secret': KIJIMUNA_CHAUS_SECRET_ID
}

export function gets ({ req }) {
  return Promise.all([
    group.getByName({ req, params: { id: req.body.group } }),
    user.getByName({ req, params: { id: req.body.user } })
  ]).then(
    ([group, user]) =>
      console.log('#attendee - gets', req.body, group, user) ||
      request
        .get('https://chaus.now.sh/apis/kijimuna/attendees')
        .set(headers)
        .query({
          service: service.get(req),
          group: group.id,
          user: user.id
        })
        .then(response => response.body.items)
  )
}

export function post ({ req }) {
  return Promise.all([
    group.getByName({ req, params: { id: req.params.id } }),
    user.getByName({ req, params: { id: req.body.user } })
  ]).then(([group, user]) =>
    request
      .post('https://chaus.now.sh/apis/kijimuna/attendees')
      .set(headers)
      .send({
        service: service.get(req),
        group: group.id,
        user: user.id
      })
  )
}

export default {
  gets,
  post
}
