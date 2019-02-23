import mongoose from 'mongoose';

mongoose.connect(
  process.env.KIJIMUNA_MONGO_URI,
  { useNewUrlParser: true }
);

const Message = mongoose.model('Message', {
  time: Date,
  text: String,
  posted: String,
  group: String
});
