import express from 'express';
import cors from 'cors';
import mongoose from './db.js';
import User from './user.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();  
    res.json(users);  
  } catch (err) {
    console.error('Chyba při získávání uživatelů:', err);
    res.status(500).json({ message: 'Došlo k chybě při získávání uživatelů' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: 'Uživatel uložen' });
  } catch (err) {
    console.error('Chyba při ukládání uživatele:', err);
    res.status(500).json({ message: 'Došlo k chybě při ukládání uživatele' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server běží na http://localhost:3000');
});
