import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true, default: "CONVERSATION" }, // ["conversation" || "guild"]
  participants: {
    type: Array,
    required: true,
    default: [],
  },
  messages: {
    type: Array,
    required: true,
    default: [],
  },
});

export default mongoose.model("Room", roomSchema);
