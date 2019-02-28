import request from 'superagent';
const KIJIMUNA_CHAUS_CLIENT_ID = process.env.KIJIMUNA_CHAUS_CLIENT_ID;
const KIJIMUNA_CHAUS_SECRET_ID = process.env.KIJIMUNA_CHAUS_SECRET_ID;

request
  .delete('https://chaus.now.sh/apis/kijimuna/services')
  .set({
    'x-chaus-client': KIJIMUNA_CHAUS_CLIENT_ID,
    'x-chaus-secret': KIJIMUNA_CHAUS_SECRET_ID
  })
  .then(
    () => {
      console.log('trancated services!');
    },
    error => {
      console.error('trancate is been failed...', error);
    }
  );
