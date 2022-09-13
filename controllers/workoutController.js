import mongoose from 'mongoose'
import Workout from '../models/workoutModel.js'

// get all workouts
export const getWorkouts = async (req, res) => {

  // using user_id to identify users' workouts list
  const user_id = req.user._id

  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })
  res.status(200).json(workouts)
}

// create a new workout
export const createWorkout = async (req, res) => {
  // const workout = req.body
  const { title, load, reps } = req.body // catch data from request

  let emptyFields = []
  if (!title) emptyFields.push('title')
  if (!load) emptyFields.push('load')
  if (!reps) emptyFields.push('reps')
  if (emptyFields.length > 0) return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})

  // add doc to db
  try {
    // =========== save vs. create ===========

    // const newWorkout = new Workout(workout)
    // await newWorkout.save() // only one title in db
    // res.status(200).json(newWorkout)
    const user_id = req.user._id
    const workout = await Workout.create({ title, load, reps, user_id }) // using catched data to create, create: many same title in db
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get a signal workout
export const getWorkout = async (req, res) => {
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({ error: 'No such workout'})
  }

  res.status(200).json(workout)

}

// delete a signal workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  // const workout = await Workout.findByIdAndDelete(id)
  const workout = await Workout.findOneAndDelete({ _id: id}) // find one depends one certain property
  
  if (!workout) {
    return res.status(404).json({ error: 'No such workout'})
  }

  res.status(200).json(workout)
  
}

// update a signal workout
export const updateWorkout = async (req, res) => {
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findByIdAndUpdate(id, { ...req.body })

  if (!workout) {
    return res.status(404).json({ error: 'No such workout'})
  }

  const updatedWorkout = await Workout.findById(id)
  
  res.status(200).json(updatedWorkout)
}