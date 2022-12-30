import mongoose from 'mongoose';
import Logger, { ERROR } from '../utils/Logger';
import config from '../config/config.json';

export default function connectDB() {
  try {
    mongoose.connect(config.mongoURI).then(() => {
      Logger('Connected to MongoDB.');
    });
  } catch (err) {
    throw ERROR(err);
  }
}
