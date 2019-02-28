import token from '../token';

test('issue token', done => {
  const issuedToken = token.issue({
    service: 1,
    group: 2,
    user: 3
  });
  expect(issuedToken.length).toBe(64);
  expect(issuedToken).not.toBe(
    token.issue({
      service: 1,
      group: 2,
      user: 3
    })
  );
  token.pop(issuedToken).then(res => {
    expect(res).toEqual({
      service: 1,
      group: 2,
      user: 3
    });
    token.pop(issuedToken).catch(err => {
      expect(err).toBe('token not found');
      done();
    });
  });
});
