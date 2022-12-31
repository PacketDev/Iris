import mongoose, { Schema, SchemaTypes } from 'mongoose';

const GMSchema = new Schema({
  senderId: {
    type: String,
  },
  message: {
    type: String,
  },
  guildId: {
    type: String,
  },
});

export default mongoose.model('GuildMessage', GMSchema);