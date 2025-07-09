import express from 'express';
import mongoose from 'mongoose';
import projectsRouter from './routes/projects';

const app = express();
const PORT = process.env.PORT || 3000;

// חיבור ל־MongoDB
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/homematch';
mongoose.connect(MONGO_URL)
  .then(() => console.log('🗄️ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// פרסינג לגוף הבקשה
app.use(express.json());

// רוטינג לפרויקט
app.use('/api/projects', projectsRouter);

// בריאות השרת
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK' });
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});