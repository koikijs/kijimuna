import request from 'superagent';
import service from './service';
import token from './token';

export default function(app) {
  service.init();
  app.post('/api/services', (req, res) => {
    service.issue().then(
      response => {
        console.log(response);
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
  app.get('/api/connects', (req, res) => {
    const id = service.get(req);
    if (!id) {
      res
        .status(400)
        .json({ error: 'Invalid client / secret in request header' });
      return;
    }
    if (!req.query.group || !req.query.user) {
      res
        .status(400)
        .json({ error: 'group and user request parameter are required' });
      return;
    }
    request
      .get('https://chaus.now.sh/apis/kijimuna/attendees')
      .send({
        service: id,
        group: req.query.group,
        user: req.query.user
      })
      .then(
        response => {
          if (response.body.items.length !== 1) {
            res.status(404).json({
              error: 'user not found.'
            });
            return;
          }
          res.json({
            token: token.issue({
              service: id,
              group: req.query.group,
              user: req.query.user
            })
          });
        },
        error => {
          console.log(error);
          res.status(500).json({});
        }
      );
  });
  return app;
}
