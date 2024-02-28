import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  userId: {
    type: String,
  },
  opponentId: {
    type: String,
  },
  score: [
    {
      userId: String,
      score: Number,
    },
    {
      opponentId: String,
      score: Number,
    },
  ],
  roomId: {
    type: String,
  },

  winnerId: {
    type: String,
  },

  endTime: {
    type: Date,
  },
});

export const User = mongoose.model("User", userSchema);
