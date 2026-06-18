import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const entries = await Leaderboard.find().populate('user', '-password').sort({ score: -1 });
  res.json(entries);
});

router.get('/:id', async (req, res) => {
  const entry = await Leaderboard.findById(req.params.id).populate('user', '-password');
  if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
  res.json(entry);
});

router.post('/', async (req, res) => {
  const entry = new Leaderboard(req.body);
  await entry.save();
  res.status(201).json(entry);
});

router.put('/:id', async (req, res) => {
  const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
  res.json(entry);
});

router.delete('/:id', async (req, res) => {
  await Leaderboard.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
