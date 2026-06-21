import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
  },

  credits: {
    type: Number,
    default: 50,
  },

  isCreditAvailable: {
    type: Boolean,
    default: true,
  },

  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notes",
    },
  ],
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;