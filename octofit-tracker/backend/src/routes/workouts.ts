import { Router } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.get('/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) return res.status(404).json({ error: 'Workout not found' });
  res.json(workout);
});

router.post('/', async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json(workout);
});

router.put('/:id', async (req, res) => {
  const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!workout) return res.status(404).json({ error: 'Workout not found' });
  res.json(workout);
});

router.delete('/:id', async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
