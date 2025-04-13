const express = require('express');
const mongoose = require('./db');
const User = require('./models/User');

const app = express();
app.use(express.json());

app.post('/api/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json({ message: 'Uživatel uložen' });
});

app.listen(3000, () => console.log('🚀 Server běží na http://localhost:3000'));
