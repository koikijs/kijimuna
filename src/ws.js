import uuidv4 from 'uuid/v4';
import token from './token';

const connects = {};

export function send(ws, from, data) {
  const json = JSON.stringify(data);
  ws.send(json);
  // eslint-disable-next-line no-console
  console.log(`from:${from.id} to:${ws.id} data:${json}`);
}

export function multicast(clients, msg, from) {
  clients.forEach(ws => {
    if (from.id !== ws.id) {
      send(ws, from, msg);
    }
  });
}

export function notify({ ws, members }) {
  multicast(
    ws,
    {
      type: 'members',
      members: Object.values(members)
    },
    ws,
    false
  );
}

export default function(app) {
  app.ws('/ws/connects/:token', (ws, req) => {
    const connector = token.pop(req.params.token);
    if (!connector) {
      return;
    }
    // eslint-disable-next-line no-param-reassign
    ws.id = connector.user;
    // eslint-disable-next-line no-console
    console.log('connected!');
    if (!connects[connector.group]) {
      connects[connector.group] = {
        ws: [],
        members: {}
      };
    }
    connects[connector.group].ws.push(ws);
    ws.on('close', () => {
      // eslint-disable-next-line no-param-reassign
      connects[connector.group].ws = connects[connector.group].ws.filter(
        client => client.id !== ws.id
      );
      delete connects[connector.group].members[ws.id];
      notify(connects[connector.group]);
    });
    ws.on('message', msg => {
      let json = {};
      try {
        json = JSON.parse(msg);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return;
      }
      if (json.type === 'join') {
        connects[connector.group].members[ws.id] = json.user;
        notify(connects[connector.group]);
        return;
      }
      const member = connects[connector.group].members[ws.id];
      multicast(
        connects[connector.group].ws,
        {
          ...json,
          who: member ? member.id : 'unknown'
        },
        ws
      );
    });
  });
}
