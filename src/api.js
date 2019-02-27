import request from 'superagent';
import service from './service';
import group from './group';
import user from './user';
import attendee from './attendee';
import token from './token';
import validate from './validate';

export default function(app) {
  service.init();
  app.post('/api/services', (req, res) => {
    service.issue().then(
      response => {
        res.json({
          client: response.client,
          secret: response.secret
        });
      },
      error => {
        console.error(error);
        res.status(500).json({});
      }
    );
  });
  app.get('/api/groups', (req, res) => {
    if (!validate.service(req, res)) {
      return;
    }
    group.gets({ req }).then(
      body => res.json(body),
      error => {
        res.status(error.status).json(error.response.body);
      }
    );
  });
  app.get('/api/groups/:id', (req, res) => {
    if (!validate.service(req, res)) {
      return;
    }
    if (!req.params.id) {
      res.status(400).json({ error: 'Invalid group id' });
    }
    group.get({ req }).then(
      body => res.json(body),
      error => {
        res.status(error.status).json(error.response.body);
      }
    );
  });
  app.post('/api/groups', (req, res) => {
    if (!validate.service(req, res)) {
      return;
    }
    if (!req.body.name) {
      res.status(400).json({ error: '"name" in request body is required' });
    }
    if (req.body.icon && !/^https:\/\/.+$/.test(req.body.icon)) {
      res
        .status(400)
        .json({ error: '"icon" url should be start with https://' });
    }
    group.post({ req }).then(
      response => res.json({ id: response.body.id }),
      error => {
        res.status(error.status).json(error.response.body);
      }
    );
  });
  app.get('/api/users', (req, res) => {
    if (!validate.service(req, res)) {
      return;
    }
    user.gets({ req }).then(
      body => res.json(body),
      error => {
        res.status(error.status).json(error.response.body);
      }
    );
  });

  app.post('/api/users', (req, res) => {
    if (!validate.service(req, res)) {
      return;
    }
    if (!req.body.name) {
      res.status(400).json({ error: '"name" in request body is required' });
    }
    if (req.body.icon && !/^https:\/\/.+$/.test(req.body.icon)) {
      res
        .status(400)
        .json({ error: '"icon" url should be start with https://' });
    }
    user.post({ req }).then(
      response => res.json({ id: response.body.id }),
      error => {
        res.status(error.status).json(error.response.body);
      }
    );
  });
  app.post('/api/groups/:id/attendees', (req, res) => {
    if (!validate.service(req, res)) {
      return;
    }
    if (!req.body.user) {
      res.status(400).json({ error: '"user" in request body is required' });
    }
    attendee.post({ req }).then(
      response => res.json({ id: response.body.id }),
      error => {
        res.status(error.status).json(error.response.body);
      }
    );
  });
  app.post('/api/token', (req, res) => {
    if (!validate.service(req, res)) {
      return;
    }
    const id = service.get(req);
    if (!req.body.group) {
      res.status(400).json({ error: '"group" in request body is required' });
    }
    if (!req.body.user) {
      res.status(400).json({ error: '"user" in request body is required' });
    }
    attendee.gets({ req }).then(
      items => {
        if (items.length !== 1) {
          res.status(404).json({
            error: 'user does not found in the group.'
          });
          return;
        }
        res.json({
          token: token.issue({
            service: id,
            group: req.body.group,
            user: req.body.user
          })
        });
      },
      error => {
        console.error(error);
        res.status(500).json({});
      }
    );
  });
  return app;
}
