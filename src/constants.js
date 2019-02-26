export const PROPS = {
  ID: 'i',
  ACTION: 'a',
  DATA: 'd',
  POSTED: 'p',
  TIME: 't',
  MESSAGE: 'm',
  GROUP: 'g',
  SERVICE: 's',
  MEMBERS: 'ms',
  HISTORY: 'h'
};

export const ACTION_ID = {
  MEMBER_UPDATES: 1, // Notify from host to user to update members join / left
  SEND: 2, // Notify from user to host and vice versa.
  FETCH_HISTORY: 3 // Notify from host to user to retrive past message
};
