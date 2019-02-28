import mongoose from 'mongoose';
import { PROPS } from './constants';

mongoose.connect(
  process.env.KIJIMUNA_MONGO_URI,
  { useNewUrlParser: true }
);

const Message = mongoose.model('Message', {
  [PROPS.TIME]: Number,
  [PROPS.MESSAGE]: String,
  [PROPS.POSTED]: String,
  [PROPS.GROUP]: String,
  [PROPS.SERVICE]: String
});

export function gets({ before, group }) {
  console.log(group, before);
  return Message.find(
    { [PROPS.GROUP]: group, [PROPS.TIME]: { $lt: before } },
    `${PROPS.TIME} ${PROPS.MESSAGE} ${PROPS.POSTED}`,
    { limit: 10 }
  ).then(items =>
    items.map(item => ({
      [PROPS.ID]: item._id,
      [PROPS.MESSAGE]: item[PROPS.MESSAGE],
      [PROPS.POSTED]: item[PROPS.POSTED],
      [PROPS.TIME]: item[PROPS.TIME]
    }))
  );
}

export function save(msg) {
  return new Message(msg).save();
}

export default {
  gets,
  save
};
