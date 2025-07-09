import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import projectsRouter from './routes/projects';

const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/homematch';
mongoose.connect(MONGO_URL)
  .then(() => console.log('🗄️ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(express.json());

app.use('/api/projects', projectsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});