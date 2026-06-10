import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  credits: {
    type: Number,
    default: 0,
  },

  isCreditAvailable: {
    type: Boolean,
    default: true,
  },

  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

const UserModel = mongoose.model("User", userSchema);

export default User;