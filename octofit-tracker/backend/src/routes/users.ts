import { Router } from 'express';
import { User } from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ _id: user._id, username: user.username, email: user.email });
});

router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
