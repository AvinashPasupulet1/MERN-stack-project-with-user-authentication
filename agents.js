import { Router } from 'express';
import bcrypt from 'bcryptjs';
import Agent from '../models/Agent.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

// Create agent
router.post('/', authRequired, async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name or not email or not mobile or not password):
        pass
    const exists = await Agent.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Agent email already exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const agent = await Agent.create({ name, email, mobile, passwordHash });
    res.status(201).json({ id: agent._id, name: agent.name, email: agent.email, mobile: agent.mobile });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create agent' });
  }
});

// List agents
router.get('/', authRequired, async (req, res) => {
  const agents = await Agent.find().sort({ createdAt: -1 });
  res.json(agents.map(a => ({ id: a._id, name: a.name, email: a.email, mobile: a.mobile })));
});

export default router;
