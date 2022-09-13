import express from 'express'
import { getWorkouts, createWorkout, getWorkout, deleteWorkout, updateWorkout } from '../controllers/workoutController.js';
import { requireAuth } from '../middleware/requireAuth.js'

const router = express.Router()

// middleware: require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts)

// POST a new workout
router.post('/', createWorkout)

// GET a single workout
router.get('/:id', getWorkout)

// DELETE a single workout
router.delete('/:id', deleteWorkout)

// UPDATE a single workout
router.patch('/:id', updateWorkout)

export default router;