import crypto from 'crypto';

const KIJIMUNA_HASH_SECRET =
  process.env.KIJIMUNA_HASH_SECRET || 'AWESOME KIJIMUNA';

const tokens = {};

export function issue({ service, group, user }) {
  const token = crypto
    .createHmac('sha256', KIJIMUNA_HASH_SECRET)
    .update(`${service}:${group}:${user}:${Math.random()}`)
    .digest('hex');
  tokens[token] = { service, group, user };
  return token;
}

export function pop(token) {
  const data = tokens[token];
  delete tokens[token];
  return data;
}

export default {
  issue,
  pop
};
