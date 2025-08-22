import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export async function ensureSeedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD missing; skipping admin seed.');
    return;
  }
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin already exists');
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email, passwordHash, role: 'admin' });
  console.log('Admin seeded:', email);
}
