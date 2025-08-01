import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google-login', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { sub, name, email } = ticket.getPayload();

  let user = await User.findOne({ googleId: sub });
  if (!user) {
    user = await User.create({ googleId: sub, name, email });
  }

  res.status(200).json(user);
});