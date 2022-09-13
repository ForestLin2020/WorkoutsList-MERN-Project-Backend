import dotenv from 'dotenv';
import express from 'express';
import workoutsRoutes from './routes/workouts.js';
import userRoutes from './routes/user.js';
import mongoose from 'mongoose';
import cors from 'cors';

// allow app to read private variable from .env file
dotenv.config()

// express app
const app = express();

// middleware
app.use(cors())
app.use(express.json()) // Using json file in this whole application
app.use((req, res, next) => {
  // req.path: / or /hello or /login 
  // req.method: GET, POST, PUT, and DELETE
  console.log(req.path, req.method);  
  next()
})

// routes
app.use('/api/workouts', workoutsRoutes);
app.use('/api/user', userRoutes);


// connnect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests, http://localhost:4000
    app.listen(process.env.PORT, () => { 
      console.log('Connected to DB & Listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  })

