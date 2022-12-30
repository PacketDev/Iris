import mongoose, { Schema, SchemaTypes } from 'mongoose';

const objectId = SchemaTypes.ObjectId;

const friendSchema = new Schema({
  fromUser: {
    type: objectId,
    ref: 'User',
    required: true,
  },
  toUser: {
    type: objectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    default: false,
  },
});

export default mongoose.model('Friend', friendSchema);
