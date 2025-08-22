import { Router } from 'express';
import multer from 'multer';
import Agent from '../models/Agent.js';
import Assignment from '../models/Assignment.js';
import { authRequired } from '../middleware/auth.js';
import { parseUpload } from '../utils/parseFile.js';
import { distributeEqually } from '../utils/distribute.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/', authRequired, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'File is required' });
    const parsed = parseUpload(req.file.buffer, req.file.originalname);
    if (parsed.length === 0) return res.status(400).json({ error: 'No rows found' });

    const agents = await Agent.find().sort({ createdAt: 1 }).limit(5);
    if (agents.length < 5) return res.status(400).json({ error: 'At least 5 agents required to distribute' });

    const groups = distributeEqually(parsed, 5);
    const bulk = [];
    for (let i = 0; i < 5; i++) {
      bulk.push({
        updateOne: {
          filter: { agent: agents[i]._id },
          update: { $set: { agent: agents[i]._id, items: groups[i] } },
          upsert: true
        }
      });
    }
    await Assignment.bulkWrite(bulk);

    const results = await Assignment.find({ agent: { $in: agents.map(a => a._id) } }).populate('agent', 'name email mobile');
    res.json(results.map(r => ({
      agent: { id: r.agent._id, name: r.agent.name, email: r.agent.email, mobile: r.agent.mobile },
      items: r.items
    })));
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Upload failed' });
  }
});

router.get('/assignments', authRequired, async (req, res) => {
  const results = await Assignment.find().populate('agent', 'name email mobile').sort({ updatedAt: -1 });
  res.json(results.map(r => ({
    agent: { id: r.agent._id, name: r.agent.name, email: r.agent.email, mobile: r.agent.mobile },
    items: r.items
  })));
});

export default router;
