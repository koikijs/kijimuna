import request from 'superagent';
import mocker from 'superagent-mocker';
import service from '../service';
const mock = mocker(request);

mock.get('https://chaus.now.sh/apis/kijimuna/services', function(req) {
  return {
    body: { items: [{ client: 'a', secret: 'b', id: 'c' }] }
  };
});

const mockReq = (client, secret) => ({
  get: key => {
    switch (key) {
      case 'client':
        return client;
      case 'secret':
        return secret;
      default:
        return undefined;
    }
  }
});

test('init services', done => {
  service.init().then(() => {
    expect(service.get(mockReq('a', 'b'))).toBe('c');
    expect(service.get(mockReq('b', 'a'))).toBe(undefined);
    service.set({
      client: 'b',
      secret: 'a',
      id: 'd'
    });
    expect(service.get(mockReq('b', 'a'))).toBe('d');
    done();
  });
});
