import mongoose from "mongoose";

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  load: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

// ========= old version to export and import model =========
// module.exports = mongoose.model('Workout', workoutSchema)
// -> const Workout = require('../models/workout.js')

// ========= new version to export and import model =========
export default mongoose.model('Workout', workoutSchema)
// -> import Workout from '../models/workout.js'