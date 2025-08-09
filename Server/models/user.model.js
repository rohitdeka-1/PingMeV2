import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  email:    { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },  
  profilePhoto: { type: String, default: "api.dicebear.com/9.x/lorelei/svg" },
  
  resetPasswordToken: { type: String },
  resetPasswordExpiry: { type: Date },

  

  // FRIENDS FIELD COMMENTED OUT - Friend functionality disabled
  /*
  friends: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      addedAt: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: ["pending", "sent", "accepted", "blocked"],
        required: true
      }
    }
  ],
  */

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
