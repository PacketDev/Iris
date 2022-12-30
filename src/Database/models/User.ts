import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  tagId: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 'User',
  },
});

export default mongoose.model('User', userSchema);
