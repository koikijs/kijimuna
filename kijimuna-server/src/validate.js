import service from './service';

export default {
  service: (req, res) => {
    const id = service.get(req);
    if (!id) {
      res
        .status(400)
        .json({ error: 'Invalid client / secret in request header' });
      return false;
    }
    return true;
  },
  group: (req, res) => {
    if (!req.query.group) {
      res.status(400).json({ error: '"group" parameter are required' });
      return false;
    }
    return true;
  },
  user: (req, res) => {
    if (!req.query.user) {
      res.status(400).json({ error: ' "user" request parameter are required' });
      return false;
    }
    return true;
  }
};
