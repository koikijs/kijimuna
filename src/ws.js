import uuidv4 from 'uuid/v4';
import token from './token';
import message from './message';
import { PROPS, ACTION_ID } from './constants';

const connects = {};

export function send(ws, from, data) {
  const json = JSON.stringify(data);
  ws.send(json);
  // eslint-disable-next-line no-console
  console.log(`from:${from.id} to:${ws.id} data:${json}`);
}

export function multicast(clients, msg, from) {
  clients.forEach(ws => {
    send(ws, from, msg);
  });
}

export function updateMember(clients, ws) {
  console.log(clients);
  multicast(
    clients,
    {
      [PROPS.ACTION]: ACTION_ID.ONLINE_MEMBER_UPDATES,
      [PROPS.DATA]: {
        [PROPS.MEMBERS]: clients.map(ws => ws.id)
      }
    },
    ws
  );
}

export function fetchHistory({ connector, before, ws }) {
  message.gets({ group: connector.group, before }).then(docs => {
    send(ws, ws, {
      [PROPS.ACTION]: ACTION_ID.FETCH_HISTORY,
      [PROPS.DATA]: {
        [PROPS.HISTORY]: docs
      }
    });
  });
}

export default function(app) {
  app.ws('/ws/connects/:token', (ws, req) => {
    token.pop(req.params.token).then(
      connector => {
        // eslint-disable-next-line no-param-reassign
        ws.id = connector.user;
        // eslint-disable-next-line no-console
        console.log('connected!');

        // Initialize group if not exists
        if (!connects[connector.group]) {
          connects[connector.group] = {
            clients: []
          };
        }

        // Store onto clients
        connects[connector.group].clients.push(ws);

        // Notify all members
        updateMember(connects[connector.group].clients, ws);

        // Fetch chat history
        fetchHistory({
          connector,
          before: new Date().getTime(),
          ws
        });

        ws.on('close', () => {
          // eslint-disable-next-line no-param-reassign
          connects[connector.group].clients = connects[
            connector.group
          ].clients.filter(client => client.id !== ws.id);
          updateMember(connects[connector.group].clients, ws);
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
          if (!json[PROPS.DATA]) {
            return;
          }
          switch (json[PROPS.ACTION]) {
            case ACTION_ID.SEND:
              if (!json[PROPS.DATA][PROPS.MESSAGE]) {
                return;
              }
              const member = ws.id;
              const time = new Date().getTime();
              multicast(
                connects[connector.group].clients,
                {
                  [PROPS.ACTION]: ACTION_ID.SEND,
                  [PROPS.DATA]: {
                    [PROPS.TIME]: time,
                    [PROPS.MESSAGE]: json[PROPS.DATA][PROPS.MESSAGE],
                    [PROPS.POSTED]: member || 'unknown'
                  }
                },
                ws
              );
              message.save({
                [PROPS.GROUP]: connector.group,
                [PROPS.SERVICE]: connector.service,
                [PROPS.TIME]: time,
                [PROPS.MESSAGE]: json[PROPS.DATA][PROPS.MESSAGE],
                [PROPS.POSTED]: member || 'unknown'
              });
              break;
            case ACTION_ID.FETCH_HISTORY:
              if (!json[PROPS.DATA][PROPS.BEFORE]) {
                return;
              }
              // Fetch chat history
              fetchHistory({
                connector,
                before: json[PROPS.DATA][PROPS.BEFORE],
                ws
              });
              break;
            default:
          }
        });
      },
      () => {
        ws.close();
      }
    );
  });
}
