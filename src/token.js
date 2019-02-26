import crypto from 'crypto';
import Redis from 'ioredis';

const redis = new Redis(process.env.KIJIMUNA_REDIS_URI);
const KIJIMUNA_HASH_SECRET =
  process.env.KIJIMUNA_HASH_SECRET || 'AWESOME KIJIMUNA';

export function issue({ service, group, user }) {
  const token = crypto
    .createHmac('sha256', KIJIMUNA_HASH_SECRET)
    .update(`${service}:${group}:${user}:${Math.random()}`)
    .digest('hex');
  redis.set(token, JSON.stringify({ service, group, user }), 'EX', 60);
  return token;
}

export function pop(token) {
  return new Promise((resolve, reject) => {
    redis
      .multi()
      .get(token)
      .del(token)
      .exec((multierr, [[err, data]]) => {
        if (multierr || err || !data) {
          reject(multierr || err || 'token not found');
        }
        resolve(JSON.parse(data));
      });
  });
}

export default {
  issue,
  pop
};
