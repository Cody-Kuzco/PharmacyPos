import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, 'Please use a valid phone number.'],
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    bio: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      
    },
    
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    
    
  },
  { timestamps: true }
);
const User = models.User || mongoose.model("User", userSchema);
export default User;


