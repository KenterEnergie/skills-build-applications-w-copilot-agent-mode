import { Router } from 'express';
import { Team } from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members', '-password');
  res.json(teams);
});

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).populate('members', '-password');
  if (!team) return res.status(404).json({ error: 'Team not found' });
  res.json(team);
});

router.post('/', async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json(team);
});

router.put('/:id', async (req, res) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!team) return res.status(404).json({ error: 'Team not found' });
  res.json(team);
});

router.delete('/:id', async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
