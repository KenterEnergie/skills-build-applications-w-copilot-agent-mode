import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/octofit_db')
  .then(() => console.log('Connected to MongoDB (octofit_db)'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

app.listen(PORT, () => {
  console.log(`OctoFit backend running on port ${PORT}`);
});
