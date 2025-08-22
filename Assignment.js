import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  Phone: { type: String, required: true },
  Notes: { type: String, default: '' }
}, { _id: false });

const assignmentSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  items: { type: [itemSchema], default: [] }
}, { timestamps: true });

export default mongoose.model('Assignment', assignmentSchema);
