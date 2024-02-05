// Import the mongoose library
import mongoose from "mongoose";

// Define the schema for the Project model
const taskSchema = new mongoose.Schema({
  created_by:String,
  created_on: { type: Date, default: Date.now },
  description: String,
  due_date: { type: Date, default: Date.now },
  title: String,
  user_id:Number,
  status:String,
});

// Create the Project model based on the schema
const Task = mongoose.model('tasks', taskSchema);

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true // `username` must be unique
  },
  email: {
    type: String,
    unique: true // `email` must be unique
  },
  password: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, { timestamps: true });

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the models
export { Task, User };
