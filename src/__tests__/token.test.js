import token from '../token';

test('issue token', () => {
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

  expect(token.pop(issuedToken)).toEqual({
    service: 1,
    group: 2,
    user: 3
  });
  expect(token.pop(issuedToken)).toBe(undefined);
});
