import { Router } from 'express';
import { Project } from '../models/Project';

const router = Router();

// GET /api/projects
router.get('/', async (_req, res) => {
  const items = await Project.find();
  res.json(items);
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  const item = await Project.findById(req.params.id);
  res.json(item);
});

// POST /api/projects
router.post('/', async (req, res) => {
  const newProj = new Project(req.body);
  const saved   = await newProj.save();
  res.status(201).json(saved);
});

// PUT /api/projects/:id
router.put('/:id', async (req, res) => {
  const updated = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;