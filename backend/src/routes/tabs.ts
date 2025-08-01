import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/save', async (req, res) => {
  const { googleId, tabs } = req.body;
  const user = await User.findOne({ googleId });
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.tabs.push(...tabs);
  await user.save();
  res.json(user.tabs);
});

router.get('/:googleId', async (req, res) => {
  const user = await User.findOne({ googleId: req.params.googleId });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user.tabs);
});

export default router;