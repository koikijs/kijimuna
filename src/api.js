import request from 'superagent';
import uuidv4 from 'uuid/v4';
import service from './service';
import token from './token';

const KIJIMUNA_CHAUS_CLIENT_ID = process.env.KIJIMUNA_CHAUS_CLIENT_ID;
const KIJIMUNA_CHAUS_SECRET_ID = process.env.KIJIMUNA_CHAUS_SECRET_ID;

export default function(app) {
  service.init().then(() => {
    app.post('/api/services', (req, res) => {
      request
        .post('https://chaus.now.sh/apis/kijimuna/services')
        .send({
          client: uuidv4(),
          secret: uuidv4()
        })
        .then(
          response => {
            service.set(response.body);
            res.json({
              client: response.body.client,
              secret: response.body.secret
            });
          },
          error => {
            console.log(error);
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
  });
  return app;
}
