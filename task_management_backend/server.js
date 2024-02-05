import express from "express";
import api from './routes/index.js'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from "cors";

dotenv.config()


// Connection options (optional)
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:"taskManagement"
};
  
mongoose.connect("mongodb+srv://root:admin@cluster.vbbaz.mongodb.net/", options)
    .then(() => {
      console.log('Connected to MongoDB');
      // Your code here
    })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error);
    });


const PORT = process.env.SERVER_PORT || 9000
const origin = process.env.CORS_ORIGIN || 'http://localhost:3000'

const app = express()

app.use(cors({
    origin
}));
app.use(express.json())
app.use(express.urlencoded())

app.use(api)

app.listen(PORT, () => {
    console.log(`Your app is running in http://localhost:${PORT}`)
})