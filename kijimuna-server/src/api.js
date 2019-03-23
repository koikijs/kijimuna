import request from 'superagent'
import service from './service'
import group from './group'
import user from './user'
import attendee from './attendee'
import token from './token'
import validate from './validate'

export default function (app) {
  service.init()
  app.post('/api/services', (req, res) => {
    service.issue().then(
      response => {
        res.json({
          client: response.client,
          secret: response.secret
        })
      },
      error => {
        console.error(
          '/api/services - POST - error',
          error,
          req.params,
          req.query,
          req.body,
          req.headers
        )
        res.status(500).json({})
      }
    )
  })
  app.get('/api/groups', (req, res) => {
    if (!validate.service(req, res)) {
      return
    }
    group.gets({ req }).then(
      body => res.json(body),
      error => {
        res.json(error.response ? error.response.body : {})
        console.error(
          '/api/groups - GET - error',
          error,
          req.params,
          req.query,
          req.body,
          req.headers
        )
      }
    )
  })
  app.get('/api/groups/:id', (req, res) => {
    if (!validate.service(req, res)) {
      return
    }
    group.get({ req }).then(
      body => res.json(body),
      error => {
        res.json(error.response ? error.response.body : {})
        console.error(
          '/api/groups/:id - GET - error',
          error,
          req.params,
          req.query,
          req.body,
          req.headers
        )
      }
    )
  })
  app.post('/api/groups', (req, res) => {
    if (!validate.service(req, res)) {
      return
    }
    if (!req.body.id) {
      res.status(400).json({ error: '"id" in request body is required' })
    }
    if (req.body.icon && !/^https:\/\/.+$/.test(req.body.icon)) {
      res
        .status(400)
        .json({ error: '"icon" url should be start with https://' })
    }
    group.post({ req }).then(
      response => res.json(response),
      error => {
        res.json(error.response ? error.response.body : {})
        console.error(
          '/api/groups - POST - error',
          error,
          req.params,
          req.query,
          req.body,
          req.headers
        )
      }
    )
  })
  app.patch('/api/groups/:id', (req, res) => {
    if (!validate.service(req, res)) {
      return
    }
    if (req.body.icon && !/^https:\/\/.+$/.test(req.body.icon)) {
      res
        .status(400)
        .json({ error: '"icon" url should be start with https://' })
    }
    group.patch({ req }).then(
      response => res.json({ id: response.body.id }),
      error => {
        res.json(error.response ? error.response.body : {})
        console.error(
          '/api/groups/:id - PATCH - error',
          error,
          req.params,
          req.query,
          req.body,
          req.headers
        )
      }
    )
  })
  app.delete('/api/groups/:id', (req, res) => {
    if (!validate.service(req, res)) {
      return
    }
    group.remove({ req }).then(
      response => res.json({}),
      error => {
        res.json(error.response ? error.response.body : {})
        console.error(
          '/api/groups/:id - DELETE - error',
          error,
          req.params,
          req.query,
          req.body,
          req.headers
        )
      }
    )
  })
  app.get('/api/users', (req, res) => {
    if (!validate.service(req, res)) {
      return
    }
    user.gets({ req }).then(
      body => res.json(body),
      error => {
        res.json(error.response ? error.response.body : {})
        console.error(
          '/api/users - GET - error',
          error,
          req.params,
          req.query,
          req.body,
          req.headers
        )
      }
    )
  })

  app.post('/api/users', (req, res) => {
    if (!validate.service(req, res)) {
      return
    }
    if (!req.body.id) {
      res.status(400).json({ error: '"id" in request body is required' })
    }
    if (req.body.icon && !/^https:\/\/.+$/.test(req.body.icon)) {
      res
        .status(400)
        .json({ error: '"icon" url should be start with https://' })
    }
    user.post({ req }).then(
      response => res.json(response),
      error => {
        res.json(error.response ? error.response.body : {})
        console.error(
          '/api/users - POST - error',
          error,
          req.params,
          req.query,
          req.body,
          req.headers
        )
      }
    )
  })

  app.get('/api/users/:id', (req, res) => {
    if (!validate.service(req, res)) {
      return
    }
    user.get({ req }).then(
      body => res.json(body),
      error => {
        res.json(error.response ? error.response.body : {})
        console.error(
          '/api/users/:id - GET - error',
          error,
          req.params,
          req.query,
          req.body,
          req.headers
        )
      }
    )
  })

  app.patch('/api/users/:id', (req, res) => {
    if (!validate.service(req, res)) {
      return
    }
    if (req.body.icon && !/^https:\/\/.+$/.test(req.body.icon)) {
      res
        .status(400)
        .json({ error: '"icon" url should be start with https://' })
    }
    user.patch({ req }).then(
      response => res.json({ id: response.body.id }),
      error => {
        res.json(error.response ? error.response.body : {})
        console.error(
          '/api/users/:id - PATCH - error',
          error,
          req.params,
          req.query,
          req.body,
          req.headers
        )
      }
    )
  })
  app.delete('/api/users/:id', (req, res) => {
    if (!validate.service(req, res)) {
      return
    }
    user.remove({ req }).then(
      response => res.json({}),
      error => {
        res.json(error.response ? error.response.body : {})
        console.error(
          '/api/users/:id - DELETE - error',
          error,
          req.params,
          req.query,
          req.body,
          req.headers
        )
      }
    )
  })
  app.post('/api/groups/:id/attendees', (req, res) => {
    if (!validate.service(req, res)) {
      return
    }
    if (!req.body.user) {
      res.status(400).json({ error: '"user" in request body is required' })
    }
    attendee.post({ req }).then(
      response => res.json({}),
      error => {
        res.json(error.response ? error.response.body : {})
        console.error(
          '/api/groups/:id/attendees - POST - error',
          error,
          req.params,
          req.query,
          req.body,
          req.headers
        )
      }
    )
  })
  app.post('/api/token', (req, res) => {
    if (!validate.service(req, res)) {
      return
    }
    const id = service.get(req)
    if (!req.body.group) {
      res.status(400).json({ error: '"group" in request body is required' })
    }
    if (!req.body.user) {
      res.status(400).json({ error: '"user" in request body is required' })
    }
    attendee.gets({ req }).then(
      items => {
        console.log(items)
        if (items.length !== 1) {
          res.status(404).json({
            error: 'user does not found in the group.'
          })
          return
        }
        res.json({
          token: token.issue({
            service: id,
            group: req.body.group,
            user: req.body.user
          })
        })
      },
      error => {
        res.status(500).json({})
        console.error(
          '/api/token - POST - error',
          error,
          req.params,
          req.query,
          req.body,
          req.headers
        )
      }
    )
  })

  return app
}
