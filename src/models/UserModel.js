import mongoose from 'mongoose';

// Define the schema for individual posts
const postSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  text : {
    type: String,
  },
  title: {
    type: String,
  },

}, { 
  timestamps: true 
});

// Define the user schema
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  posts: {
    type: [postSchema],  // Array of posts
    default: [],         // Initialize as empty array
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
}, { 
  timestamps: true 
});

// Create or get the User model
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
