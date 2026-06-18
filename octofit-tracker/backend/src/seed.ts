import mongoose from 'mongoose';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Workout } from './models/Workout';

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { username: 'paul.octo', email: 'paul.octo@mergingtonhigh.edu', password: 'password123' },
    { username: 'jessica.cat', email: 'jessica.cat@mergingtonhigh.edu', password: 'password123' },
    { username: 'alex.runner', email: 'alex.runner@student.mhs.edu', password: 'password123' },
    { username: 'maya.lift', email: 'maya.lift@student.mhs.edu', password: 'password123' },
  ]);

  const [paul, jessica, alex, maya] = users;

  await Team.insertMany([
    { name: 'Blue Wave', members: [alex._id, maya._id] },
    { name: 'Octo Leaders', members: [paul._id, jessica._id] },
  ]);

  await Activity.insertMany([
    { user: alex._id, type: 'Running', duration: 30, date: new Date('2026-06-10') },
    { user: alex._id, type: 'Strength Training', duration: 25, date: new Date('2026-06-12') },
    { user: maya._id, type: 'Walking', duration: 45, date: new Date('2026-06-11') },
    { user: jessica._id, type: 'Cycling', duration: 40, date: new Date('2026-06-13') },
    { user: paul._id, type: 'Yoga', duration: 20, date: new Date('2026-06-14') },
  ]);

  await Leaderboard.insertMany([
    { user: alex._id, score: 180 },
    { user: maya._id, score: 165 },
    { user: jessica._id, score: 150 },
    { user: paul._id, score: 120 },
  ]);

  await Workout.insertMany([
    {
      name: 'Morning Energy Boost',
      description: 'A short routine to build consistency before school.',
      exercises: ['Jumping jacks', 'Bodyweight squats', 'Plank', 'High knees'],
    },
    {
      name: 'After-Class Strength',
      description: 'Foundational full-body workout for building strength.',
      exercises: ['Push-ups', 'Lunges', 'Sit-ups', 'Glute bridges'],
    },
    {
      name: 'Recovery Flow',
      description: 'Light mobility work for recovery days.',
      exercises: ['Cat-cow', 'Forward fold', 'Child pose', 'Hip openers'],
    },
  ]);

  await mongoose.disconnect();
}

seedDatabase()
  .then(() => {
    console.log('octofit_db populated successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to populate octofit_db:', error);
    process.exit(1);
  });
